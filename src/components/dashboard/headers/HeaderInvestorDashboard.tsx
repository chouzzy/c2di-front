import { getProjectList } from "@/app/services/getProjectList";
import { filterUserInvestmentsByUserID, getUserInvestmentListByUserID } from "@/app/services/getUserInvestmentListByID";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text, useBreakpointValue } from "@chakra-ui/react";
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
    const [totalCount, setTotalCount] = useState<number>()


    useEffect(() => {

        const getUserInvestments = async (userData: User) => {
            try {
                const userInvestments = await filterUserInvestmentsByUserID({ page: '0', pageRange: '9999', userID: userData.id })
                setUserInvestments(userInvestments)

                // Calcular o total investedValue
                const total = userInvestments.reduce((sum: number, investment: UserInvestment) => {
                    return sum + investment.investedValue;
                }, 0);
                setTotalInvested(total);
                setTotalCount(userInvestments.length);

            } catch (error) {
                console.error('Erro ao obter a cotação do dólar:', error);
            }
        }

        const getInvestments = async () => {
            try {
                const investments = await getProjectList({ page: '0', pageRange: '9999' })
                setInvestments(investments)


            } catch (error) {
                console.error('Erro ao obter a cotação do dólar:', error);
            }
        }

        if (userData) {
            getUserInvestments(userData)
            getInvestments()
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
                    <Flex flexDir={'column'} gap={2} w='100%' bgColor={'grayCardSide'} px={4} py={4} borderRadius={12}>

                        <Flex flexDir={'column'} justifyContent={'space-between'}>

                            <Flex fontSize={12}>Total investido</Flex>

                            <Flex justifyContent={'space-between'} gap={4}>
                                <Flex fontSize={20} fontWeight={'medium'} letterSpacing={1}>
                                    <Menu>
                                        <MenuButton as={Button} borderRadius={'none'} bg='none' color={'lightSide'} p={0} fontSize={20} _hover={{ color: 'green.300' }} _active={{ bg: 'none' }} rightIcon={<MdArrowDropDownCircle />}>
                                            <Text>
                                                R${totalInvested?.toLocaleString('pt-BR')}
                                            </Text>
                                        </MenuButton>
                                        <MenuList color='lightSide' bgColor={'grayCardSide'} border='1px solid #FFFFFF33' borderRadius={8} p={1}>

                                            {userInvestments?.map((userInvestment, index) => {
                                                const investmentMatched = investments?.find(investment => investment.id === userInvestment.investmentID)

                                                if (!investmentMatched) { return }

                                                return (

                                                    <MenuItem key={userInvestment.id + index} fontWeight={'semibold'} bgColor={'grayCardSide'} _hover={{ color: 'green.300', transition: '360ms' }}>
                                                        <Link href={`/projects/${userInvestment.investmentID}`} target="_blank">
                                                            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                                                                <Flex flexDir={'column'} justifyContent={'center'}>
                                                                    <Text fontSize={12} fontWeight={'light'}>
                                                                        {investmentMatched.title}
                                                                    </Text>
                                                                    <Flex justifyContent={'space-between'} alignItems={'end'}>
                                                                        <Flex>
                                                                            <Text>
                                                                                R${userInvestment.investedValue.toLocaleString('pt-BR')}
                                                                            </Text>
                                                                        </Flex>
                                                                        <Flex pb={1} fontSize={12} alignItems={'center'} color={'green.300'}>
                                                                            <Text> +11.01% </Text> <IoIosTrendingUp />
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
                                <Flex fontSize={12} alignItems={'center'} color={'green.300'}> <Text> +11.01% </Text> <IoIosTrendingUp /> </Flex>
                            </Flex>

                        </Flex>

                    </Flex>

                    {/* CARD 2 */}
                    <Flex flexDir={'column'} gap={2} w='100%' bgColor={'grayCardSide'} px={4} py={4} borderRadius={12}>

                        <Flex flexDir={'column'} justifyContent={'space-between'}>

                            <Flex fontSize={12}>Total</Flex>
                            <Flex justifyContent={'space-between'} gap={4}>
                                <Flex fontSize={20} fontWeight={'medium'} letterSpacing={1} > <Text> {totalCount} </Text></Flex>
                                <Flex fontSize={12} alignItems={'center'} color={'green.300'}> <Text> +24.16% </Text> <IoIosTrendingUp /> </Flex>
                            </Flex>

                        </Flex>

                    </Flex>

                </Flex>
            </Flex>
        </>


    )
}