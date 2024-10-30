import { Flex, Text } from "@chakra-ui/react";
import { WarningCircle } from "phosphor-react";


interface ErrorInputComponentProps {
    error: string
    // errors: any,
    // fieldName: string
}

export function ErrorInputComponent({ error }: ErrorInputComponentProps) {

    if (!error) {
        return
    }

    return (
        <Flex key={error} color={'redSide'} gap={2} alignItems={'center'}>
            <Flex>
                <WarningCircle size={24} />
            </Flex>
            <Text fontSize={'sm'}>{error}</Text> {/* Exibe a mensagem de erro do campo */}
        </Flex>
    )
}

