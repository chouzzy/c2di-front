import { formataData, formataDataMonthShort, formatarMoeda } from "@/app/services/utils";
import { Button, Divider, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { MdArrowDropDownCircle } from "react-icons/md";
import { XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from "recharts";

interface valorMetroQuadradoProps {
    projectsData: Investment[]
}

export function ValorMetroQuadrado({ projectsData }: valorMetroQuadradoProps) {

    const { valorMetroQuadrado } = projectsData[0]
    const [activeGraphic, setActiveGraphic] = useState<Investment>(projectsData[0])



    const graphWidth = useBreakpointValue({ base: 320, sm: 400, md: 680, lg: 800, xl: 720 })
    const graphHeight = useBreakpointValue({ base: 254, sm: 254, md: 254, lg: 400, xl: 400 })

    const changeGraphic = (id: string) => {
        const selectedInvestment = projectsData.find(
            (investment) => investment.id === id
        );

        if (selectedInvestment) {
            // 3. Atualizar o estado do componente com os dados do Investment encontrado
            // Exemplo: (Supondo que você queira usar o valorMetroQuadrado do investimento selecionado)
            setActiveGraphic(selectedInvestment);
            console.log("Investimento encontrado:", selectedInvestment);
        } else {
            console.error("Investimento não encontrado para o ID:", id);
            // Tratar o caso em que o investimento não é encontrado (ex: exibir uma mensagem de erro)
        }
    }

    if (!valorMetroQuadrado) {
        return (<></>)
    } else {

        const minCost = valorMetroQuadrado[0].valor
        const maxCost = valorMetroQuadrado[valorMetroQuadrado.length - 1].valor

        return (
            <Flex flexDir={'column'} >
                {/* HEADER CUSTO FINANCEIRO*/}
                <Flex flexDir={['column','column','column','row','row']} justifyContent={'space-between'} >
                    <Flex flexDir={'row'}>

                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={[18, 18, 18, 20, 20]}> Metro quadrado</Text>
                            <Text fontSize={12}>Valorização média do m² do empreendimento</Text>

                        </Flex>

                    </Flex>


                    <Menu>
                        <MenuButton as={Button} borderRadius={'none'} bg='none' color={'darkSide'} px={0} _hover={{ color: 'green.300' }} _active={{ bg: 'none' }} rightIcon={<MdArrowDropDownCircle size={32} />}>

                            <Flex justifyContent={'start'} w='100%' alignItems={'center'} py={2} gap={2}>

                                <Flex flexDir={'column'} alignItems={'start'} gap={1}>

                                    <Text fontSize={16} fontWeight={'regular'}> {activeGraphic?.title} </Text>
                                </Flex>
                            </Flex>

                        </MenuButton>
                        <MenuList color='darkSide' bgColor={'lightSidered'} border='1px solid #00000033' borderRadius={8} p={1}>

                            {projectsData?.map((project, index) => {
                                const { valorMetroQuadrado } = project

                                if (!valorMetroQuadrado) { return }

                                return (

                                    <MenuItem key={project.id + index} fontWeight={'semibold'} bgColor={'lightSide'} _hover={{ color: 'green.300', transition: '360ms' }} onClick={() => changeGraphic(project.id)}>
                                        <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>

                                            <Flex flexDir={'column'} justifyContent={'end'} py={1} w='100%'>

                                                <Text fontSize={14} fontWeight={'normal'}>
                                                    {project.title}
                                                </Text>

                                            </Flex>

                                        </Flex>
                                    </MenuItem>

                                )
                            })}
                        </MenuList>
                    </Menu>
                </Flex>
                {/* GRAFICOS CUSTO FINANCEIRO*/}
                <Flex flexDir={'column'} alignItems={'center'}>

                    {/* GRAFICO 1 */}
                    <AreaChart
                        width={graphWidth}
                        height={graphHeight}
                        data={activeGraphic?.valorMetroQuadrado}
                        margin={{
                            top: 50,
                        }}
                    >
                        <XAxis dataKey="data" fontSize={12} tickFormatter={formataData} />
                        <YAxis domain={([minCost, maxCost])} fontSize={12} tickFormatter={formatarMoeda} />
                        <Legend />
                        <Tooltip
                            formatter={(value: number, name: string, props) => {
                                if (name === 'valor') {
                                    return [formatarMoeda(value), name]; // Formata o valor no tooltip
                                }
                                return [value, name];
                            }}
                            labelFormatter={formataDataMonthShort}
                        />
                        <Area type="monotone" dataKey="valor" stroke="#51c25d" fill="#51c25d44" />
                    </AreaChart>
                </Flex>
            </Flex>
        )
    }

}