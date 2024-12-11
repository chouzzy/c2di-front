'use client'
import { checkUserByEmail } from "@/app/services/checkUserByEmail";
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { ProfileTestForm } from "@/components/InvestorProfile/ProfileTest/ProfileTestForm";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { Container, Flex, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProfileTest() {

    const [loadingDBUser, setLoadingDBUser] = useState(true)
    const { user, isLoading } = useUser()
    const router = useRouter()

    const [userData, setUserData] = useState<User | undefined>()

    const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: true, xl: false })


    // VALIDAR SÓ INVESTIDOR PODE ACESSAR ESSA ROTA

    useEffect(() => {

        const checkUserDB = async (user: UserProfile) => {

            try {

                const userResponse = await checkUserByEmail(user)

                if (userResponse) {
                    setLoadingDBUser(false)
                    setUserData(userResponse)
                }

            } catch (error) {

                if (error instanceof AxiosError) {

                    if (error.status == 404) {
                        console.log('Usuário ainda não cadastrado no banco de dados.');
                        setLoadingDBUser(false)
                        router.push('/authentication')
                    }

                } else {
                    console.error('Erro inesperado:', error);
                    router.push('/authentication')
                }
            }
        };

        if (user) {
            checkUserDB(user);
        }

    }, [user]);


    if (!user) {
        return (
            <SpinnerFullScreen />
        )
    }
    if (!userData) {
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
        <Flex maxW={'1440px'} mx='auto' color='darkSide'>

            {loadingDBUser ?
                <Flex alignItems={'center'} justifyContent={'center'} h='100%' w='100%'>
                    <Spinner boxSize={32} />
                </Flex>
                :

                <Flex h='100%' w='100%'>
                    <>
                        {/* BEM VINDO DE VOLTA CARD */}
                        < ProfileTestForm user={user} router={router} userData={userData} />
                        {/* DARK CARD */}
                        {isMobile ? '' : <BlackCard />}
                    </>
                </Flex>
            }
        </Flex>
    )
}