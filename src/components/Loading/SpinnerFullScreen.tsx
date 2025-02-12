import { Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";


export function SpinnerFullScreen() {

    return (
        <Container maxW={'1440px'} mx='auto' h='100vh' color={useColorModeValue('darkSide', 'dark.darkSide')}>
            <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32} />
            </Flex>
        </Container>
    )
}