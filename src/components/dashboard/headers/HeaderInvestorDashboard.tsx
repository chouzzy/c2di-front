import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderInvestorDashboard() {

    return (
        <>
            <Flex flexDir={'column'}>
            <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Dashboard
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Veja aqui um resumo dos seus investimentos
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}