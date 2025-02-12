import { Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";


export function SpinnerFullScreen() {

    const spinnerColor = useColorModeValue('darkSide', 'dark.darkSide')

    return (
        <Container maxW={'1440px'} mx='auto' h='100vh' color={spinnerColor}>
            <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'center'}>
                <Spinner boxSize={32} />
            </Flex>
        </Container>
    )
}