import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { RecoverUserCard } from "@/components/Authentication/Cards/RecoverUserCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { Container, Flex } from "@chakra-ui/react";


export default function RecoverAccount() {

    return (
        <Container maxW={'1366px'} mx='auto' h='100vh' color='darkSide'>

            <Flex h='100%'>

                {/* BEM VINDO DE VOLTA CARD */}
                <RecoverUserCard />
                {/* DARK CARD */}
                <BlackCard />


            </Flex>
        </Container>
    )
}