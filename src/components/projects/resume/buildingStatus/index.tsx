import { Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Link, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { formataData, formataDataMonthShort, formatarMoeda, formatarPercentual } from "@/app/services/utils";
import { XAxis, YAxis, BarChart, Bar, Legend, Tooltip, AreaChart, Area } from 'recharts';
import { ProjectFileInput } from "@/components/CreateProjects/Inputs/FileInput";
import { importExcelProgress } from "@/app/services/importExcelProgress";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { changePrismaProjectBuildingProgress } from "@/app/services/changeBuildingProgress";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function BuildingStatus({ userData, projectData }: ProjectDataProps) {

    const { predictedCost, realizedCost, financialTotalProgress, buildingTotalProgress } = projectData
    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura } = projectData.buildingProgress

    const minCost = financialTotalProgress[0].previsto
    const maxCost = financialTotalProgress[financialTotalProgress.length - 1].previsto

    const [editModeAndamento, setEditModeAndamento] = useState(false); // Estado para controlar o modo de edição
    const [editModeCusto, setEditModeCusto] = useState(false); // Estado para controlar o modo de edição

    const [updatingDB, setUpdatingDB] = useState(false); // Estado para controlar o modo de edição
    const [yupError, setYupError] = useState(''); // Estado para controlar o modo de edição

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const data = [
        { etapa: 'Fundação', Evolução: fundacao },
        { etapa: 'Estrutura', Evolução: estrutura },
        { etapa: 'Instalações', Evolução: instalacoes },
        { etapa: 'Alvenaria', Evolução: alvenaria },
        { etapa: 'Acabamento', Evolução: acabamento },
        { etapa: 'Pintura', Evolução: pintura },
    ];

    const graphWidth = useBreakpointValue({
        base: 320,
        sm: 320,
        md: 600,
        lg: 800,
        xl: 1100
    })
    const graphHeight = useBreakpointValue({
        base: 320,
        sm: 320,
        md: 320,
        lg: 500,
        xl: 500
    })
    const barWidth = useBreakpointValue({
        base: 32,
        sm: 32,
        md: 32,
        lg: 64,
        xl: 64
    })

    const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#0F172A" textAnchor="middle" dy={-8} fontWeight={500} >{`${value}%`}</text>;
    };

    const editAndamento = async () => {
        setEditModeAndamento(!editModeAndamento)
    }

    const editCost = async () => {
        setEditModeCusto(!editModeCusto)
    }

    const onSubmitAndamento = async (data: any) => {

        setYupError("")
        setUpdatingDB(true)

        const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura }: Investment["buildingProgress"] = data
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

    const onSubmitImport = async (data: any) => {

        setYupError("")
        setUpdatingDB(true)

        try {
            const file = data.document[0]

            const formData = new FormData();
            formData.append('file', file); // Adiciona o arquivo ao FormData

            const investment = await importExcelProgress(formData, projectData.id)
            projectData.financialTotalProgress = investment.financialTotalProgress
            projectData.buildingTotalProgress = investment.buildingTotalProgress

            setEditModeCusto(!editModeCusto)

        } catch (error) {

            console.error('Erro no update do building progress')
            console.error(error)
            setYupError(String(error))
        }
    }




    return (
        <Flex w='100%' py={8} flexDir={'row'} flexDirection={'column'} gap={16}>

            <ErrorInputComponent error={yupError} />

            <Flex flexDir={'column'} w='100%'>
                {/* HEADER ANDAMENTO */}
                <Flex flexDir={'column'} gap={2}>

                    {userData.role != 'INVESTOR' ?

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

                {/* GRAFICOS ANDAMENTO */}
                <Flex flexDir={'column'} alignItems={'center'}>

                    {editModeAndamento ?
                        <Flex pt={8} flexDir={'column'} gap={4}>
                            <Flex>
                                <Text fontSize={14} fontWeight={'semibold'}>Alterar dados do gráfico:</Text>
                            </Flex>
                            <form onSubmit={handleSubmit(onSubmitAndamento)}>
                                <Flex gap={2} fontSize={12} alignItems={'center'} flexDir={['column','column','column','row','row']}>

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
            </Flex>

            {/* ACOMPANHAMENTOS */}
            <Flex flexDir={'column'} gap={4} w='100%'>

                {/* ANDAMENTOS TITULO E IMPORT */}
                <Flex flexDir={'column'} gap={4}>

                    {userData.role != 'INVESTOR' ?
                        <Flex justifyContent={'space-between'}>

                            <Flex justifyContent={'end'} w='100%'>
                                <Button color='lightSide' bgColor="darkSide" borderRadius={4} onClick={editCost} size={'sm'}>
                                    {editModeCusto ? 'Cancelar' : 'Importar dados'}
                                </Button>
                            </Flex>
                        </Flex>

                        : ''
                    }

                    {editModeCusto ?
                        <Flex flexDir={'column'} gap={4}>
                            <form onSubmit={handleSubmit(onSubmitImport)}>
                                <Flex w='100%' flexDir={'row'} alignItems={'center'}>
                                    <ProjectFileInput
                                        key={"EXCEL"}
                                        className={'excel'}
                                        isRequired={true}
                                        multiple={false}
                                        allowedTypes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                        accept=".xls, .xlsx"
                                        label_top='Documentos (Excel)'
                                        register={register("document")}
                                    />
                                    <Button ml={4} maxW={32} mt={12} _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} >
                                        Salvar dados
                                    </Button>
                                </Flex>
                            </form>
                            <Flex>
                                <Link href='https://drive.usercontent.google.com/download?id=1PNFcxDblSGSk_DsShpZk5Qpz9lBbCWHp&export=download&authuser=0&confirm=t&uuid=81b13ea6-73c6-4227-bd26-5791567c82ea&at=AENtkXbK1MWusDRElsQkSdQ3Y2Bu:1732899063115'
                                    target="_blank"
                                >
                                    <Button _hover={{ bgColor: 'green.700' }} bgColor={'green.500'} px={4} py={2} borderRadius={4} color={'lightSide'} size='sm'>Baixe aqui a planilha modelo</Button>
                                </Link>
                            </Flex>
                        </Flex>
                        : ''
                    }

                </Flex>

                {/* ANDAMENTO FINANCEIRO */}
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


                {/* ACOMPANHAMENTO OBRA TOTAL */}
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
            </Flex>



            {/* FOOTER */}
            <Flex gap={4} flexDir={'column'} fontSize={12} pt={6}>

                <Text fontSize={20}> <b>Entenda um pouco mais sobre o seu projeto:</b> </Text>

                <Text> <b>Fundação:</b> <br></br> A base sólida do seu sonho! Nesta fase, preparamos o terreno e construímos as fundações que sustentarão toda a estrutura do seu futuro lar. </Text>

                <Text> <b>Estrutura:</b> <br></br>  A espinha dorsal do seu projeto! Aqui, erguemos as paredes, pilares e vigas que darão forma ao seu imóvel. </Text>

                <Text> <b>Instalações:</b> <br></br>  O conforto toma forma! Nesta etapa, cuidamos das instalações elétricas, hidráulicas e sanitárias, preparando o seu imóvel para receber os acabamentos. </Text>

                <Text> <b>Alvenaria:</b> <br></br>  Definindo os espaços!  Nesta fase, as paredes internas e externas são construídas, delimitando os ambientes e criando a estrutura final do seu imóvel. </Text>

                <Text> <b>Acabamento:</b> <br></br>  O toque final!  Aqui, os detalhes fazem a diferença. Revestimentos, pisos, pintura e outros acabamentos são aplicados para dar vida e personalidade ao seu novo lar. </Text>

                <Text> <b>Pintura:</b> <br></br>  Cores e beleza!  A pintura finaliza as paredes, realçando os detalhes e proporcionando um ambiente aconchegante e agradável. </Text>

                <Text> <b>Implantação:</b> <br></br>  É o "pontapé inicial" da obra, preparando o terreno para as etapas seguintes. </Text>

                <Text> <b>Mão de obra:</b> <br></br> É o esforço humano que transforma os materiais em um edifício completo. A mão de obra qualificada é essencial para garantir a qualidade, segurança e eficiência da obra. </Text>

            </Flex>
        </Flex >
    )
}