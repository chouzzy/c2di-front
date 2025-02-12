'use client'
import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { NewPasswordCard } from "@/components/Authentication/Cards/NewPasswordCard";
import { RecoverUserCard } from "@/components/Authentication/Cards/RecoverUserCard";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";


export default function NewPassword() {

    return (
        <Container maxW={'1440px'} mx='auto' h='100vh' color={useColorModeValue('darkSide', 'dark.darkSide')}>

            <Flex h='100%'>

                {/* BEM VINDO DE VOLTA CARD */}
                <NewPasswordCard />
                {/* DARK CARD */}
                <BlackCard />


            </Flex>
        </Container>
    )
}