'use client'
import { Button, Container, Flex, Link } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleLogout } from '@auth0/nextjs-auth0';

// Função para fazer logout


// app/page.tsx
export default function Home() {

  const { user, error, isLoading } = useUser()

  console.log('user')
  console.log(user)

  const [userData, setUserData] = useState<User>()


  useEffect(() => {
    const setCookie = async () => {
      try {

        await axios.post('/api/setAccessTokenCookie');

        if (user) {

          const response = await axios.get(`http://localhost:8081/users/?email=joao.silva@example.com`, { withCredentials: true });

          const userResponse: User = response.data.users[0]

          setUserData(userResponse)
        }


      } catch (error) {
        console.error('Erro ao definir o cookie:', error);
      }
    };

    if (user) {
      setCookie();
    }
  }, [user]);

  return (
    <Container maxW={'1366px'} mx='auto'>
      <Flex flexDir={'column'}>
        
        home!
        {userData ?
          <Flex flexDir={'column'} gap={4}>

            <Flex>
              Bem vindo querido {userData.name},
            </Flex>
            <Flex>
              do email {userData.email},
            </Flex>
            <Flex>
              do cpf {userData.cpf}
            </Flex>

            <Link href='/api/auth/logout'>
              <Button
                colorScheme="red"
                maxW={32}
              >
                Logout
              </Button>
            </Link>

          </Flex>
          :
          <>ninguém logado </>
        }
      </Flex>
    </Container>
  );
}