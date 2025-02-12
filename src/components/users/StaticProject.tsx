import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface StaticProfileProps {
    type: string,
    data: string,
    dataType?: 'MONEY' | 'AREA'

}

export function StaticProject({ type, data, dataType }: StaticProfileProps) {

    const textColor = useColorModeValue('darkSide', 'lightSide')

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const valorFormatado = formatador.format(Number(data));


    return (
        <Flex flexDir={'column'} gap={2} w='100%' alignItems={['center','center','center', 'start', 'start']}>
            <Text fontWeight={'semibold'} fontSize={16}> {type} </Text>

            {dataType == 'MONEY' ? <Flex color={textColor}>{valorFormatado}</Flex> : ''}
            {dataType == 'AREA' ? <Flex color={textColor}>{valorFormatado}/m²</Flex> : ''}

            {!dataType ? <Flex color={textColor}>{data}</Flex> : ''}
        </Flex>
    )
}