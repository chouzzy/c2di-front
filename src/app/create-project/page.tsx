"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CreateProjectHeader } from '@/components/CreateProjects/Header'
import { CreateProjectForm } from '@/components/CreateProjects/CreateProjectForm.'

export default function CreateProject() {

    const router = useRouter();
    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {

        const fetchUserData = async (user: UserProfile) => {
            try {

                const userResponse = await checkUserByEmail(user)
                setUserData(userResponse)

            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        }

        if (!userData && user) {
            fetchUserData(user);
        }

    }, [isLoading])

    return (
        <>
            <Flex maxW={'1440px'} mx='auto'>
                {userData && user ?
                    <Flex h='100%' flexDir={['column', 'column', 'column', 'column', 'row']} w='100%'>

                        <Flex>
                            <Flex w={[0, 0, 0, 0, 60]}></Flex>
                            <SideBar userData={userData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={[2, 2, 2, 12, 12]} py={[4, 4, 4, 12, 12]} gap={[0, 0, 0, 6, 6]}>

                            {/* HEADER */}
                            < Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={[4, 4, 4, 8, 8]}
                            >
                                <CreateProjectHeader />
                            </Flex>

                            {!userData ?
                                <Flex boxSize={42} mx='auto'>
                                    <Spinner
                                        boxSize={42}
                                    />
                                </Flex>
                                :

                                // {/* BODY FORMS */}
                                <Flex flexDir={'column'}>

                                    <Flex gap={12}>
                                        <CreateProjectForm user={user} userData={userData} router={router} />
                                    </Flex>

                                </Flex>
                            }

                        </Flex>
                    </Flex>
                    :
                    <SpinnerFullScreen />
                }
            </Flex >
        </>
    )
}
