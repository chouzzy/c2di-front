import { Button, Flex, Text } from "@chakra-ui/react";


export function AdminHeader() {

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

            <Flex gap={8} alignItems={'center'}>
                <Button color={'lightSide'} bgColor={'darkSide'} mt={4}>
                    Alterar senha
                </Button>
                <Button color={'lightSide'} bgColor={'redSide'} mt={4}>
                    Apagar usuário
                </Button>
            </Flex>
        </>


    )
}