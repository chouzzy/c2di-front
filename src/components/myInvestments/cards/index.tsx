import { Flex, Text } from "@chakra-ui/react";
import { IoIosTrendingUp } from "react-icons/io";

interface MyInvestmentCardsProps {
    userInvestmentsData: UserInvestment[]
    projectsData: Investment[]
}

export function MyInvestmentCards({ userInvestmentsData, projectsData }: MyInvestmentCardsProps) {

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });

    console.log(projectsData)

    // SOMA DOS VALORES ORIGINAIS E CORRENTES DO PROJETO
    const sumValorOriginal = projectsData.reduce((soma, project) => { return soma + project.valorOriginal }, 0)
    const sumValorCorrente = projectsData.reduce((soma, project) => { return soma + project.valorCorrente }, 0)

    // SOMA DOS VALORES DOS IMÓVEIS QUANDO O CLIENTE COMPROU
    const sumInvestmentValorNaEpocaDoInvestimento = userInvestmentsData.reduce((soma, userInvestment) => { return soma + userInvestment.valorCorrente }, 0)

    // SOMA DOS VALORES INVESTIDOS PELO CLIENTE (O que saiu do bolso)
    const sumInvestmentValue = userInvestmentsData.reduce((soma, userInvestment) => { return soma + userInvestment.investedValue }, 0)

    // MEDIA INVESTIDO
    const mediaInvestmentValue = sumInvestmentValue / userInvestmentsData.length;

    // LUCRO TOTAL DO PROJETO
    const totalProjectsProfit = (sumValorCorrente - sumValorOriginal) / sumValorOriginal
    const totalProjectsProfitString = ` ${(totalProjectsProfit * 100).toFixed(2)}% `


    // LUCRO DO CLIENTE
    const totalUserProfit = (sumValorCorrente - sumInvestmentValorNaEpocaDoInvestimento) / sumInvestmentValorNaEpocaDoInvestimento
    const totalUserProfitString = ` ${(totalUserProfit * 100).toFixed(2)}% `

    return (
        <Flex gap={4} minW={360} color={'lightSide'}>

            {/* CARD 1 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Valor médio investido</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(mediaInvestmentValue)}</Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalUserProfitString}  </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>
                    <Flex fontSize={10}>Somatória dos valores investidos dividido pela quantidade de investimentos aplicados.</Flex>

                </Flex>

            </Flex>

            {/* CARD 2 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Total investido</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={26} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(sumInvestmentValue)} </Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalUserProfitString} </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>
                    <Flex fontSize={10}>O total investido na plataforma até a data atual.</Flex>

                </Flex>

            </Flex>

            {/* CARD 3 */}
            <Flex flexDir={'column'} gap={4} w='100%' bgColor={'darkSide'} px={8} py={4} borderRadius={12}>

                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                    <Flex fontSize={12}>Valor total dos imóveis</Flex>
                    <Flex justifyContent={'space-between'}>
                        <Flex fontSize={26} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(sumValorCorrente)} </Text></Flex>
                        <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalProjectsProfitString} </Text> <IoIosTrendingUp /> </Flex>
                    </Flex>
                    <Flex fontSize={10}>Somatória dos valores correntes de cada imóvel no qual você possui investimentos aplicados.</Flex>

                </Flex>

            </Flex>

        </Flex >
    )
}