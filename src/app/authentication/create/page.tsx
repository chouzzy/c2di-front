'use client'
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { CreateUserCard } from "@/components/Authentication/Cards/CreateUserCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";


export default function CreateAccount() {

    const textColor = useColorModeValue('darkSide', 'dark.darkSide')
    const { user, isLoading } = useUser()

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
        <Container maxW={'1440px'} mx='auto' h='100vh' color={textColor}>

            <Flex h='100%'>

                {/* BEM VINDO DE VOLTA CARD */}
                <CreateUserCard user={user} />
                {/* DARK CARD */}
                <BlackCard />


            </Flex>
        </Container>
    )
}