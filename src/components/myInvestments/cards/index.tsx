import { Flex, Text } from "@chakra-ui/react";
import { IoIosTrendingUp } from "react-icons/io";

interface MyInvestmentCardsProps {
    userInvestmentsData: UserInvestment[]
}

export function MyInvestmentCards({userInvestmentsData}:MyInvestmentCardsProps ) {

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });

    const sumInvestmentValue = userInvestmentsData.reduce((soma, userInvestment) => { return soma + userInvestment.investedValue }, 0)
    const mediaInvestmentValue = sumInvestmentValue / userInvestmentsData.length;

    return (
        <Flex gap={4} minW={360} color={'lightSide'}>

            {/* CARD 1 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Último investimento</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(userInvestmentsData[userInvestmentsData.length - 1].investedValue)}</Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={'green.300'} gap={1}> <Text> +11.01% </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>

                </Flex>

            </Flex>

            {/* CARD 2 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Investimento médio</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={26} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(mediaInvestmentValue)} </Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={'green.300'} gap={1}> <Text> +24.16% </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>

                </Flex>

            </Flex>

            {/* CARD 3 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Total investido</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={26} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(sumInvestmentValue)} </Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={'green.300'} gap={1}> <Text> +2.17% </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>

                </Flex>

            </Flex>

        </Flex>
    )
}