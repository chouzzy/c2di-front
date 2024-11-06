"use client"

import { SideBar } from '@/components/SideBar'
import FormUsers from '@/components/users/FormUsers'
import { UsersHeader } from '@/components/users/Header'
import { ProfileUserResume } from '@/components/users/ProfileUserResume'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Users() {

  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const redirectNotFound = async () => {
    router.push("/404")
  }

  // GET USER
  useEffect(() => {

    const fetchUserData = async (userId: string) => {
      try {

        const response = await axios.get(`http://localhost:8081/users?id=${userId}`, { withCredentials: true });

        const userResponse: User = response.data.users[0]

        setUserData(userResponse)

      } catch (error) {

        console.error('Erro ao buscar dados do usuário:', error);
        await redirectNotFound()

      } finally {
        setTimeout(() => { setLoading(false) }, 1000)
        // Finaliza o loading
      }
    };


    if (userId && typeof (userId) == 'string') {
      fetchUserData(userId);
    }
  }, [userId])

  return (
    <>
      <Container maxW={'1366px'} mx='auto' h='100vh'>

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
      </Container >
    </>
  )
}
