import { Flex, Text } from "@chakra-ui/react";

interface StaticProfileProps {
    type: string,
    data: string

}

export function StaticProject({ type, data }: StaticProfileProps) {

    return (
        <Flex flexDir={'column'} gap={2}>
            <Text fontWeight={'semibold'} fontSize={16}> {type} </Text>
            <Flex py={2} px={4} border='1px' borderColor={'grayDivisorTransparent'} borderRadius={8} bgColor={'white'}>{data}</Flex>
        </Flex>
    )
}