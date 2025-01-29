"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HeaderInvestorDashboard } from '@/components/dashboard/headers/HeaderInvestorDashboard'
import { HeaderAdminDashboard } from '@/components/dashboard/headers/HeaderAdminDashboard'
import { MainInvestorDashboard } from '@/components/dashboard/main/MainInvestorDashboard'
import { filterUserInvestmentsByUserID, getUserInvestmentListByUserID, getUserInvestmentListComplete } from '../services/getUserInvestmentListByID'

export default function Dashboard() {

    const router = useRouter();

    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectsData, setProjectsData] = useState<Investment[] | null>(null);

    const [totalPages, setTotalPages] = useState<number>(0)

    const [elementsPerPage, setElementsPerPage] = useState<number>(4)

    const [userInvestmentsComplete, setUserInvestmentsComplete] = useState<UserInvestment[] | null>(null);

    const [userInvestmentsData, setUserInvestmentsData] = useState<UserInvestment[] | null>(null);

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
            }
        }

        if (!userData && user) {
            fetchUserData(user);
        }

    }, [isLoading])

    // GET PROJECTS
    useEffect(() => {

        const fetchProjectData = async (id: User["id"]) => {
            try {

                let pageString = String(page)
                let pageRangeString = String(elementsPerPage)

                if (!totalPages) {

                    const projectResponseComplete = await getUserInvestmentListByUserID({ page: undefined, pageRange: undefined, userID: id })
                    const userInvestmentsComplete = await getUserInvestmentListComplete()
                    const userInvestments = await filterUserInvestmentsByUserID({ page: '0', pageRange: '9999', userID: id })
                    const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                    // const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                    if (projectResponseActives) {
                        setTotalPages(projectResponseActives.length)
                        setProjectsData(projectResponseActives)
                    }

                    if (userInvestmentsComplete) {
                        setUserInvestmentsComplete(userInvestmentsComplete)
                    }
                    if (userInvestments) {
                        setUserInvestmentsData(userInvestments)
                    }
                } else {
                    const projectResponseComplete = await getUserInvestmentListByUserID({ page: pageString, pageRange: pageRangeString, userID: id })
                    const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)
                    setProjectsData(projectResponseActives)
                }


            } catch (error) {

                console.error('Erro ao buscar dados do projeto:', error);
                // await redirectNotFound()

            }
        }

        if (userData) {
            fetchProjectData(userData.id);
        }


    }, [userData, page])


    return (
        <>
            <Container maxW={'1440px'} mx='auto' h='100vh'>
                {userData && user && projectsData && userInvestmentsData ?

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
                                pb={[4, 4, 4, 8, 2]}
                            >
                                {userData.role == "INVESTOR" ? <HeaderInvestorDashboard user={user} userData={userData}  /> : ''}
                                {userData.role != "INVESTOR" ? <HeaderAdminDashboard user={user} userData={userData} /> : ''}
                            </Flex>

                            {/* BODY FORMS */}
                            < Flex flexDir={'column'}>

                                <Flex gap={12}>
                                    {userData.role == "INVESTOR" ? <MainInvestorDashboard projectsData={projectsData} userInvestmentsData={userInvestmentsData} /> : ''}
                                    {userData.role != "INVESTOR" ? <Flex> Em construção 🚜 </Flex> : ''}
                                </Flex>

                            </Flex>

                        </Flex>
                    </Flex>
                    :
                    <SpinnerFullScreen />
                }
            </Container >
        </>
    )
}
