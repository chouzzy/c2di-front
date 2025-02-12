'use client'
// app/page.tsx
import { Button, Container, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUserByEmail } from "./services/checkUserByEmail";
import { api } from "./services/axios";
import axios, { AxiosError } from "axios";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";

const setAccessTokenCookie = async () => {
  try {

    await axios.post('/api/setAccessTokenCookie');
  } catch (error) {
    console.error('Error setting access token cookie:', error);
    // Handle error (e.g., redirect to login)
  }
};

export default function Home() {

  const bgButtonColor= useColorModeValue('darkSide', 'dark.lightSide')
  const { user, error, isLoading } = useUser()
  console.log('user')
  console.log(user)
  const [loginStatus, setLoginStatus] = useState('Aguarde, estamos te redirecionando...')
  const router = useRouter()
  const [userDB, setUserDB] = useState<User>()
  const [loadingUser, setLoadingUser] = useState(true)

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
            case 'PROPRIETARIO':
              router.push(`/projects`)
              break
          }
        } else {
          setLoadingUser(false)
        }


      } catch (error) {

        setLoadingUser(false)

        if (error instanceof AxiosError) {

          if (error.status == 404) {
            // router.push(`/authentication/create/investor`)
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
      <Flex flexDir={'column'} w='100%' h='100vh' alignItems={'center'} justifyContent={'center'}>
        <Flex gap={2} p={4} >

          {loadingUser ?
            <SpinnerFullScreen/>

            :
            <Flex flexDirection={'column'} w='100%' alignItems={'center'} justifyContent={'center'} gap={4}>
              <Flex>
                <Text fontWeight={'semibold'}>
                  Como deseja se cadastrar?
                </Text>
              </Flex>
              <Flex gap={8}>
                <Flex>
                  <Button onClick={() => { router.push(`/authentication/create/investor`) }} bgColor={bgButtonColor} color='white'>
                    Investidor
                  </Button>
                </Flex>
                <Flex>
                  <Button onClick={() => { router.push(`/authentication/create/proprietario`) }} bgColor={'redSide'} color='white'>
                    Proprietário
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          }
        </Flex>
      </Flex>
    </Container>
  );
}