import { Flex, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { BarChart, YAxis, XAxis, Tooltip, Legend, Bar, LabelList } from "recharts";
import { CustomTooltipFinanceiro, formatDataFinanceiro, userBarGraphics } from "../utils";
import { useEffect, useState } from "react";

export interface formattedDataProps {
    Previsto: number;
    Realizado: number;
    investmentID: Investment["id"];
    title: Investment["title"];
    financialTotalProgressPrevisto: Investment["financialTotalProgress"][0]["previsto"];
    financialTotalProgressRealizado: Investment["financialTotalProgress"][0]["realizado"];
    buildingTotalProgressPrevisto: Investment["buildingTotalProgress"][0]["previsto"];
    buildingTotalProgressRealizado: Investment["buildingTotalProgress"][0]["realizado"];
}

export interface DataWithUnitsProps {
    Unidades: number;
    Previsto: number;
    Realizado: number;
    investmentID: Investment["id"];
    title: Investment["title"];
    financialTotalProgressPrevisto: Investment["financialTotalProgress"][0]["previsto"];
    financialTotalProgressRealizado: Investment["financialTotalProgress"][0]["realizado"];
    buildingTotalProgressPrevisto: Investment["buildingTotalProgress"][0]["previsto"];
    buildingTotalProgressRealizado: Investment["buildingTotalProgress"][0]["realizado"];
}

interface GraficoFinanceiroProps {
    userInvestmentResumed: userBarGraphics[]
    userInvestments: UserInvestment[]
}

interface UserUnits {
    investmentID: string;
    totalUnits: number;
}




export function GraficoFinanceiro({ userInvestmentResumed, userInvestments }: GraficoFinanceiroProps) {

    const formattedData: formattedDataProps[] = formatDataFinanceiro(userInvestmentResumed);
    const graphWidth = useBreakpointValue({ base: 300, sm: 400, md: 680, lg: 800, xl: 500 })
    const fontSizeGraph = useBreakpointValue({ base: 10, sm: 12, md: 12, lg: 12, xl: 12 })

    const [financeiroData, setFinanceiroData] = useState<DataWithUnitsProps[]>()

    const axisTextColor = useColorModeValue('darkSide', 'white'); // ou use suas cores customizadas



    const countUserUnits = (userInvestments: UserInvestment[]): UserUnits[] => {
        const investmentCounts: { [investmentID: string]: number } = {};

        // Contar as ocorrências de cada investmentID
        for (const investment of userInvestments) {
            investmentCounts[investment.investmentID] =
                (investmentCounts[investment.investmentID] || 0) + 1;
        }

        // Criar o array de UserUnits
        const userUnits: UserUnits[] = [];
        for (const investmentID in investmentCounts) {
            userUnits.push({
                investmentID,
                totalUnits: investmentCounts[investmentID],
            });
        }

        return userUnits;
    }



    useEffect(() => {

        if (userInvestments) {

            const totalUnitsPerBuilding = countUserUnits(userInvestments)

            const dataWithUnits = formattedData.map((data) => {
                const unitsInfo = totalUnitsPerBuilding?.find(
                    (unit) => unit.investmentID === data.investmentID
                );
                return {
                    ...data,
                    Unidades: unitsInfo ? unitsInfo.totalUnits : 0, // Adiciona a propriedade Unidades
                };
            });

            setFinanceiroData(dataWithUnits)
        }
    }, [])


    return (


        < Flex flexDir={'column'} gap={2} >
            <Flex flexDir={'column'}>
                <Text fontWeight={'semibold'} fontSize={20}>Financeiro</Text>
                <Text fontSize={12}>Previsto x realizado</Text>
            </Flex>
            <Flex>

                <BarChart width={graphWidth} height={300} data={financeiroData} barGap={20} layout="vertical"> {/* Alteração aqui! Adicionado layout vertical */}
                    <YAxis type="category" dataKey="etapa" width={2} tickFormatter={(tick) => `${tick}`} tick={{ fill: axisTextColor }} /> {/* YAxis agora é categórico e usa 'etapa' */}
                    <XAxis type="number" fontSize={12} domain={[0, 'dataMax']} tickFormatter={(tick) => `R$${tick.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`} tick={{ fill: axisTextColor }}/>  {/* XAxis agora é numérico e está oculto */}
                    <Tooltip content={<CustomTooltipFinanceiro />} />
                    <Legend
                        verticalAlign="bottom" // Alinha a legenda na parte inferior
                        align="center" // Centraliza a legenda
                        layout="horizontal" // Define o layout como horizontal
                        wrapperStyle={{ bottom: -5 }} // Ajusta a posição da legenda
                    />
                    <Bar
                        radius={2}
                        barSize={30}
                        dataKey="Previsto"
                        fill="#64748B"
                    >
                        <LabelList fontSize={fontSizeGraph} dataKey="title" position="insideRight" fill="#FFFFFF" fontWeight={'500'} />
                    </Bar>
                    <Bar
                        radius={2}
                        barSize={30}
                        dataKey="Realizado"
                        fill="#46cb18"
                    >
                        {/* <LabelList fontSize={8} dataKey="title" position="insideRight" fill="#FFFFFF" fontWeight={'500'} /> */}
                    </Bar>
                </BarChart>

            </Flex>
        </Flex >
    )
}