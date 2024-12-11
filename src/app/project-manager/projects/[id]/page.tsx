"use client"

import { checkUserByEmail } from '@/app/services/checkUserByEmail'
import { getProjectByID } from '@/app/services/getProject'
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

  const params = useParams();
  const { user, isLoading } = useUser()

  const [userData, setUserData] = useState<User | null>(null);
  const [projectData, setProjectData] = useState<Investment | null>(null);

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

      fetchUserData(user)
    }

  }, [isLoading])


  // GET PROJECT
  useEffect(() => {

    const fetchProjectData = async (projectID: Investment["id"]) => {

      try {

        const projectResponse = await getProjectByID(projectID) // FILTRAR PROJETOS
        setProjectData(projectResponse)

      } catch (error) {
        console.error('Erro ao buscar dados do projeto:', error);
      }
    }

    if (params.id && typeof (params.id) == 'string') {
      fetchProjectData(params.id);
    }

  }, [params.id])



  return (

    <Flex maxW={'1440px'}>

      {/* SPINNER */}
      {userData && user && projectData ?

        <Flex h='100%' flexDir={['column', 'column', 'column', 'column', 'row']} w='100%'>

          <Flex>
            <Flex w={[0, 0, 0, 0, 64]}></Flex>
            <SideBar userData={userData} />
          </Flex>


          {/* MAIN */}
          <Flex h='100%' flexDir={'column'} w='100%' px={[4, 4, 4, 12, 12]} py={[6, 6, 6, 12, 12]} gap={[4, 4, 4, 6, 6]}>

            {/* HEADER */}
            < Flex
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


    </Flex >

  )
}
