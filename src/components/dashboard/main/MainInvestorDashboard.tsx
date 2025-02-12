import { resumeUserInvestment, userBarGraphics } from "./utils";
import { InvestmentsSuggestions } from "./InvestmentsSuggestions";
import { MyInvestmentsResume } from "./MyInvestmentsResume";
import { GraficoFinanceiro } from "./graphics/Financeiro";
import { GraficoConstrucao } from "./graphics/Construcao";
import { Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { Pizza } from "./graphics/Pizza";
import { ValorMetroQuadrado } from "./graphics/ValorMetroQuadrado";


interface InvestorDashboardProps {
    projectsData: Investment[]
    userInvestmentsData: UserInvestment[]
}

export function MainInvestorDashboard({ projectsData, userInvestmentsData }: InvestorDashboardProps) {

    if (projectsData.length == 0) {
        return (
            <Flex h={500} w='100%' alignItems={'center'} justifyContent={'center'}>
                <Flex flexDir={'column'} borderRadius={8} bgColor={useColorModeValue('darkSide', 'dark.lightSide')} color={'lightSide'} p={8} alignItems={'center'} justifyContent={'center'} gap={8} fontWeight={600}>

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
                    <Flex justifyContent={'space-between'} alignItems={['center', 'start', 'start', 'start', 'start']} w='100%' flexDir={['column', 'column', 'column', 'column', 'row']} mt={8} gap={[8, 8, 8, 2, 2]}>



                        {/* GRAFICO 1 */}
                        <GraficoFinanceiro userInvestmentResumed={userInvestmentResumed} userInvestments={userInvestmentsData} />

                        {/* GRAFICO 2 */}
                        <GraficoConstrucao userInvestmentResumed={userInvestmentResumed} userInvestments={userInvestmentsData} />

                    </Flex>

                    {/* SEGUNDA LINHA */}
                    <Flex justifyContent={'space-between'} w='100%' alignItems={['center', 'start', 'center', 'start', 'start']} flexDir={['column', 'column', 'column', 'row', 'row']} gap={4}>

                        {/* GRAFICO DE PIZZA */}
                        <Pizza userInvestmentResumed={userInvestmentResumed} userInvestmentsData={userInvestmentsData} />

                        {/* MEUS INVESTIMENTOS */}
                        <ValorMetroQuadrado projectsData={projectsData} />
                    </Flex>

                    {/* TERCEIRA LINHA */}
                    <Flex justifyContent={'space-between'} w='100%' alignItems={['center', 'start', 'start', 'start', 'start']} flexDir={['column', 'column', 'column', 'row', 'row']} gap={4}>

                        {/* SUGESTÕES DE INVESTIMENTOS */}
                        <InvestmentsSuggestions projectsData={projectsData} />
                    </Flex>


                </Flex>
            </Flex >
        )
    }
}