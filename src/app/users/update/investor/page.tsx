"use client"

import { checkUserByEmail } from '@/app/api/checkUserByEmail/route'
import { SideBar } from '@/components/SideBar'
import FormUsers from '@/components/users/FormUsers'
import { UsersHeader } from '@/components/users/Header'
import { ProfileUserResume } from '@/components/users/ProfileUserResume'
import { getSession } from '@auth0/nextjs-auth0'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Users() {

  const router = useRouter();
  const params = useParams();
  const { user, isLoading } = useUser()

  const [userData, setUserData] = useState<User | null>(null);

  const [pageLoaded, setPageLoaded] = useState(false);

  const redirectNotFound = async () => {
    router.push("/404")
  }

  // GET USER
  useEffect(() => {

    const checkAndRedirectRole = async (user: UserProfile) => {

      const userResponse = await checkUserByEmail(user)
      if (userResponse) {

        switch (userResponse.role) {
          case 'INVESTOR':
            setPageLoaded(true);
            break
          case 'PROJECT_MANAGER':
            router.push(`/users/update/project-manager/`)
            break
          case 'ADMINISTRATOR':
            router.push(`/users/update/administrator/`)
            break
        }
      }
    }

    const fetchUserData = async (user: UserProfile) => {
      try {

        const userResponse = await checkUserByEmail(user)

        setUserData(userResponse)

      } catch (error) {

        console.error('Erro ao buscar dados do usuário:', error);
        await redirectNotFound()

      }
    }

    if (!isLoading) {

      if (user) {
        checkAndRedirectRole(user);
        fetchUserData(user);
      } else {
        router.push('/authentication')
      }
    }

  }, [user])

  return (
    <>
      <Container maxW={'1366px'} mx='auto' h='100vh'>
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
                <UsersHeader />
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
                    <FormUsers userData={userData} />
                    <ProfileUserResume userData={userData} />
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
