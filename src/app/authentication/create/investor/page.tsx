'use client'
import { checkUserByEmail } from "@/app/services/checkUserByEmail/route";
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { CreateInvestorAccountCard } from "@/components/Authentication/Cards/Investor/CreateInvestorAccount";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function CreateInvestorAccount() {

    const [loadingDBUser, setLoadingDBUser] = useState(true)
    const { user, isLoading } = useUser()
    const router = useRouter()


    useEffect(() => {

        const manageLogin = async (user: UserProfile) => {

            try {

                const userResponse = await checkUserByEmail(user)

                if (userResponse) {
                    console.log("Usuário já cadastrado no banco de dados")

                    switch (userResponse.role) {
                        case 'INVESTOR':
                            router.push(`/users/update/investor/`)
                            break
                        case 'PROJECT_MANAGER':
                            router.push(`/users/update/project-manager/`)
                            break
                        case 'ADMINISTRATOR':
                            router.push(`/users/update/administrator/`)
                            break
                    }
                } else {
                    console.log('Usuário ainda não cadastrado no banco de dados.');
                    setLoadingDBUser(false)
                }

            } catch (error) {
                if (error instanceof AxiosError) {

                    if (error.status == 404) {
                        console.log('Usuário ainda não cadastrado no banco de dados.');
                        setLoadingDBUser(false)
                    }

                } else {
                    console.error('Erro inesperado:', error);
                    throw error
                }
            }
        };

        if (user) {

            console.log('user')
            console.log(user)
            manageLogin(user);
        } else {
            // router.push('/authentication')
        }

    }, [user]);


    if (!user) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!user.email) {
        return (
            <SpinnerFullScreen />
        )
    }

    return (
        <Container maxW={'1440px'} mx='auto' h='100vh' color='darkSide'>

            <Flex h='100%'>
                {loadingDBUser ?
                    <Flex alignItems={'center'} justifyContent={'center'} h='100%' w='100%'>
                        <Spinner boxSize={32} />
                    </Flex>
                    :

                    <>
                        {/* BEM VINDO DE VOLTA CARD */}
                        < CreateInvestorAccountCard user={user} router={router} />
                        {/* DARK CARD */}
                        <BlackCard />
                    </>
                }


            </Flex>
        </Container>
    )
}