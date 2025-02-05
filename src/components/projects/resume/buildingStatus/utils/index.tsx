import { changePrismaProjectBuildingProgress } from "@/app/services/changeBuildingProgress";
import { formataData, formataDataMonthShort, formatarMoeda, formatarPercentual } from "@/app/services/utils";
import { data } from "@/components/dashboard/main/data/dashData";
import { Flex, FormLabel, InputGroup, Input, InputRightAddon, Button, Text, Spinner } from "@chakra-ui/react";
import { register } from "module";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, AreaChart, Area } from "recharts";


interface GraficoAndamentoProps {
    editModeAndamento: boolean
    data: any
    updatingDB: boolean
    graphWidth: number | undefined
    graphHeight: number | undefined
    barWidth: number | undefined
    register: UseFormRegister<FieldValues>
    handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
    setYupError: Dispatch<SetStateAction<string>>
    setUpdatingDB: Dispatch<SetStateAction<boolean>>
    setEditModeAndamento: Dispatch<SetStateAction<boolean>>
    projectData: Investment
    userData: User
}



const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
    return <text x={x + width / 2} y={y} fill="#0F172A" textAnchor="middle" dy={-8} fontWeight={500} >{`${value}%`}</text>;
};


export function GraficoAndamento({
    editModeAndamento,
    data,
    updatingDB,
    graphWidth,
    graphHeight,
    barWidth,
    register,
    handleSubmit,
    setYupError,
    setUpdatingDB,
    setEditModeAndamento,
    projectData,
    userData }: GraficoAndamentoProps) {

    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura }: Investment["buildingProgress"] = data


    const onSubmitAndamento = async (submitData: any) => {
        const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura }: Investment["buildingProgress"] = submitData

        setYupError("")
        setUpdatingDB(true)

        projectData.buildingProgress = { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura }

        try {
            const response: Investment["buildingProgress"] = await changePrismaProjectBuildingProgress(projectData.id, projectData)
            setUpdatingDB(false)
            setEditModeAndamento(false)
        } catch (error) {

            console.error('Erro no update do building progress')
            console.error(error)
            setYupError(String(error))
        }
    }

    const editAndamento = async () => {
        setEditModeAndamento(!editModeAndamento)
    }


    return (

        <>
            <Flex flexDir={'column'} gap={2}>

                {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?

                    <Flex justifyContent={'end'}>
                        <Button color='lightSide' bgColor="darkSide" onClick={editAndamento} size={'sm'}>
                            Editar dados
                        </Button>
                    </Flex>

                    : ''
                }
                <Text fontWeight={'semibold'} fontSize={[16, 16, 16, 20, 20]}> Andamento da obra:</Text>

                <Text fontSize={[14, 14, 14, 18, 18]}>
                    O gráfico de barras apresenta a evolução de cada etapa da obra,
                    permitindo que você acompanhe o progresso de forma clara e visual.
                    As barras representam as etapas da construção, e a altura de cada barra indica o
                    percentual de conclusão daquela etapa.
                </Text>
            </Flex>

            <Flex flexDir={'column'} alignItems={'center'}>

                {editModeAndamento ?
                    <Flex pt={8} flexDir={'column'} gap={4}>
                        <Flex>
                            <Text fontSize={14} fontWeight={'semibold'}>Alterar dados do gráfico:</Text>
                        </Flex>
                        <form onSubmit={handleSubmit((data) => { onSubmitAndamento(data) })}>
                            <Flex gap={2} fontSize={12} alignItems={'center'} flexDir={['column', 'column', 'column', 'row', 'row']}>

                                <Flex>
                                    <FormLabel fontSize={12}> Fundação <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Fundação' defaultValue={fundacao} {...register("fundacao", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Estrutura <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Estrutura' defaultValue={estrutura} {...register("estrutura", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Instalações <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Instalações' defaultValue={instalacoes} {...register("instalacoes", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Alvenaria <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Alvenaria' defaultValue={alvenaria} {...register("alvenaria", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Acabamento <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Acabamento' defaultValue={acabamento} {...register("acabamento", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Pintura <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Pintura' defaultValue={pintura} {...register("pintura", { valueAsNumber: true })} />
                                        <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex pt={2.5}> <Button type="submit" color='lightSide' bgColor="darkSide" size={'md'}> {updatingDB ? <Spinner boxSize={6} /> : 'Alterar'} </Button> </Flex>
                            </Flex>
                        </form>
                    </Flex>
                    : ''
                }
                <BarChart width={graphWidth} height={graphHeight} data={data}>
                    <XAxis dataKey="etapa" />
                    <YAxis type='number' domain={([0, 120])} hide />
                    <Tooltip />
                    <Legend />
                    <Bar radius={8} barSize={barWidth} dataKey="Evolução" fill="#64748B" label={renderCustomBarLabel} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                </BarChart>
            </Flex>
        </>
    )
}


export function StatusFooter() {

    return (
        < Flex gap={4} flexDir={'column'} fontSize={12} pt={6} >

            <Text fontSize={20}> <b>Entenda um pouco mais sobre o seu projeto:</b> </Text>

            <Text> <b>Fundação:</b> <br></br> A base sólida do seu sonho! Nesta fase, preparamos o terreno e construímos as fundações que sustentarão toda a estrutura do seu futuro lar. </Text>

            <Text> <b>Estrutura:</b> <br></br>  A espinha dorsal do seu projeto! Aqui, erguemos as paredes, pilares e vigas que darão forma ao seu imóvel. </Text>

            <Text> <b>Instalações:</b> <br></br>  O conforto toma forma! Nesta etapa, cuidamos das instalações elétricas, hidráulicas e sanitárias, preparando o seu imóvel para receber os acabamentos. </Text>

            <Text> <b>Alvenaria:</b> <br></br>  Definindo os espaços!  Nesta fase, as paredes internas e externas são construídas, delimitando os ambientes e criando a estrutura final do seu imóvel. </Text>

            <Text> <b>Acabamento:</b> <br></br>  O toque final!  Aqui, os detalhes fazem a diferença. Revestimentos, pisos, pintura e outros acabamentos são aplicados para dar vida e personalidade ao seu novo lar. </Text>

            <Text> <b>Pintura:</b> <br></br>  Cores e beleza!  A pintura finaliza as paredes, realçando os detalhes e proporcionando um ambiente aconchegante e agradável. </Text>

            <Text> <b>Implantação:</b> <br></br>  É o "pontapé inicial" da obra, preparando o terreno para as etapas seguintes. </Text>

            <Text> <b>Mão de obra:</b> <br></br> É o esforço humano que transforma os materiais em um edifício completo. A mão de obra qualificada é essencial para garantir a qualidade, segurança e eficiência da obra. </Text>

        </Flex >
    )
}





interface AcompanhamentoFinanceiroProps {
    graphWidth: number | undefined
    graphHeight: number | undefined
    financialTotalProgress: FinancialTotalProgress[]
}
export function AcompanhamentoFinanceiro({ graphWidth, graphHeight, financialTotalProgress }: AcompanhamentoFinanceiroProps) {

    const minCost = financialTotalProgress[0].previsto
    const maxCost = financialTotalProgress[financialTotalProgress.length - 1].previsto

    return (
        <Flex flexDir={'column'}>
            {/* HEADER CUSTO FINANCEIRO*/}
            <Flex flexDir={'row'} alignItems={'center'} gap={16}>

                <Flex flexDir={'column'}>
                    <Text fontWeight={'semibold'} fontSize={[16, 16, 16, 20, 20]}> Acompanhamento financeiro:</Text>

                    <Text fontSize={[14, 14, 14, 18, 18]}>
                        Mantenha-se informado sobre o cronograma financeiro da obra com este gráfico de linhas. Compare o previsto com o realizado e acompanhe o seu investimento mês a mês.
                    </Text>
                </Flex>

            </Flex>

            {/* GRAFICOS CUSTO FINANCEIRO*/}
            <Flex flexDir={'column'} alignItems={'center'}>

                {/* GRAFICO 1 */}
                <AreaChart
                    width={graphWidth}
                    height={graphHeight}
                    data={financialTotalProgress}
                    margin={{
                        top: 50,
                    }}
                >
                    <XAxis dataKey="data" fontSize={12} tickFormatter={formataData} />
                    <YAxis domain={([minCost, maxCost])} fontSize={12} tickFormatter={formatarMoeda} />
                    <Legend />
                    <Tooltip
                        formatter={(value: number, name: string, props) => {
                            if (name === 'realizado' || name === 'previsto') {
                                return [formatarMoeda(value), name]; // Formata o valor no tooltip
                            }
                            return [value, name];
                        }}
                        labelFormatter={formataDataMonthShort}
                    />
                    <Area type="monotone" dataKey="previsto" stroke="#0F172A" fill="#0F172A44" />
                    <Area type="monotone" dataKey="realizado" stroke="#1591ea" fill="#1591eabb" />
                </AreaChart>
            </Flex>
        </Flex>
    )
}





interface AcompanhamentoDeObrasProps {
    graphWidth: number | undefined
    graphHeight: number | undefined
    buildingTotalProgress: BuildingTotalProgress[]
}
export function AcompanhamentoDeObra({ graphWidth, graphHeight, buildingTotalProgress }: AcompanhamentoDeObrasProps) {

    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            {/* HEADER PROGRESSO DE OBRA TOTAL*/}
            <Flex flexDir={'row'} alignItems={'center'} gap={16}>
                <Flex flexDir={'column'} >
                    <Text fontWeight={'semibold'} fontSize={[16, 16, 16, 20, 20]}> Acompanhamento de obra:</Text>

                    <Text fontSize={[14, 14, 14, 18, 18]}>
                        Analise o progresso da obra através do gráfico de linhas interativo. Compare o percentual previsto e realizado em cada mês e avalie o ritmo da construção.
                    </Text>
                </Flex>
            </Flex>

            {/* GRAFICOS PROGRESSO DE OBRA TOTAL*/}
            <Flex flexDir={'column'} alignItems={'center'}>
                {/* GRAFICO 1 */}
                <AreaChart
                    width={graphWidth}
                    height={graphHeight}
                    data={buildingTotalProgress}
                    margin={{
                        top: 50,
                    }}
                >
                    <XAxis dataKey="data" fontSize={12} tickFormatter={formataData} />
                    <YAxis domain={([0, 1])} fontSize={12} tickFormatter={formatarPercentual} />
                    <Legend />
                    <Tooltip
                        formatter={(value: number, name: string, props) => {
                            if (name === 'realizado' || name === 'previsto') {
                                return [formatarPercentual(value), name]; // Formata o valor no tooltip
                            }
                            return [value, name];
                        }}
                        labelFormatter={formataDataMonthShort}
                    />
                    <Area type="monotone" dataKey="previsto" stroke="#0F172A" fill="#0F172A44" />
                    <Area type="monotone" dataKey="realizado" stroke="#1591ea" fill="#1591ea44" />
                </AreaChart>
            </Flex>
        </Flex>
    )
}




interface valorMetroQuadradoProps {
    graphWidth: number | undefined
    graphHeight: number | undefined
    valorMetroQuadrado?: ValorMetroQuadrado[]
}
export function ValorMetroQuadrado({ graphWidth, graphHeight, valorMetroQuadrado }: valorMetroQuadradoProps) {

    if (!valorMetroQuadrado) {
        return (<></>)
    } else {
        console.log(valorMetroQuadrado[0])

        const minCost = valorMetroQuadrado[0].valor
        const maxCost = valorMetroQuadrado[valorMetroQuadrado.length - 1].valor

        return (
            <Flex flexDir={'column'}>
                {/* HEADER CUSTO FINANCEIRO*/}
                <Flex flexDir={'row'} alignItems={'center'} gap={16}>

                    <Flex flexDir={'column'}>
                        <Text fontWeight={'semibold'} fontSize={[16, 16, 16, 20, 20]}> Metro quadrado:</Text>

                        <Text fontSize={[14, 14, 14, 18, 18]}>
                            Mantenha-se informado sobre a evolução do valor do metro quadrado de seu empreendimento.
                        </Text>
                    </Flex>

                </Flex>

                {/* GRAFICOS CUSTO FINANCEIRO*/}
                <Flex flexDir={'column'} alignItems={'center'}>

                    {/* GRAFICO 1 */}
                    <AreaChart
                        width={graphWidth}
                        height={graphHeight}
                        data={valorMetroQuadrado}
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
                        <Area type="monotone" dataKey="valor" stroke="#1591ea" fill="#1591ea44" />
                    </AreaChart>
                </Flex>
            </Flex>
        )
    }

}