import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { BarChart, YAxis, XAxis, Tooltip, Legend, Bar, LabelList } from "recharts";
import { CustomTooltipConstrucao, formatDataConstrucao, userBarGraphics } from "../utils";

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

interface GraficoConstrucaoProps {
    userInvestmentResumed: userBarGraphics[]
}


export function GraficoConstrucao({ userInvestmentResumed }: GraficoConstrucaoProps) {

    const formattedData: formattedDataProps[] = formatDataConstrucao(userInvestmentResumed);
    const graphWidth = useBreakpointValue({ base: 300, sm: 400, md: 680, lg: 800, xl: 500 })
    const fontSizeGraph = useBreakpointValue({ base: 10, sm: 12, md: 12, lg: 12, xl: 16 })


    return (

        < Flex flexDir={'column'} gap={2} >
            <Flex flexDir={'column'}>
                <Text fontWeight={'semibold'} fontSize={20}>Construção</Text>
                <Text fontSize={12}>Previsto x realizado</Text>
            </Flex>
            <Flex>

                <BarChart width={graphWidth} height={300} data={formattedData} barGap={20} layout="vertical"> {/* Alteração aqui! Adicionado layout vertical */}
                    <YAxis type="category" dataKey="etapa" width={2} tickFormatter={(tick) => `${tick}`} /> {/* YAxis agora é categórico e usa 'etapa' */}
                    <XAxis type="number" hide domain={[0, 'dataMax']} />  {/* XAxis agora é numérico e está oculto */}
                    <Tooltip content={<CustomTooltipConstrucao />} />
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
                        <LabelList fontSize={fontSizeGraph} dataKey="title" position="insideRight" fill="#FFFFFF" fontWeight={'500'} />
                    </Bar>
                </BarChart>

            </Flex>
        </Flex >
    )
}