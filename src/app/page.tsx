'use client'
import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { checkUserByEmail } from "./api/checkUserByEmail/route";

// app/page.tsx
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

        const userResponse = await checkUserByEmail(user)

        if (userResponse) {

          switch (userResponse.role) {
            case "INVESTOR":
              router.push(`/users/update/investor/`)
              break
            case 'PROJECT_MANAGER':
              router.push(`/users/update/project-manager/`)
              break
            case 'ADMINISTRATOR':
              router.push(`/users/update/investor/`)
              break
          }
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
      } else {
        router.push('/authentication')
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