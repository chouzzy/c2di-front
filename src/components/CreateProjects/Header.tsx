import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function CreateProjectHeader() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Criação de projetos
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Atente-se a todos os campos necessários na criação do projeto
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}