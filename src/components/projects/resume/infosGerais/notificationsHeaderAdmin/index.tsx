import { Flex, Button, Text } from "@chakra-ui/react"


interface NotificationsHeaderProps {
    createNotification: () => void
}

export function NotificationsHeaderInvestor({createNotification}:NotificationsHeaderProps) {

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
        </Flex >
    )
}