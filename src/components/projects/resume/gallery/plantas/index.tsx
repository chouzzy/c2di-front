import { Button, Flex, Image, Text } from "@chakra-ui/react";

interface ProjectDataProps {
    projectData: Investment
}
export function PlantasGaleria({ projectData }: ProjectDataProps) {

    const redirectToFotos = () => {
        window.location.href = `${window.location.pathname}/plantas`
    }

    const previousImages = projectData.images.filter(img => img.label === 'PLANTAS')

    return (

        <Flex flexDir={'column'} w='100%' gap={6}>
            {/* HEADER */}
            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                <Flex flexDir={'column'}>
                    <Flex> <Text fontSize={16} fontWeight={'semibold'}> Plantas </Text></Flex>
                    <Flex> <Text fontSize={14}> Plantas do projeto </Text></Flex>
                </Flex>
            </Flex>

            {/* IMAGE */}
            <Flex w='100%'>
                <Flex gap={2} w='100%'>
                    {
                        previousImages.map((image, i) => {

                            if (i > 1) { return }

                            return (
                                <Image key={i+image.url} src={`${image.url}`} h={32} w={[28, 28, '100%', '100%', 40]} objectFit={'cover'} objectPosition={'center'} />
                            )
                        })}
                    <Flex onClick={() => { redirectToFotos() }} w='100%' bgColor={'grayBox'} justifyContent={'center'} alignItems={'center'} cursor={'pointer'} _hover={{ bgColor: 'darkSide', color: 'lightSide', transition: '600ms' }}>
                        <Text> Ver mais </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}