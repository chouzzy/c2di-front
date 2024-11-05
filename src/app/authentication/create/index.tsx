import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { CreateUserCard } from "@/components/Authentication/Cards/CreateUserCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { Container, Flex } from "@chakra-ui/react";


export default function CreateAccount() {

    return (
        <Container maxW={'1366px'} mx='auto' h='100vh' color='darkSide'>

            <Flex h='100%'>

                {/* BEM VINDO DE VOLTA CARD */}
                <CreateUserCard />
                {/* DARK CARD */}
                <BlackCard />


            </Flex>
        </Container>
    )
}