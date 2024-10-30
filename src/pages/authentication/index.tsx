import { BlackCard } from "@/components/Authentication/Cards/BlackCard";
import { WelcomeCard } from "@/components/Authentication/Cards/WelcomeCard";
import { Container, Flex } from "@chakra-ui/react";



export default function WelcomeBack() {
    return (

        <Container maxW={'1366px'} mx='auto' h='100vh' color='darkSide'>

            <Flex h='100%'>
                
                {/* DARK CARD */}
                <BlackCard/>

                {/* BEM VINDO DE VOLTA CARD */}
                <WelcomeCard/>

            </Flex>
        </Container>
    )
}