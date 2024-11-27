"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HeaderInvestorDashboard } from '@/components/dashboard/headers/HeaderInvestorDashboard'
import { HeaderAdminDashboard } from '@/components/dashboard/headers/HeaderAdminDashboard'
import { MainInvestorDashboard } from '@/components/dashboard/main/MainInvestorDashboard'
import { getUserInvestmentListByUserID, getUserInvestmentListComplete } from '../api/getUserInvestmentListByID/route'

export default function Dashboard() {

    const router = useRouter();

    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectsData, setProjectsData] = useState<Investment[] | null>(null);

    const [pageLoaded, setPageLoaded] = useState(false);
    const [elementsPerPage, setElementsPerPage] = useState<number>(4)

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
                await redirectNotFound()

            }
        }

        const fetchProjectData = async (id: User["id"]) => {
            try {

                let pageString = String(page)
                let pageRangeString = String(elementsPerPage)

                const projectResponseComplete = await getUserInvestmentListByUserID({ page: undefined, pageRange: undefined, userID: id })
                const userInvestments = await getUserInvestmentListComplete()

                // const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                if (projectResponseComplete) {
                    setProjectsData(projectResponseComplete)
                    setPageLoaded(true)
                }

                if (userInvestments) {
                    setUserInvestmentsData(userInvestments)
                }


            } catch (error) {

                console.error('Erro ao buscar dados do projeto:', error);
                // await redirectNotFound()

            }
        }

        if (user) {
            fetchUserData(user);
            if (userData) {
                fetchProjectData(userData.id);
            }

        }

    }, [user])

    return (
        <>
            <Container maxW={'1440px'} mx='auto' h='100vh'>
                {userData && user && projectsData && userInvestmentsData ?
                    <Flex h='100%'>
                        <Flex>
                            <Flex w={64}></Flex>
                            <SideBar userData={userData} />
                        </Flex>

                        <Flex h='100%' flexDir={'column'} w='100%' px={12} py={12} gap={6}>

                            {/* HEADER */}
                            < Flex
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'1px solid #E5E7EB'}
                                pb={8}
                            >
                                {userData.role == "INVESTOR" ? <HeaderInvestorDashboard /> : ''}
                                {userData.role != "INVESTOR" ? <HeaderAdminDashboard user={user} userData={userData} /> : ''}
                            </Flex>

                            {/* BODY FORMS */}
                            < Flex flexDir={'column'}>

                                <Flex gap={12}>
                                    {userData.role == "INVESTOR" ? <MainInvestorDashboard projectsData={projectsData} userInvestmentsData={userInvestmentsData} /> : ''}
                                    {userData.role != "INVESTOR" ? <MainInvestorDashboard projectsData={projectsData} userInvestmentsData={userInvestmentsData} /> : ''}
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
