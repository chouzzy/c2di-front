"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { getProjectByID } from '@/app/api/getProject/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import ProjectResumeProjectManager from '@/components/projects/resume/role/project-manager'
import { SideBar } from '@/components/SideBar'
import { HeaderAdminProject } from '@/components/users/HeaderAdminProject'
import { HeaderInvestorProject } from '@/components/users/HeaderInvestorProject'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProjectManagerProject() {

  const router = useRouter();
  const params = useParams();
  const { user, isLoading } = useUser()

  const [userData, setUserData] = useState<User | null>(null);
  const [projectData, setProjectData] = useState<Investment | null>(null);

  const [pageLoaded, setPageLoaded] = useState(false);

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

      } catch (error) {

        console.error('Erro ao buscar dados do projeto:', error);
        // await redirectNotFound()

      }
    }

    if (!isLoading) {

      if (user) {

        fetchUserData(user);

        if (params.id && typeof (params.id) == 'string') {
          fetchProjectData(params.id);
        }

        setPageLoaded(true)

      } else {
        router.push('/authentication')
      }
    }

  }, [user])

  return (

    <Container maxW={'1440px'} mx='auto' h='100vh'>


      {/* SPINNER */}
      {userData && user && projectData ?

        <Flex h='100%'>

          {/* SIDEBAR */}
          <Flex>
            <Flex w={64}></Flex>
            <SideBar projectData={projectData} userData={userData} />
          </Flex>


          {/* MAIN */}
          <Flex h='100%' flexDir={'column'} w='100%' px={12} py={12} gap={6}>



            {/* HEADER */}
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              borderBottom={'1px solid #E5E7EB'}
              pb={8}
            >
              <HeaderAdminProject projectData={projectData} userData={userData} user={user} />
            </Flex>


            {/* MENU RESUME */}
            <Flex flexDir={'column'}>

              <Flex gap={12}>
                <ProjectResumeProjectManager userData={userData} user={user} projectData={projectData} />
              </Flex>

            </Flex>

          </Flex>
        </Flex>
        :
        <SpinnerFullScreen />
      }


    </Container >

  )
}