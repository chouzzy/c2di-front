import { Flex, Image, Text } from "@chakra-ui/react"


interface ConstrutoraProps {
    projectData: Investment
}

export function Construtora({ projectData }: ConstrutoraProps) {

    return (
        <Flex flexDir={'column'} gap={4}>
            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Construtora </Text> </Flex>
            <Image mx='auto' objectFit={'contain'} objectPosition={'center'} maxW={64} src={projectData.constructionCompany} />
        </Flex>
    )
}