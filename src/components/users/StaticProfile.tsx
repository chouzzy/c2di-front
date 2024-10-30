import { Flex, Text } from "@chakra-ui/react";

interface StaticProfileProps {
    type: string,
    data: string

}

export function StaticProfile({ type, data }: StaticProfileProps) {

    return (
        <Flex flexDir={'column'}>
            <Text fontWeight={'bold'} fontSize={'sm'}> {type} </Text>
            <Flex p={2}>{data}</Flex>
        </Flex>
    )
}