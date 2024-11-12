import { Flex, Text } from "@chakra-ui/react";

interface StaticProfileProps {
    type: string,
    data: string

}

export function StaticProfile({ type, data }: StaticProfileProps) {

    return (
        <Flex flexDir={'column'}>
            <Text fontWeight={'semibold'} fontSize={16}> {type} </Text>
            <Flex py={2}>{data}</Flex>
        </Flex>
    )
}