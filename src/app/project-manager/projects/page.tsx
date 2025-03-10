"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HeaderInvestorProjectList } from '@/components/projects/headers/HeaderInvestorProjectList'
import { HeaderAdminProjectList } from '@/components/projects/headers/HeaderAdminProjectList'
import { ProjectDashboardInvestor } from '@/components/projects/dashboard/investor'
import { getProjectList, getProjectManagerProjectsList } from '@/app/services/getProjectList'
import { ProjectDashboardProjectManager } from '@/components/projects/dashboard/project-manager'

export default function ProjectManagersProjects() {

    const router = useRouter();

    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectsData, setProjectsData] = useState<Investment[] | null>(null);

    const [totalPages, setTotalPages] = useState<number>(0)
    const [elementsPerPage, setElementsPerPage] = useState<number>(4)

    const [page, setPage] = useState(1)

    // GET USER
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



    // GET MANAGERS PROJECT
    useEffect(() => {

        const fetchProjectData = async (id: User["id"]) => {
            try {

                let pageString = String(page)
                let pageRangeString = String(elementsPerPage)

                if (!totalPages) {

                    const projectResponseComplete = await getProjectManagerProjectsList({ projectManagerID: id })

                    if (projectResponseComplete) {
                        setTotalPages(projectResponseComplete.length)
                    }
                }

                const projectResponse = await getProjectManagerProjectsList({ projectManagerID: id, page: pageString, pageRange: pageRangeString })
                setProjectsData(projectResponse)

            } catch (error) {
                console.error('Erro ao buscar dados do projeto:', error);
            }
        }

        if (userData) {
            fetchProjectData(userData.id);
        }

    }, [userData, page])

    return (
        <>
            <Flex maxW={'1440px'} mx='auto'>
                {userData && user && projectsData ?
                    <Flex h='100%' w='100%' flexDir={['column', 'column', 'column', 'column', 'row']} >

                        <Flex>
                            <Flex w={[0, 0, 0, 64, 60]}></Flex>
                            <SideBar userData={userData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={[4, 4, 8, 8, 12]} py={[4, 4, 4, 12, 12]} gap={[0, 0, 0, 6, 6]}>

                            {/* HEADER */}
                            < Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={[4, 4, 4, 8, 8]}
                            >
                                {userData.role == "INVESTOR" || userData.role == "PROPRIETARIO"? <HeaderInvestorProjectList /> : ''}
                                {userData.role != "INVESTOR" && userData.role != "PROPRIETARIO" ? <HeaderAdminProjectList user={user} userData={userData} /> : ''}
                            </Flex>

                            {/* BODY FORMS */}
                            < Flex flexDir={'column'}>

                                <Flex gap={12}>
                                    <ProjectDashboardProjectManager elementsPerPage={elementsPerPage} totalPages={totalPages} page={page} setPage={setPage} projectsData={projectsData} />
                                </Flex>

                            </Flex>
                        </Flex>
                    </Flex>

                    :
                    <SpinnerFullScreen />
                }
            </Flex >
        </>
    )
}
