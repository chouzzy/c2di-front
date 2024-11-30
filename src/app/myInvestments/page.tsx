"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import { SideBar } from '@/components/SideBar'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MyInvestmentsList } from '@/components/myInvestments'
import { HeaderMyInvestments } from '@/components/myInvestments/headers/HeaderMyInvestments'
import { getUserInvestmentListByUserID, getUserInvestmentListComplete } from '../services/getUserInvestmentListByID'

export default function MyInvestments() {

    const router = useRouter();

    const { user, isLoading } = useUser()

    const [userData, setUserData] = useState<User | null>(null);
    const [projectsData, setProjectsData] = useState<Investment[] | null>(null);
    const [userInvestmentsData, setUserInvestmentsData] = useState<UserInvestment[] | null>(null);

    const [totalPages, setTotalPages] = useState<number>(0)
    const [elementsPerPage, setElementsPerPage] = useState<number>(4)

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
                    const userInvestments = await getUserInvestmentListComplete()
                    const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                    // const projectResponseActives = projectResponseComplete.filter((project: Investment) => project.active === true)

                    if (projectResponseActives) {
                        setTotalPages(projectResponseActives.length)
                        setProjectsData(projectResponseActives)
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
                                {userData.role == "INVESTOR" ? <HeaderMyInvestments /> : ''}
                            </Flex>

                            {/* BODY FORMS */}
                            < Flex flexDir={'column'}>

                                <Flex gap={12}>
                                    <MyInvestmentsList elementsPerPage={elementsPerPage} totalPages={totalPages} page={page} setPage={setPage} projectsData={projectsData} userInvestmentsData={userInvestmentsData} />
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
