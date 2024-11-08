import { Button, Flex, Text } from "@chakra-ui/react";


export function UsersListHeader() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Usuários
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar a listagem de usuários cadastrados no portal
                    </Text>
                </Flex>
            </Flex>

            <Flex>
                <Button _hover={{bgColor:'redSide', transition:'300ms'}} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                    Criar usuário
                </Button>
            </Flex>
        </>


    )
}