import { Button, Flex, Text } from "@chakra-ui/react";


export function UsersHeader() {

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Seu perfil
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar e editar as informações cadastradas no painel
                    </Text>
                </Flex>
            </Flex>

            <Flex>
                <Button color={'lightSide'} bgColor={'darkSide'} mt={4}>
                    Alterar senha
                </Button>
            </Flex>
        </>


    )
}