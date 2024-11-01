import { SideBar } from '@/components/SideBar'
import FormUsers from '@/components/Users/FormUsers'
import { UsersHeader } from '@/components/Users/Header'
import { ProfileUserResume } from '@/components/Users/ProfileUserResume'
import { Container, Flex, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Users() {

  const router = useRouter();
  const userId = router.query.id;

  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const redirectNotFound = async () => {
    router.push("/404")
  }

  // GET USER
  useEffect(() => {

    const fetchUserData = async (userId: string) => {
      try {

        const response = await axios.get(`http://localhost:8081/users?id=${userId}`);

        const user: User = response.data.users[0]

        setUserData(user)


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
            <SideBar />
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

            {loading && (userData) ?
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
                  <ProfileUserResume />
                </Flex>

              </Flex>
            }

          </Flex>
        </Flex>

      </Container >
    </>
  )
}
