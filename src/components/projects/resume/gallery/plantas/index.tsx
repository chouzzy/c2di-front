import { Button, Flex, Image, Text } from "@chakra-ui/react";

interface ProjectDataProps {
    projectData: Investment
}
export function PlantasGaleria({ projectData }: ProjectDataProps) {

    return (

        <Flex flexDir={'column'} w='100%' gap={6}>
            {/* HEADER */}
            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                <Flex flexDir={'column'}>
                    <Flex> <Text fontSize={16} fontWeight={'semibold'}> Plantas </Text></Flex>
                    <Flex> <Text fontSize={14}> Plantas do projeto </Text></Flex>
                </Flex>
                <Flex>
                    <Button
                        _hover={{ bgColor: 'graySide' }}
                        color={'lightSide'}
                        bgColor={'darkSide'}
                        size={'sm'}
                    >
                        Alterar fotos
                    </Button>
                </Flex>
            </Flex>

            {/* IMAGE */}
            <Flex w='100%'>
                <Flex gap={2} w='100%'>
                    <Image src={`/assets/projects/${projectData.images[0].url}`} h={32} w={40} objectFit={'cover'} objectPosition={'center'} />
                    <Image src={`/assets/projects/${projectData.images[1].url}`} h={32} w={40} objectFit={'cover'} objectPosition={'center'} />
                    <Flex w='100%' bgColor={'grayBox'} justifyContent={'center'} alignItems={'center'} cursor={'pointer'} _hover={{ bgColor: 'darkSide', color: 'lightSide', transition: '600ms' }}>
                        <Text> Ver mais </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}