"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { getProjectByID } from '@/app/api/getProject/route'
import { SpinnerFullScreen } from '@/components/Loading/SpinnerFullScreen'
import ProjectResume from '@/components/projects/resume/role/investor'
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

  const [pageLoaded, setPageLoaded] = useState(true);

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

    const fetchProjectData = async (projectID: Investment["id"]) => {
      try {

        const projectResponse = await getProjectByID(projectID) // FILTRAR PROJETOS
        setProjectData(projectResponse)

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

  }, [user])

  if (!user) {
    return (
      <SpinnerFullScreen />
    )
  }
  if (!projectData) {
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
              <SideBar projectData={projectData} userData={userData} />
            </Flex>

            <Flex h='100%' flexDir={'column'} w='100%' px={12} py={12} gap={6}>

              {/* HEADER */}
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                borderBottom={'1px solid #E5E7EB'}
                pb={8}
              >
                {userData.role == 'INVESTOR'? <HeaderInvestorProject projectData={projectData}/>: ''}
                {userData.role != 'INVESTOR'? <HeaderAdminProject projectData={projectData} userData={userData} user={user}/>: ''}
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
                    <ProjectResumeProjectManager userData={userData} user={user} projectData={projectData} />
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
