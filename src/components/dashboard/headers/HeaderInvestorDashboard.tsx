import { getProjectList } from "@/app/services/getProjectList";
import { filterUserInvestmentsByUserID, getUserInvestmentListByUserID } from "@/app/services/getUserInvestmentListByID";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Divider, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosTrendingUp } from "react-icons/io";
import { MdArrowDropDownCircle } from "react-icons/md";

interface CotacaoMoeda {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string; // Valor de compra
    ask: string; // Valor de venda
    timestamp: string;
    create_date: string;
}

interface CotacaoResponse {
    USDBRL: CotacaoMoeda;
    EURBRL: CotacaoMoeda;
    [key: string]: CotacaoMoeda; // Essa linha é importante para acomodar outras moedas, caso você busque mais no futuro
}

interface HeaderInvestorProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderInvestorDashboard({ userData, user }: HeaderInvestorProjectProps) {

    const [dolar, setDolar] = useState<CotacaoResponse>()
    const [euro, setEuro] = useState<CotacaoResponse>()
    const [userInvestments, setUserInvestments] = useState<UserInvestment[]>()
    const [investments, setInvestments] = useState<Investment[]>()
    const [totalInvested, setTotalInvested] = useState<number>()
    const [valorMedioQuadradoTotal, setValorMedioQuadradoTotal] = useState<number>()
    const [totalCount, setTotalCount] = useState<number>()


    useEffect(() => {

        const getInvestments = async (userData: User) => {
            try {
                const investments = await getProjectList({ page: '0', pageRange: '9999' })

                // Requisitando os invstimentos do usuário
                const userInvestments = await filterUserInvestmentsByUserID({ page: '0', pageRange: '9999', userID: userData.id })
                setUserInvestments(userInvestments)

                // Calcular o total investido e a contagem
                const total = userInvestments.reduce((sum: number, investment: UserInvestment) => {
                    return sum + investment.investedValue;
                }, 0);
                setTotalInvested(total);
                setTotalCount(userInvestments.length);

                // Filtrando os investimentos para calcular a média do metro quadrado
                const investmentsFiltrados = investments.filter(investment => {
                    return userInvestments.some(userInvestment => userInvestment.investmentID === investment.id);
                });

                setInvestments(investmentsFiltrados);
                setValorMedioQuadradoTotal(await calculateMediaMetroQuadrado(investmentsFiltrados))


            } catch (error) {
                console.error('Erro ao obter a cotação do dólar:', error);
            }
        }

        if (userData) {
            // getUserInvestments(userData)
            getInvestments(userData)
        }

    }, [])

    useEffect(() => {

        const getCotacoes = async () => {
            try {
                const responseDolar = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
                const cotacaoDolar: CotacaoResponse = responseDolar.data;
                setDolar(cotacaoDolar)

                const responseEuro = await axios.get('https://economia.awesomeapi.com.br/json/last/EUR-BRL');
                const cotacaoEuro: CotacaoResponse = responseEuro.data;
                setEuro(cotacaoEuro)

            } catch (error) {
                console.error('Erro ao obter a cotação do dólar:', error);
            }
        }

        getCotacoes()

    }, [])

    const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false })

    const calculateMediaMetroQuadrado = async (investments: Investment[]) => {

        let metroQuadradoListado: number[] = []
        investments.forEach((investment) => {

            const { valorMetroQuadrado } = investment

            if (!valorMetroQuadrado) { return }

            const last = valorMetroQuadrado.length - 1
            metroQuadradoListado.push(valorMetroQuadrado[last].valor)
        })
        
        // Calcular a média
        if (metroQuadradoListado.length > 0) {
            const soma = metroQuadradoListado.reduce((acc, valor) => acc + valor, 0);
            const media = soma / metroQuadradoListado.length;
            return media;
        } else {
            return 0; // Retorna 0 se não houver valores para calcular a média
        }
    }

    return (
        <>
            <Flex flexDir={['column', 'column', 'row', 'row', 'row']} justifyContent={'space-between'} w='100%' alignItems={['start', 'start', 'center', 'center', 'end']} gap={4}>
                <Flex flexDir={'column'}>
                    <Flex>
                        <Text fontSize={28} fontWeight={'semibold'}>
                            Dashboard
                        </Text>
                    </Flex>
                    <Flex>
                        <Text fontSize={16}>
                            Veja aqui um resumo dos seus investimentos
                        </Text>
                    </Flex>
                </Flex>

                <Flex alignItems={'center'}>

                    {dolar && euro ?
                        <Flex gap={6}>
                            <StatGroup>
                                <Stat>
                                    <StatLabel>Euro</StatLabel>
                                    <StatNumber fontSize={14} letterSpacing={0.5}>€ {Number(euro.EURBRL.bid).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</StatNumber>
                                    <StatHelpText fontSize={12}>
                                        {Number(euro.EURBRL.pctChange) > 0 ? <StatArrow type='increase' /> : <StatArrow type='decrease' />}

                                        {euro.EURBRL.pctChange}%
                                    </StatHelpText>
                                </Stat>
                            </StatGroup>
                            <StatGroup>
                                <Stat>
                                    <StatLabel>Dólar</StatLabel>
                                    <StatNumber fontSize={14} letterSpacing={0.5}>$ {Number(dolar.USDBRL.bid).toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</StatNumber>
                                    <StatHelpText fontSize={12}>
                                        {Number(dolar.USDBRL.pctChange) > 0 ? <StatArrow type='increase' /> : <StatArrow type='decrease' />}

                                        {dolar.USDBRL.pctChange}%
                                    </StatHelpText>
                                </Stat>
                            </StatGroup>
                        </Flex>
                        : ''}
                </Flex>

                {/* CARDS */}
                <Flex flexDir={['column', 'column', 'column', 'column', 'row']} gap={4} color={'lightSide'}>

                    {/* CARD 1 */}
                    <Flex flexDir={'column'} gap={2} w='100%' bgColor={'grayCardSide'} px={2} borderRadius={12} >

                        <Flex flexDir={'column'} justifyContent={'space-between'}>



                            <Flex justifyContent={'space-between'} gap={4}>
                                <Flex letterSpacing={1}>
                                    <Menu>
                                        <MenuButton as={Button} borderRadius={'none'} bg='none' color={'lightSide'} py={10} px={2} _hover={{ color: 'green.300' }} _active={{ bg: 'none' }} rightIcon={<MdArrowDropDownCircle size={32} />}>

                                            <Flex justifyContent={'start'} w='100%' p={2} gap={[1, 1, 1, 2, 2]} alignItems={['start', 'start', 'start', 'center', 'center']} >

                                                <Flex flexDir={'column'} alignItems={'start'} gap={1}>

                                                    <Text fontSize={[10, 10, 10, 13, 13]} fontWeight={'light'}> Total investido </Text>

                                                    <Text fontSize={[12, 12, 12, 18, 18]}>
                                                        R${totalInvested?.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                                                    </Text>
                                                </Flex>

                                                <Divider orientation="vertical" h={8} w={1} />

                                                <Flex flexDir={'column'} alignItems={'center'} gap={1}>

                                                    <Text fontSize={[10, 10, 10, 13, 13]} fontWeight={'light'}> Unidades </Text>

                                                    <Text fontSize={[12, 12, 12, 18, 18]}> {totalCount} </Text>
                                                </Flex>

                                                <Divider orientation="vertical" h={8} w={1} />

                                                <Flex flexDir={'column'} alignItems={'center'} gap={1} >

                                                    <Text fontSize={[10, 10, 10, 13, 13]} fontWeight={'light'}> Valor médio do m² </Text>

                                                    <Flex alignItems={'center'} gap={1} color={'green.300'}>
                                                        <Text fontSize={[12, 12, 12, 18, 18]}> R${valorMedioQuadradoTotal?.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} </Text>
                                                    </Flex>

                                                </Flex>
                                            </Flex>

                                        </MenuButton>
                                        <MenuList color='lightSide' bgColor={'grayCardSide'} border='1px solid #FFFFFF33' borderRadius={8} p={1}>

                                            {userInvestments?.map((userInvestment, index) => {
                                                const investmentMatched = investments?.find(investment => investment.id === userInvestment.investmentID)

                                                if (!investmentMatched) { return }

                                                const { valorMetroQuadrado } = investmentMatched

                                                if (!valorMetroQuadrado) { return }
                                                const last = valorMetroQuadrado.length - 1

                                                return (

                                                    <MenuItem key={userInvestment.id + index} fontWeight={'semibold'} bgColor={'grayCardSide'} _hover={{ color: 'green.300', transition: '360ms' }} >

                                                        <Link href={`/projects/${userInvestment.investmentID}`} _hover={{ textDecor: 'none' }} target="_blank" w='100%'>

                                                            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>

                                                                <Flex flexDir={'column'} justifyContent={'end'} borderBottom={'1px solid #FFFFFF44'} py={1} w='100%'>

                                                                    <Text fontSize={14} fontWeight={'light'}>
                                                                        {investmentMatched.title}
                                                                    </Text>

                                                                    <Flex justifyContent={'space-between'} alignItems={'end'} gap={4} w='100%' >
                                                                        <Flex>
                                                                            <Text p={0}>
                                                                                R${userInvestment.investedValue.toLocaleString('pt-BR')}
                                                                            </Text>
                                                                        </Flex>
                                                                        <Flex fontSize={14} color={'green.300'} w='100%'>
                                                                            <Text> R${valorMetroQuadrado[last].valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/m² </Text>
                                                                        </Flex>
                                                                    </Flex>

                                                                </Flex>

                                                            </Flex>

                                                        </Link>
                                                    </MenuItem>

                                                )
                                            })}
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Flex>

                        </Flex>

                    </Flex>

                </Flex>
            </Flex>
        </>


    )
}