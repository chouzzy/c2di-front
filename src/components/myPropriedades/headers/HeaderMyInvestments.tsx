import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";
import { IoIosTrendingUp } from "react-icons/io";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderMyInvestments() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex alignItems={'center'} gap={2}>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Meus investimentos
                    </Text>
                    <IoIosTrendingUp size={32}/>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar a lista de investimentos adquiridos
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}