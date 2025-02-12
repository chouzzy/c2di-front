import { Button, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileUsersProps {
    userData: User | null
}

export function ProfileUserResume({ userData }: ProfileUsersProps) {

    const textColor = useColorModeValue('graySide', 'dark.graySide')
    const spinnerColor = useColorModeValue('darkSide', 'dark.darkSide')

    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    const handleUpdateProfileTest = () => {
        setIsRedirecting(true)
        router.push("/users/investorProfile/profileTest")
    }

    return (
        <Flex w='100%' maxW={'380px'} flexDir={'column'}>

            <Flex flexDir={'column'} gap={4}>
                <Flex flexDir={'column'} gap={1}>
                    <Flex>

                        {/* Título */}
                        <Text fontWeight={'medium'} color={textColor}>
                            Seu perfil de investidor
                        </Text>

                    </Flex>
                    <Flex>

                        {/* Perfil de investidor (conservador, moderado, ousado) */}
                        {userData ?

                            <Text fontSize={[24, 24, 24, 32, 32]} fontWeight={'medium'}>
                                {userData.investorProfileName ? userData.investorProfileName : 'Não informado.'}
                            </Text>
                            :
                            <Flex boxSize={16} mx='auto'>
                                <Spinner
                                    boxSize={6}
                                    color={spinnerColor}
                                />
                            </Flex>
                        }

                    </Flex>
                </Flex>
                <Flex>

                    {userData ?

                        <Text fontSize={[14, 14, 14, 16, 16]}>
                            {userData.investorProfileDescription ? userData.investorProfileDescription : 'Faça agora mesmo o teste de perfil clicando no botão abaixo!'}
                        </Text>
                        :
                        <Flex boxSize={16} mx='auto'>
                            <Spinner
                                boxSize={6}
                                color={spinnerColor}
                            />
                        </Flex>
                    }
                </Flex>
            </Flex>

            <Flex>

                {/* Refazer teste */}
                <Button onClick={handleUpdateProfileTest} size={['sm','sm','sm','md','md']} fontWeight={'normal'} bgColor={'redSide'} color={'lightSide'} mt={4}>
                    <Flex alignItems={'center'} justifyContent={'center'} w='100%'>
                        {isRedirecting ?
                            <Spinner boxSize={4} />
                            :
                            'Teste de perfil'
                        }
                    </Flex>
                </Button>
            </Flex>

        </Flex>
    )
}