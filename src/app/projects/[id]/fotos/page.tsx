"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HeaderInvestorProjectList } from '@/components/projects/headers/HeaderInvestorProjectList'
import { HeaderAdminProjectList } from '@/components/projects/headers/HeaderAdminProjectList'
import { ProjectDashboardInvestor } from '@/components/projects/dashboard/investor'
import { getProjectList, getProjectManagerProjectsList } from '@/app/api/getProjectList/route'
import { ProjectDashboardProjectManager } from '@/components/projects/dashboard/project-manager'
import { HeaderInvestorGalleryFotosProject } from '@/components/projects/headers/HeaderInvestorGalleryFotosProject'
import { HeaderAdminGalleryFotosProject } from '@/components/projects/headers/HeaderAdminGalleryFotosProject'
import { ProjectFotosProjectManager } from '@/components/projects/dashboard/project-manager/fotos'
import { getProjectByID } from '@/app/api/getProject/route'
import { ProjectFotosInvestor } from '@/components/projects/dashboard/investor/fotos'

export default function ProjectPhotos() {

    const router = useRouter();
    const params = useParams();

    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectData, setProjectData] = useState<Investment | null>(null);

    const [pageLoaded, setPageLoaded] = useState(true);

    const [totalPages, setTotalPages] = useState<number>(1)
    const [elementsPerPage, setElementsPerPage] = useState<number>(2)

    const [page, setPage] = useState(1)



    const redirectNotFound = async () => {
        router.push("/404")
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

        const fetchProjectData = async (projectID: Investment["id"]) => {
            try {

                const projectResponse = await getProjectByID(projectID) // FILTRAR PROJETOS
                setProjectData(projectResponse)
                setPageLoaded(true)

            } catch (error) {

                console.error('Erro ao buscar dados do projeto:', error);
                await redirectNotFound()

            }
        }

        if (!isLoading) {

            if (user) {
                fetchUserData(user);
                if (params.id && typeof (params.id) == 'string') {
                    fetchProjectData(params.id);
                }

            } else {
                router.push('/authentication')
            }
        }

    }, [user, page])

    if (!user) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!userData) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!projectData) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!totalPages) {
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
                                {userData.role == "INVESTOR" ? <HeaderInvestorGalleryFotosProject /> : ''}
                                {userData.role != "INVESTOR" ? <HeaderAdminGalleryFotosProject /> : ''}
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
                                        <ProjectFotosInvestor projectData={projectData} />
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
