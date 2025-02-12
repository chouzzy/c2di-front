import { Container, Flex, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { IoIosTrendingUp } from "react-icons/io";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface MyInvestmentCardsProps {
    userInvestmentsData: UserInvestment[]
    projectsData: Investment[]
}


export function MyInvestmentCards({ userInvestmentsData, projectsData }: MyInvestmentCardsProps) {

    const bgCardColor = useColorModeValue('darkSide', 'dark.lightSide')

    const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false })

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });


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
        <>

            {isMobile ?

                <Container gap={4} maxW={'90vw'} color={'lightSide'} alignItems={'center'} justifyContent={'center'}>

                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={2}
                        loop
                        // pagination
                        scrollbar={{ draggable: true }}
                    >
                        <SwiperSlide key={'1'}>
                            {/* CARD 1 */}
                            <Flex minH={40} flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                                    <Flex fontSize={12}>Valor médio investido</Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(59400)}</Text></Flex>
                                        <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'18,173 %'}  </Text> <IoIosTrendingUp /> </Flex>
                                    </Flex>
                                    <Flex fontSize={10}>Somatória dos valores investidos dividido pela quantidade de investimentos aplicados.</Flex>

                                </Flex>

                            </Flex>
                        </SwiperSlide>


                        <SwiperSlide key={'2'}>
                            {/* CARD 2 */}
                            <Flex minH={40} flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                                    <Flex fontSize={12}>Total investido</Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(87400)} </Text></Flex>
                                        <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'18,173 %'} </Text> <IoIosTrendingUp /> </Flex>
                                    </Flex>
                                    <Flex fontSize={10}>O total investido na plataforma até a data atual.</Flex>

                                </Flex>

                            </Flex>
                        </SwiperSlide>

                        <SwiperSlide key={'3'}>
                            {/* CARD 3 */}
                            <Flex minH={40} flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                                <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                                    <Flex fontSize={12}>Valor total dos imóveis</Flex>
                                    <Flex justifyContent={'space-between'}>
                                        <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(2730000)} </Text></Flex>
                                        <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'25,904 %'} </Text> <IoIosTrendingUp /> </Flex>
                                    </Flex>
                                    <Flex fontSize={10}>Somatória dos valores correntes de cada imóvel no qual você possui investimentos aplicados.</Flex>

                                </Flex>

                            </Flex>
                        </SwiperSlide>


                        <Flex w={0}>.</Flex>
                    </Swiper>


                </Container >
                :
                <Flex gap={4} w='100%' color={'lightSide'}>

                    {/* CARD 1 */}
                    <Flex flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                        <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                            <Flex fontSize={12}>Valor médio investido</Flex>
                            <Flex justifyContent={'space-between'}>
                                <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(59400)}</Text></Flex>
                                <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'18,173 %'}  </Text> <IoIosTrendingUp /> </Flex>
                                {/* <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalUserProfitString}  </Text> <IoIosTrendingUp /> </Flex> */}
                            </Flex>
                            <Flex fontSize={10}>Somatória dos valores investidos dividido pela quantidade de investimentos aplicados.</Flex>

                        </Flex>

                    </Flex>

                    {/* CARD 2 */}
                    <Flex flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                        <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                            <Flex fontSize={12}>Total investido</Flex>
                            <Flex justifyContent={'space-between'}>
                                <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(87400)} </Text></Flex>
                                <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'18,173 %'} </Text> <IoIosTrendingUp /> </Flex>
                                {/* <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalUserProfitString} </Text> <IoIosTrendingUp /> </Flex> */}
                            </Flex>
                            <Flex fontSize={10}>O total investido na plataforma até a data atual.</Flex>

                        </Flex>

                    </Flex>

                    {/* CARD 3 */}
                    <Flex flexDir={'column'} gap={4} w='100%' bgColor={bgCardColor} px={8} py={4} borderRadius={12}>

                        <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                            <Flex fontSize={12}>Valor total dos imóveis</Flex>
                            <Flex justifyContent={'space-between'}>
                                <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2}> <Text> {formatador.format(273000)} </Text></Flex>
                                <Flex fontSize={14} alignItems={'center'} color={18 > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {'25,904 %'} </Text> <IoIosTrendingUp /> </Flex>
                                {/* <Flex fontSize={14} alignItems={'center'} color={totalProjectsProfit > 0 ? 'green.300' : 'red.300'} gap={1} px={2}> <Text> {totalProjectsProfitString} </Text> <IoIosTrendingUp /> </Flex> */}
                            </Flex>
                            <Flex fontSize={10}>Somatória dos valores correntes de cada imóvel no qual você possui investimentos aplicados.</Flex>

                        </Flex>

                    </Flex>

                </Flex >
            }
        </>
    )
}


