"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProjectManagerProjectsList } from '@/app/api/getProjectList/route'
import { CreateProjectHeader } from '@/components/CreateProjects/Header'
import { CreateProjectForm } from '@/components/CreateProjects/CreateProjectForm.'

export default function CreateProject() {

    const router = useRouter();
    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectsData, setProjectsData] = useState<Investment[] | null>(null);

    const [pageLoaded, setPageLoaded] = useState(false);

    const redirectNotFound = async () => {
        // router.push("/404")
    }

    // GET USER
    useEffect(() => {

        const fetchUserData = async (user: UserProfile) => {
            try {

                const userResponse = await checkUserByEmail(user)
                setUserData(userResponse)

            } catch (error) {

                console.error('Erro ao buscar dados do usuário:', error);
                await redirectNotFound()

            }
        }

        const fetchProjectData = async (id: User["id"]) => {
            try {

                const projectResponse = await getProjectManagerProjectsList({ projectManagerID: id })
                setProjectsData(projectResponse)
                setPageLoaded(true)

            } catch (error) {

                console.error('Erro ao buscar dados do projeto:', error);
                await redirectNotFound()

            }
        }

        if (!isLoading) {

            if (user) {
                fetchUserData(user);
                if (userData) {
                    fetchProjectData(userData.id);
                }

            } else {
                router.push('/authentication')
            }
        }

    }, [user])

    if (!user) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!projectsData) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!userData) {
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
                            <SideBar userData={userData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={12} py={12} gap={6}>

                            {/* HEADER */}
                            <Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={8}
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
                }
            </Container >
        </>
    )
}
