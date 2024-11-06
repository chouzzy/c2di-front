import { Button, Flex, Spinner, Text } from "@chakra-ui/react";

interface ProfileUsersProps {
    userData: User | null
}

export function ProfileUserResume({ userData }: ProfileUsersProps) {

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
                        {userData ?

                            <Text fontSize={32} fontWeight={'medium'}>
                                {userData.investorProfileName}
                            </Text>
                            :
                            <Flex boxSize={16} mx='auto'>
                                <Spinner
                                    boxSize={6}
                                    color='darkSide'
                                />
                            </Flex>
                        }

                    </Flex>
                </Flex>
                <Flex>

                    {userData ?

                        <Text>
                            {userData.investorProfileDescription}
                        </Text>
                        :
                        <Flex boxSize={16} mx='auto'>
                            <Spinner
                                boxSize={6}
                                color='darkSide'
                            />
                        </Flex>
                    }
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