import { Divider, Flex, Progress, Text } from "@chakra-ui/react"

interface CustosProps {
    projectData: Investment
}

export function Custos({ projectData }: CustosProps) {

    const {
        foundation: foundationPredict,
        implantation: implantationPredict,
        structure: structurePredict,
        workmanship: workmanshipPredict
    } = projectData.predictedCost


    const {
        foundation: foundationRealized,
        implantation: implantationRealized,
        structure: structureRealized,
        workmanship: workmanshipRealized
    } = projectData.realizedCost

    const maiorValorPredicted = Math.max(foundationPredict, implantationPredict, structurePredict, workmanshipPredict);

    return (
        <Flex w='100%' flexDir={'column'} gap={4}>

            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Custos estimados previstos x realizados </Text> </Flex>


            <Flex flexDir={'column'} gap={2}>
                <Flex>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Fundação
                    </Text>
                </Flex>

                <Flex flexDir={'column'} gap={1}>
                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>

                            <Text fontWeight={'normal'}>
                                Previsto:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {foundationPredict.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='blue' height={5} value={foundationPredict / maiorValorPredicted * 100} />
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>
                            <Text fontWeight={'normal'}>
                                Realizado:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {foundationRealized.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='green' height={5} value={foundationRealized / maiorValorPredicted * 100} />
                    </Flex>
                </Flex>
            </Flex>

            <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />


            <Flex flexDir={'column'} gap={2}>
                <Flex>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Implantação
                    </Text>
                </Flex>

                <Flex flexDir={'column'} gap={1}>
                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>

                            <Text fontWeight={'normal'}>
                                Previsto:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {implantationPredict.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='blue' height={5} value={implantationPredict / maiorValorPredicted * 100} />
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>
                            <Text fontWeight={'normal'}>
                                Realizado:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {implantationRealized.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='green' height={5} value={implantationRealized / maiorValorPredicted * 100} />
                    </Flex>
                </Flex>
            </Flex>

            <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />


            <Flex flexDir={'column'} gap={2}>
                <Flex>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Estrutura
                    </Text>
                </Flex>

                <Flex flexDir={'column'} gap={1}>
                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>

                            <Text fontWeight={'normal'}>
                                Previsto:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {structurePredict.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='blue' height={5} value={structurePredict / maiorValorPredicted * 100} />
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>
                            <Text fontWeight={'normal'}>
                                Realizado:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {structureRealized.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='green' height={5} value={structureRealized / maiorValorPredicted * 100} />
                    </Flex>
                </Flex>
            </Flex>

            <Divider orientation='horizontal' h={'1px'} w='100%' mx='auto' bgColor={'grayDivisor'} />


            <Flex flexDir={'column'} gap={2}>
                <Flex>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Mão de obra
                    </Text>
                </Flex>

                <Flex flexDir={'column'} gap={1}>
                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>

                            <Text fontWeight={'normal'}>
                                Previsto:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {workmanshipPredict.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='blue' height={5} value={workmanshipPredict / maiorValorPredicted * 100} />
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Flex gap={1} fontSize={'sm'}>
                            <Text fontWeight={'normal'}>
                                Realizado:
                            </Text>
                            <Text fontWeight={'semibold'}>
                                R$ {workmanshipRealized.toLocaleString('pt-br')}
                            </Text>

                        </Flex>
                        <Progress backgroundColor={'#00000000'} isAnimated={true} colorScheme='green' height={5} value={workmanshipRealized / maiorValorPredicted * 100} />
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}