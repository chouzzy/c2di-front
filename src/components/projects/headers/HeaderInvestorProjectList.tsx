import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderInvestorProjectList() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={[24,24,24,28,28]} fontWeight={'semibold'}>
                        Projetos
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar a listagem de projetos disponíveis para investir
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}