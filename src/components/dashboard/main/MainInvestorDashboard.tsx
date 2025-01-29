import { Button, Flex, Image, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { XAxis, YAxis, Tooltip, Bar, BarChart, Legend, Pie, PieChart, Cell } from "recharts";
import { data, data01 } from "./data/dashData";
import { IoIosArrowForward, IoIosTrendingUp } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { resumeUserInvestment, userBarGraphics } from "./utils";
import { GraficoFinanceiro } from "./graphics/Financeiro";
import { GraficoConstrucao } from "./graphics/Construcao";
import { Pizza } from "./graphics/Pizza";
import { MyInvestmentsResume } from "./MyInvestmentsResume";
import { InvestmentsSuggestions } from "./InvestmentsSuggestions";


interface InvestorDashboardProps {
    projectsData: Investment[]
    userInvestmentsData: UserInvestment[]
}

export function MainInvestorDashboard({ projectsData, userInvestmentsData }: InvestorDashboardProps) {

    if (projectsData.length == 0) {
        return (
            <Flex h={500} w='100%' alignItems={'center'} justifyContent={'center'}>
                <Flex flexDir={'column'} borderRadius={8} bgColor={'darkSide'} color={'lightSide'} p={8} alignItems={'center'} justifyContent={'center'} gap={8} fontWeight={600}>

                    <Text >Você não possui nenhum projeto ainda, clique abaixo para ver os projetos disponíveis</Text>
                    <Link href='projects' _hover={{ textDecor: 'none' }}>
                        <Flex _hover={{ bgColor: 'green.400', transition: '400ms' }} cursor={'pointer'} bgColor={'redSide'} borderRadius={8} px={4} py={2}> Ver projetos disponíveis</Flex>
                    </Link>
                </Flex>
            </Flex>)
    }

    if (projectsData.length > 0) {

        let userInvestmentResumed: userBarGraphics[] = resumeUserInvestment(userInvestmentsData, projectsData)


        return (
            <Flex w='100%'>
                <Flex w='100%' flexDir={'column'} gap={16} pb={48}>

                    {/* PRMEIRA LINHA */}
                    <Flex justifyContent={'space-between'} alignItems={['start', 'start', 'start', 'start', 'start']} w='100%' flexDir={['column', 'column', 'column', 'column', 'row']} mt={8} gap={[8, 8, 8, 2, 2]}>



                        {/* GRAFICO 1 */}
                        <GraficoFinanceiro userInvestmentResumed={userInvestmentResumed} />

                        {/* GRAFICO 2 */}
                        <GraficoConstrucao userInvestmentResumed={userInvestmentResumed} />

                    </Flex>

                    {/* SEGUNDA LINHA */}
                    <Flex justifyContent={'space-between'} w='100%' alignItems={['start', 'start', 'center', 'start', 'start']} flexDir={['column', 'column', 'column', 'row', 'row']} gap={4}>

                        {/* GRAFICO DE PIZZA */}
                        <Pizza userInvestmentResumed={userInvestmentResumed} userInvestmentsData={userInvestmentsData} />

                        {/* MEUS INVESTIMENTOS */}
                        <MyInvestmentsResume projectsData={projectsData} />
                    </Flex>

                    {/* TERCEIRA LINHA */}
                    <Flex justifyContent={'space-between'} w='100%' alignItems={['start', 'start', 'start', 'start', 'start']} flexDir={['column', 'column', 'column', 'row', 'row']} gap={4}>

                        {/* SUGESTÕES DE INVESTIMENTOS */}
                        <InvestmentsSuggestions projectsData={projectsData} />
                    </Flex>

                    {/* <Flex flexDir={'column'} gap={4}>
                        <Link href="/myInvestments" _hover={{ color: 'redSide' }}>
                            <Flex align={'center'} gap={2}>
                                <Text fontSize={24} fontWeight={'semibold'}>
                                    Meus investimentos
                                </Text>
                                <IoIosArrowForward size={24} />
                            </Flex>
                        </Link>

                        <Flex w='100%' justifyContent={'space-between'}>

                            {projectsData.map((project, index) => {


                                if (index > 2) {
                                    return
                                }
                                if (isMobile && index > 0) {
                                    return
                                }
                                return (

                                    // CARD DO PROJETO
                                    <Flex key={project.id} flexDir={'column'} gap={2}>

                                        <Flex>
                                            <Flex w='100%' flexDir={'column'} gap={1}>
                                                <Image src={`${project.images[0].url}`} h={120} w={320} objectFit={'cover'} objectPosition={'center'} />

                                                <Flex
                                                    w={'min'}
                                                    px={2}
                                                    bgColor={project.active ? 'green.400' : 'orange.200'}
                                                    fontSize={'sm'}
                                                    fontWeight={'semibold'}
                                                    color={project.active ? 'green.800' : 'orange.800'}
                                                    borderRadius={4}
                                                >
                                                    {project.active ? <Text>Ativo</Text> : <Text>Arquivado</Text>}
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                        
                                        <Flex flexDir={'column'}>

                                            <Text fontSize={20} fontWeight={'semibold'}>
                                                {project.title}
                                            </Text>
                                            <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                                                {project.description}
                                            </Text>
                                        </Flex>

                                        
                                        <Flex justifyContent={'start'} gap={8}>
                                            <Link href={`/projects/${project.id}`}>
                                                <Button size={'sm'} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'}>
                                                    <Flex alignItems={'center'} justifyContent={'center'}>
                                                        <Text>Ver projeto</Text>
                                                    </Flex>
                                                </Button>
                                            </Link>
                                        </Flex>


                                    </Flex>

                                )
                            })}
                            <Flex border={'1px'} borderColor={'grayDivisor'} bgColor={'grayHoverSide'}>

                                <Link href="/myInvestments" _hover={{ color: 'lightSide', bgColor: 'grayCardSide' }} h='100%'>
                                    <Flex h='100%' alignItems={'center'} justifyContent={'center'} >
                                        <Flex> <MdKeyboardDoubleArrowRight size={40} /> </Flex>
                                    </Flex>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex> */}
                </Flex>
            </Flex >
        )
    }
}