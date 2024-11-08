"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { getUserByID } from '@/app/api/getUserByID/route'
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

        const fetchUserData = async (id: User["id"]) => {
            try {

                const userResponse = await getUserByID(id)

                setUserData(userResponse)

            } catch (error) {

                console.error('Erro ao buscar dados do usuário:', error);
                await redirectNotFound()

            }
        }

        const checkAndRedirectRole = async (idParams: string, user: UserProfile) => {

            const userResponse = await checkUserByEmail(user)
            if (userResponse) {

                switch (userResponse.role) {

                    case 'INVESTOR':
                        router.push(`/users/update/investor/`)
                        break
                    case 'PROJECT_MANAGER':
                        router.push(`/users/update/project-manager/`)
                        break
                    case 'ADMINISTRATOR':

                        if (idParams === userResponse.id) {
                            router.push(`/users/update/administrator/`)
                        }
                        setUserAdminData(userResponse)
                        setPageLoaded(true)
                        break
                }
            }
        }

        if (user) {
            if (params.id && typeof (params.id) == 'string') {
                checkAndRedirectRole(params.id, user);
                fetchUserData(params.id);
            }
        }

    }, [user])

    if (!user) {
        return (
            <SpinnerFullScreen />
        )
    }
    
    if (!pageLoaded) {
        return (
            <SpinnerFullScreen />
        )    
    }


    return (
        <>
            <Container maxW={'1366px'} mx='auto' h='100vh'>
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
                                        {/* <ProfileUserResume userData={userData} /> */}
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
