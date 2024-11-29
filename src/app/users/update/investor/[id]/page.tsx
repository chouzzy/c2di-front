"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail/route'
import { getUserByID } from '@/app/services/getUserByID/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import FormUsers from '@/components/users/FormUsers'
import { UsersHeader } from '@/components/users/Header'
import { AdminHeader } from '@/components/users/HeaderAdmin'
import { ProfileUserResume } from '@/components/users/ProfileUserResume'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Users() {

    const router = useRouter();
    const params = useParams();
    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [userAdminData, setUserAdminData] = useState<User | null>(null);

    const [pageLoaded, setPageLoaded] = useState(false);

    const redirectNotFound = async () => {
        router.push("/404")
    }

 // GET USER
 useEffect(() => {

    const fetchAdminData = async (user: UserProfile) => {

        const userResponse = await checkUserByEmail(user)
        if (userResponse) {
            setUserAdminData(userResponse)
            setPageLoaded(true);
        }
    }

    const fetchUserData = async (id: User["id"]) => {
        try {

            const userResponse = await getUserByID(id)
            if (userResponse) {
                setUserData(userResponse)
                setPageLoaded(true);
            }

        } catch (error) {

            console.error('Erro ao buscar dados do usuário:', error);
            await redirectNotFound()

        }
    }

    if (!isLoading) {

        if (user) {
            fetchAdminData(user);
            if (params.id && typeof (params.id) == 'string') {
                fetchUserData(params.id);
            }
        } else {
            // router.push('/authentication')
        }
    }

}, [user])

    if (!user) {
        return (
          <SpinnerFullScreen />
        )
      }
    

    return (
        <>
            <Container maxW={'1440px'} mx='auto' h='100vh'>
                {!pageLoaded ?
                    <Flex h='100%' w='100%' alignItems={'center'} justifyContent={'center'}>
                        <Spinner
                            boxSize={40}
                            color='redSide'
                        />
                    </Flex>
                    :

                    <Flex h='100%'>
                        <Flex>
                            <Flex w={64}></Flex>
                            <SideBar userData={userAdminData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={12} py={12} gap={6}>

                            {/* HEADER */}
                            <Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={8}
                            >
                                <AdminHeader userData={userData} user={user} />
                            </Flex>

                            {!userData ?
                                <Flex boxSize={42} mx='auto'>
                                    <Spinner
                                        boxSize={42}
                                        color='redSide'
                                    />
                                </Flex>
                                :

                                // {/* BODY FORMS */}
                                < Flex flexDir={'column'}>

                                    <Flex gap={12}>
                                        <FormUsers userData={userData} />
                                        <ProfileUserResume userData={userData} />
                                    </Flex>

                                </Flex>
                            }

                        </Flex>
                    </Flex>
                }
            </Container >
        </>
    )
}
