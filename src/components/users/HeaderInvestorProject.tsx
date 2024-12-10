import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";

interface HeaderProjectProps {
    projectData: Investment
}

export function HeaderInvestorProject({ projectData }: HeaderProjectProps) {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={[24, 24, 24, 28, 28]} fontWeight={'semibold'}>
                        {projectData.title}
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar e editar as informações cadastradas no painel
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}