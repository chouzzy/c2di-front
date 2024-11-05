import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { CreateUserCard } from "@/components/Authentication/Cards/CreateUserCard";
import { CreateInvestorAccountCard } from "@/components/Authentication/Cards/Investor/CreateInvestorAccount";
import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function CreateInvestorAccount() {

    return (
        <Container maxW={'1366px'} mx='auto' h='100vh' color='darkSide'>

        <Flex h='100%'>

            {/* BEM VINDO DE VOLTA CARD */}
            <CreateInvestorAccountCard />
            {/* DARK CARD */}
            <BlackCard />


        </Flex>
    </Container>
    )
}