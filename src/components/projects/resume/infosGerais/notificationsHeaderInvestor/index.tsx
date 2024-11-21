import { Flex, Button, Text } from "@chakra-ui/react"


interface NotificationsHeaderProps {
    createNotification: () => void
}

export function NotificationsHeaderAdmin({createNotification}:NotificationsHeaderProps) {

    return (

        < Flex >

            <Flex flexDir={'column'}>
                <Text fontSize={16} fontWeight={'semibold'}>
                    Quadro de avisos
                </Text>
                <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                    Avisos enviados para os investidores da obra, para informá-los sobre algo.
                </Text>
            </Flex>

            <Flex alignItems={'end'}>

                <Button onClick={createNotification} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} fontSize={12}>
                    <Flex alignItems={'center'} justifyContent={'center'}>
                        <Text>Adicionar aviso</Text>
                    </Flex>
                </Button>

            </Flex>
        </Flex >
    )
}