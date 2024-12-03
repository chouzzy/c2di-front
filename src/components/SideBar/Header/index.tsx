import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Bell, Moon, Sun } from "phosphor-react";
import { useState } from "react";
import { UserNotificationsModal } from "./userNotificationsModal";


interface HeaderProps {
    name: string
    userData: User
}

export function Header({ name, userData }: HeaderProps) {

    const [darkMode, setDarkmode] = useState<boolean>(false)


    return (
        <Flex flexDirection="column" gap={2}>

            <Flex alignItems={'end'} justifyContent={'space-between'}>

                <Flex flexDir={'column'}>

                    <Text fontSize="xl" fontWeight="bold">
                        Bem vindo(a),
                    </Text>

                    <Text>{name}</Text> {/* Nome do usuário */}
                </Flex>


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
                <Flex borderRadius="md" py={2} _hover={{ color: "redSide", transition: "200ms" }} position={'relative'}>
                    <UserNotificationsModal userData={userData} />
                </Flex>



            </Flex>

        </Flex>
    )
}