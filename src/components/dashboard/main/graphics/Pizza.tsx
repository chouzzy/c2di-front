import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip, PieChart, Pie, Cell } from "recharts";
import { formatDataPizza, userBarGraphics } from "../utils";

interface PizzaProps {
    userInvestmentResumed: userBarGraphics[]
    userInvestmentsData: UserInvestment[]
}

export interface formattedDataPizzaProps {
    Previsto: number;
    Realizado: number;
    Investido?: number
    investmentID: Investment["id"];
    title: Investment["title"];
    financialTotalProgressPrevisto: Investment["financialTotalProgress"][0]["previsto"];
    financialTotalProgressRealizado: Investment["financialTotalProgress"][0]["realizado"];
    buildingTotalProgressPrevisto: Investment["buildingTotalProgress"][0]["previsto"];
    buildingTotalProgressRealizado: Investment["buildingTotalProgress"][0]["realizado"];
}

export function Pizza({ userInvestmentResumed, userInvestmentsData }: PizzaProps) {

    const sliceColors = ['#64748B', '#64748BBB', '#64748BAA', '#64748B99', '#64748B77']

    const formattedData: formattedDataPizzaProps[] = formatDataPizza(userInvestmentResumed, userInvestmentsData);

    const graphHeight = useBreakpointValue({ base: 288, sm: 288, md: 288, lg: 400, xl: 400 })



    // Função para customizar o Tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // Pega os dados da fatia atual

            return (
                <div className="custom-tooltip" style={{ fontWeight: '500', backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <p className="label">{data.title}</p> {/* Mostra o título */}
                    <p style={{ color: '#51c25d' }}>
                        Investido: R$ {data.Investido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    {/* Adicione outros valores, se quiser */}
                </div>
            );
        }

        return null;
    };

    return (

        <Flex flexDir={'column'} gap={2}>
            <Flex flexDir={'column'}>
                <Text fontWeight={'semibold'} fontSize={20}>Investimentos</Text>
                <Text fontSize={12}>Gráfico de pizza</Text>
            </Flex>
            <Flex>
                <PieChart width={288} height={graphHeight}>
                    <Pie
                        dataKey="Investido"
                        isAnimationActive={false}
                        activeShape={{ fill: '#46cb18bb' }}
                        data={formattedData}
                        fill="#8884d8"
                        labelLine={false} // Opcional: remove a linha que liga o label à fatia
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                    >
                        {/* Renderização dos Cells (agora feita automaticamente pelo Recharts) */}
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={sliceColors[index]} /> // Alterna as cores
                        ))}
                    </Pie>
                    {/* Tooltip customizado */}
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </Flex>
        </Flex>
    )
}