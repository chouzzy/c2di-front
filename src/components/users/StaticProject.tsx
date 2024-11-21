import { Flex, Text } from "@chakra-ui/react";

interface StaticProfileProps {
    type: string,
    data: string,
    dataType?: 'MONEY' | 'AREA'

}

export function StaticProject({ type, data, dataType }: StaticProfileProps) {

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const valorFormatado = formatador.format(Number(data));


    return (
        <Flex flexDir={'column'} gap={2}>
            <Text fontWeight={'semibold'} fontSize={16}> {type} </Text>

            {dataType == 'MONEY' ? <Flex bgColor={'white'}>{valorFormatado}</Flex> : ''}
            {dataType == 'AREA' ? <Flex bgColor={'white'}>{valorFormatado}/m²</Flex> : ''}

            {!dataType ? <Flex bgColor={'white'}>{data}</Flex> : ''}
        </Flex>
    )
}