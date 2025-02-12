'use client'
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { RecoverUserCard } from "@/components/Authentication/Cards/RecoverUserCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";


export default function RecoverAccount() {

    const textColor = useColorModeValue('darkSide', 'dark.darkSide')

    return (
        <Container maxW={'1440px'} mx='auto' h='100vh' color={textColor}>

            <Flex h='100%'>

                {/* BEM VINDO DE VOLTA CARD */}
                <RecoverUserCard />
                {/* DARK CARD */}
                <BlackCard />


            </Flex>
        </Container>
    )
}