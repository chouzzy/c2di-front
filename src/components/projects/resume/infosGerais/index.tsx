import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { DotsThree } from "phosphor-react";

interface ProjectDataProps {
    projectData: Investment
}

export function InfosGerais({ projectData }: ProjectDataProps) {

    return (
        <Flex w='100%' py={8} flexDir={'column'}>
            {/* IMAGEM GIGANTE */}
            <Flex w='100%'>
                <Image src={projectData.images[0].url} h={300} w='100%' objectFit={'cover'} objectPosition={'center'} />
            </Flex>

            <Flex w='100%' py={16} gap={8}>

                {/* GRAFICOS */}
                <Flex w='100%' flexDir={'column'} gap={8}>
                    <Flex flexDir={'column'}>
                        <Text fontSize={20} fontWeight={'semibold'}>
                            Gráfico de custo previsto x realizado
                        </Text>
                        <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                            Aqui ficará o gráfico de custo previsto da obra vs realizado mês a mês
                        </Text>
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Text fontSize={20} fontWeight={'semibold'}>
                            Gráfico do andamento da obra
                        </Text>
                        <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                            Aqui ficará o gráfico do andamento de cada uma das partes da obra
                        </Text>
                    </Flex>
                </Flex>

                {/* QUADRO DE AVISOS */}
                <Flex w='100%' flexDir={'column'} gap={8}>
                    <Flex >
                        <Flex flexDir={'column'}>
                            <Text fontSize={16} fontWeight={'semibold'}>
                                Quadro de avisos
                            </Text>
                            <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                                Avisos enviados para os investidores da obra, para informá-los sobre algo.
                            </Text>
                        </Flex>
                        <Flex alignItems={'end'}>
                            <Button _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} fontSize={12}>
                                <Flex  alignItems={'center'} justifyContent={'center'}>
                                    <Text>Adicionar aviso</Text>
                                </Flex>
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex w='100%' border='1px' borderColor={'grayDivisor'} borderRadius={8} p={4} flexDir={'column'}>

                        <Flex py={2} borderBottom='1px' borderColor={'grayDivisor'} alignItems={'center'} gap={4}>
                            <Text fontSize={12} fontWeight={'medium'}>
                                Avisos enviados para os investidores da obra, para informá-los sobre algo.
                            </Text>
                            <DotsThree/>
                        </Flex>
                        <Flex py={2} borderBottom='1px' borderColor={'grayDivisor'} alignItems={'center'} gap={4}>
                            <Text fontSize={12} fontWeight={'medium'}>
                                Avisos enviados para os investidores da obra, para informá-los sobre algo.
                            </Text>
                            <DotsThree/>
                        </Flex>
                        <Flex py={2} borderBottom='1px' borderColor={'grayDivisor'} alignItems={'center'} gap={4}>
                            <Text fontSize={12} fontWeight={'medium'}>
                                Avisos enviados para os investidores da obra, para informá-los sobre algo.
                            </Text>
                            <DotsThree/>
                        </Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}