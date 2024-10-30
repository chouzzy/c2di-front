import { Button, Flex, Text } from "@chakra-ui/react";

export function ProfileUserResume() {

    return (
        <Flex w='100%' maxW={'380px'} flexDir={'column'} justifyContent={'space-between'}>

            <Flex flexDir={'column'} gap={4}>
                <Flex flexDir={'column'} gap={1}>
                    <Flex>


                        {/* Título */}
                        <Text fontWeight={'medium'} color='graySide'>
                            Seu perfil de investidor
                        </Text>
                    </Flex>
                    <Flex>

                        {/* Perfil de investidor (conservador, moderado, ousado) */}
                        <Text fontSize={32} fontWeight={'medium'}>
                            Conservador
                        </Text>

                    </Flex>
                </Flex>
                <Flex>
                    O investidor conservador prioriza a segurança e a preservação
                    do capital acima de tudo. Busca investimentos com baixo risco
                    e retornos previsíveis, mesmo que isso signifique abrir mão
                    de ganhos mais expressivos. A tranquilidade de saber que seu dinheiro
                    está protegido é o principal objetivo.
                </Flex>
            </Flex>

            <Flex>

                {/* Refazer teste */}
                <Button fontWeight={'normal'} bgColor={'redSide'} color={'lightSide'} mt={4}>
                    Refazer teste de perfil
                </Button>
            </Flex>

        </Flex>
    )
}