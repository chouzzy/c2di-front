"use client"

import { useUser } from "@auth0/nextjs-auth0/client";

import { Container, Flex, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";

export default  function Login() {

    const textColor = useColorModeValue('darkSide', 'dark.darkSide')
    const { user, error, isLoading,  } = useUser();
    
    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>{error.message}</div>;
    
    if (user) {
        return (

            <Container maxW={'1440px'} mx='auto' color={textColor}>
                <Flex flexDir={'column'}>

                    <Flex gap={2}>

                        <Image src={user.picture ?? ""} alt={user.name ?? "nada"} boxSize={16} />
                        <Flex flexDir={'column'}>

                            <Heading>{user.name}</Heading>
                            <Text>{user.email}</Text>
                        </Flex>
                    </Flex>

                </Flex>
            </Container>
        )
    } else {
        return (
            <Flex>
                here we go again
            </Flex>
        )
    }

}