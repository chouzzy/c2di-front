import { Flex, Text } from "@chakra-ui/react";
import { Bell, BellRinging, Moon, Sun } from "phosphor-react";
import { useState } from "react";
import { boolean } from "yup";

interface HeaderProps {
    name: string
}

export function Header({ name }: HeaderProps) {

    const [darkMode, setDarkmode] = useState<boolean>(false)

    return (
        <Flex flexDirection="column" gap={2}>

            <Flex flexDir={'column'}>


                <Text fontSize="xl" fontWeight="bold">
                    Bem vindo(a),
                </Text>

                <Text>{name}</Text> {/* Nome do usuário */}

            </Flex>
            {/* Botões no cabeçalho */}

            <Flex
                mt={4}
                justifyContent={'space-between'}
                borderBottom={'1px'}
                borderColor={'grayDivisor'}
                py={1}
            >
                <Flex
                    onClick={() => { setDarkmode(!darkMode) }}
                    as="button"
                    borderRadius="md"
                    py={2}
                    _hover={{ color: "redSide", transition: "200ms" }}>
                    {darkMode ?
                        <Sun size={24} />
                        :
                        <Moon size={24} />

                    }
                </Flex>
                <Flex as="button" borderRadius="md" py={2} _hover={{ color: "redSide", transition: "200ms" }}>
                    <Bell size={20} />
                </Flex>
            </Flex>

        </Flex>
    )
}