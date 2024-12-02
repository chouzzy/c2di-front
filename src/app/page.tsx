'use client'
// app/page.tsx
import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { checkUserByEmail } from "./services/checkUserByEmail";

const setAccessTokenCookie = async () => {
  try {
    await axios.post('/api/setAccessTokenCookie');
  } catch (error) {
    console.error('Error setting access token cookie:', error);
    // Handle error (e.g., redirect to login)
  }
};

export default function Home() {

  const { user, error, isLoading } = useUser()
  console.log('user')
  console.log(user)
  const [loginStatus, setLoginStatus] = useState('Aguarde, estamos te redirecionando...')
  const router = useRouter()

  // MANAGE LOGIN
  useEffect(() => {
    const manageLogin = async (user: UserProfile) => {
      try {

        await setAccessTokenCookie()
        const userResponse = await checkUserByEmail(user)

        if (userResponse) {

          switch (userResponse.role) {
            case "INVESTOR":
              router.push(`/dashboard`)
              break
            case 'PROJECT_MANAGER':
              router.push(`/project-manager/projects`)
              break
            case 'ADMINISTRATOR':
              router.push(`/projects`)
              break
          }
        } else {
          router.push(`/authentication/create/investor`)
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
      }
    };

      if (user) {
        manageLogin(user);
      }
  }, [user]);

  return (
    <Container maxW={'1440px'} mx='auto'>
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