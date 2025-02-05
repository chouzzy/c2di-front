"use client"

import { HeaderInvestorProjectList } from '@/components/projects/headers/HeaderInvestorProjectList'
import { HeaderAdminProjectList } from '@/components/projects/headers/HeaderAdminProjectList'
import { ProjectDashboardInvestor } from '@/components/projects/dashboard/investor'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { getProjectList } from '@/app/services/getProjectList'
import { SideBar } from '@/components/SideBar'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'



export default function ProjectInvestorProjects() {

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

    // GET USER PROJECTS
    useEffect(() => {

        const fetchProjectData = async (id: User["id"]) => {
            try {

                let pageString = String(page)
                let pageRangeString = String(elementsPerPage)

                if (!totalPages) { // FAZ A REQUISIÇÃO DE TOTAL DE ELEMENTOS APENAS 1 VEZ

                    const projectResponseComplete = await getProjectList({ page: undefined, pageRange: undefined })

                    const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                    if (projectResponseActives) {
                        setTotalPages(projectResponseActives.length)
                    }
                }

                const projectResponse = await getProjectList({ page: pageString, pageRange: pageRangeString, active: true })

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

                    <Flex h='100%' flexDir={['column', 'column', 'column', 'column', 'row']} w='100%'>

                        <Flex>
                            <Flex w={[0, 0, 0, 0, 60]}></Flex>
                            <SideBar userData={userData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={[4, 4, 4, 12, 12]} py={[4, 4, 4, 12, 12]} gap={[0, 0, 0, 6, 6]}>

                            {/* HEADER */}
                            < Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={[4, 4, 4, 8, 8]}
                            >
                                {userData.role == "INVESTOR" || userData.role == "PROPRIETARIO" ? <HeaderInvestorProjectList /> : ''}
                                {userData.role != "INVESTOR" && userData.role != "PROPRIETARIO" ? <HeaderAdminProjectList user={user} userData={userData} /> : ''}
                            </Flex>

                            {/* BODY FORMS */}
                            < Flex flexDir={'column'}>

                                <Flex gap={12}>
                                    <ProjectDashboardInvestor elementsPerPage={elementsPerPage} totalPages={totalPages} page={page} setPage={setPage} projectsData={projectsData} />
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
