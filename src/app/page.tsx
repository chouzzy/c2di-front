'use client'
import { Button, Container, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// app/page.tsx
export default function Home() {

  const { user, error, isLoading } = useUser()

  const [loginStatus, setLoginStatus] = useState('Aguarde, estamos te redirecionando...')

  const router = useRouter()

  // MANAGE LOGIN
  useEffect(() => {
    const manageLogin = async () => {
      try {

        await axios.post('/api/setAccessTokenCookie');

        if (user) {

          try {

            const response = await axios.get(`http://localhost:8081/users/findUnique/?email=${user.email}`, { withCredentials: true })

            if (response.status == 200) {
              const userResponse: User = response.data.user
              router.push(`/users/update/${userResponse.id}`)
            }


          } catch (error) {

            if (error instanceof AxiosError) {

              if (error.status == 404) {
                router.push(`/authentication/create/investor`)
              } else {
                console.error('Erro ao buscar dados do usuário:', error);
                setLoginStatus("Ocorreu um erro ao buscar seus dados. Por favor, tente novamente mais tarde.");

              }

            } else {
              console.error('Erro inesperado:', error);
              setLoginStatus("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
            }
            throw error
          }
        }
      } catch (error) {
        console.error('Erro ao definir o gerenciar o login:', error);
        setLoginStatus("Ocorreu um erro ao configurar sua sessão. Por favor, tente novamente mais tarde.");

      }
    };

    if (user) {
      manageLogin();
    }
  }, [user]);

  return (
    <Container maxW={'1366px'} mx='auto'>
      <Flex flexDir={'column'}>
        <Flex gap={2} p={4} alignItems={'center'}>
          <Text>
            {loginStatus}
          </Text>
          <Spinner boxSize={4} />
        </Flex>
      </Flex>
    </Container>
  );
}