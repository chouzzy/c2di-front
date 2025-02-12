import { Flex, Button, Text, useColorModeValue } from "@chakra-ui/react"


interface NotificationsHeaderProps {
    createNotification: () => void
}

export function NotificationsHeaderAdmin({createNotification}:NotificationsHeaderProps) {

    const textColor = useColorModeValue('graySide', 'lightSide')
    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    return (

        < Flex justifyContent={'space-between'}>

            <Flex flexDir={'column'}>
                <Text fontSize={16} fontWeight={'semibold'}>
                    Quadro de avisos
                </Text>
                <Text fontSize={14} fontWeight={'normal'} color={textColor} letterSpacing={'-0.2px'}>
                    Avisos enviados para os investidores da obra, para informá-los sobre algo.
                </Text>
            </Flex>

            <Flex alignItems={'end'}>

                <Button onClick={createNotification} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={bgButtonColor} fontSize={12}>
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        <Text>Adicionar aviso</Text>
                    </Flex>
                </Button>

            </Flex>
        </Flex >
    )
}