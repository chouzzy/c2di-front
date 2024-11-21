import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Text } from "@chakra-ui/react";

interface HeaderProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderInvestorGalleryFotosProject() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Fotos
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar as fotos do projeto selecionado
                    </Text>
                </Flex>
            </Flex>
        </>


    )
}