import { changePrismaProjectBuildingProgress } from "@/app/api/changeBuildingProgress/route";
import { changePrismaProjectRealizedCost } from "@/app/api/changeRealizedCost/route";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { Button, Divider, Flex, FormLabel, Input, InputGroup, InputRightAddon, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend, Tooltip } from 'recharts';


interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function BuildingStatus({ userData, projectData }: ProjectDataProps) {

    const { predictedCost, realizedCost } = projectData
    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura } = projectData.buildingProgress

    const maxCost = Math.max(predictedCost.foundation, realizedCost.foundation, predictedCost.workmanship, realizedCost.workmanship)
    const maxCostPerArea = Math.max(predictedCost.structure, realizedCost.structure, predictedCost.implantation, realizedCost.implantation)

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

    const dataCost = [
        { etapa: 'Mão de obra R$', Previsto: predictedCost.workmanship, Realizado: realizedCost.workmanship },
        { etapa: 'Fundação R$', Previsto: predictedCost.foundation, Realizado: realizedCost.foundation },
    ];
    const dataCostPerArea = [
        { etapa: 'Implantação R$/m²', Previsto: predictedCost.implantation, Realizado: realizedCost.implantation },
        { etapa: 'Estrutura R$/m²', Previsto: predictedCost.structure, Realizado: realizedCost.structure },
    ];

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits:0
    });

    

    const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#0F172A" textAnchor="middle" dy={-8} fontWeight={500} >{`${value}%`}</text>;
    };

    const renderCustomBarLabelMonetary = ({ payload, x, y, width, height, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#0F172A" textAnchor="middle" dy={-8} fontWeight={500} >{`${formatador.format(Number(value))}`}</text>;
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

    const onSubmitCost = async (data: any) => {

        setYupError("")
        setUpdatingDB(true)
        const { foundation, implantation, structure, workmanship }: Investment["realizedCost"] = data
        projectData.realizedCost = { foundation, implantation, structure, workmanship }

        console.log(data)

        try {
            const response: Investment["realizedCost"] = await changePrismaProjectRealizedCost(projectData.id, projectData)
            setUpdatingDB(false)
            setEditModeCusto(false)
        } catch (error) {

            console.error('Erro no update do building progress')
            console.error(error)
            setYupError(String(error))
        }
    }





    return (
        <Flex w='100%' py={8} flexDir={'row'} flexDirection={'column'} maxW={800}>

            <ErrorInputComponent error={yupError} />

            {/* HEADER ANDAMENTO */}
            <Flex flexDir={'column'} pl={6} gap={2}>

                {userData.role != 'INVESTOR' ?

                    <Flex justifyContent={'end'}>
                        <Button color='lightSide' bgColor="darkSide" onClick={editAndamento} size={'sm'}>
                            Editar dados
                        </Button>
                    </Flex>

                    : ''
                }
                <Text fontWeight={'semibold'} fontSize={20}> Andamento da obra:</Text>

                <Text>
                    O gráfico de barras apresenta a evolução de cada etapa da obra,
                    permitindo que você acompanhe o progresso de forma clara e visual.
                    As barras representam as etapas da construção, e a altura de cada barra indica o
                    percentual de conclusão daquela etapa.
                </Text>
            </Flex>

            {/* GRAFICOS ANDAMENTO */}
            <Flex flexDir={'column'}>

                {editModeAndamento ?
                    <Flex pl={6} pt={8} flexDir={'column'} gap={4}>
                        <Flex>
                            <Text fontSize={14} fontWeight={'semibold'}>Alterar dados do gráfico:</Text>
                        </Flex>
                        <form onSubmit={handleSubmit(onSubmitAndamento)}>
                            <Flex gap={2} fontSize={12} alignItems={'center'}>

                                <Flex>
                                    <FormLabel fontSize={12}> Fundação <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Fundação' defaultValue={fundacao} {...register("fundacao", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Estrutura <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Estrutura' defaultValue={estrutura} {...register("estrutura", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Instalações <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Instalações' defaultValue={instalacoes} {...register("instalacoes", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Alvenaria <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Alvenaria' defaultValue={alvenaria} {...register("alvenaria", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Acabamento <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Acabamento' defaultValue={acabamento} {...register("acabamento", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Pintura <InputGroup>
                                        <Input isRequired={true} size={'md'} w={16} type="number" min={0} max={100} placeholder='Pintura' defaultValue={pintura} {...register("pintura", { valueAsNumber: true })} /> <InputRightAddon w={10}>%</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex pt={2.5}> <Button type="submit" color='lightSide' bgColor="darkSide" size={'md'}> {updatingDB ? <Spinner boxSize={6} /> : 'Alterar'} </Button> </Flex>
                            </Flex>
                        </form>
                    </Flex>
                    : ''
                }
                <BarChart width={700} height={500} data={data}>
                    <XAxis dataKey="etapa" />
                    <YAxis type='number' domain={([0, 120])} hide />
                    <Tooltip />
                    <Legend />
                    <Bar radius={8} barSize={64} dataKey="Evolução" fill="#64748B" label={renderCustomBarLabel} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                </BarChart>
            </Flex>


            {/* HEADER ANDAMENTO */}
            <Flex flexDir={'column'} pl={6} gap={2}>

                {userData.role != 'INVESTOR' ?

                    <Flex justifyContent={'end'}>
                        <Button color='lightSide' bgColor="darkSide" onClick={editCost} size={'sm'}>
                            Editar dados
                        </Button>
                    </Flex>

                    : ''
                }
                <Text fontWeight={'semibold'} fontSize={20}> Custos da obra:</Text>

                <Text>
                    O gráfico de barras apresenta os custos previstos e realizados de cada etapa da obra,
                    permitindo que você acompanhe o investimento de forma clara e visual. As barras verdes representam os custos previstos,
                    enquanto as barras azuis representam os custos realizados. Compare os valores e acompanhe o investimento em cada fase da construção!
                </Text>
            </Flex>

            {/* GRAFICOS CUSTO*/}
            <Flex flexDir={'column'}>

                {editModeCusto ?
                    <Flex pl={6} pt={8} flexDir={'column'} gap={4}>
                        <Flex>
                            <Text fontSize={14} fontWeight={'semibold'}>Alterar dados do gráfico:</Text>
                        </Flex>
                        <form onSubmit={handleSubmit(onSubmitCost)}>
                            <Flex gap={2} fontSize={12} alignItems={'center'}>

                                <Flex>
                                    <FormLabel fontSize={12}> Mão de obra <InputGroup>
                                        <Input isRequired={true} size={'md'} w={24} type="number" placeholder='Mão de obra' defaultValue={realizedCost.workmanship} {...register("workmanship", { valueAsNumber: true })} /> <InputRightAddon >R$</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Fundação <InputGroup>
                                        <Input isRequired={true} size={'md'} w={24} type="number" placeholder='Fundação' defaultValue={realizedCost.foundation} {...register("foundation", { valueAsNumber: true })} /> <InputRightAddon >R$</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Implantação <InputGroup>
                                        <Input isRequired={true} size={'md'} w={24} type="number" placeholder='Implantação' defaultValue={realizedCost.implantation} {...register("implantation", { valueAsNumber: true })} /> <InputRightAddon >R$/m²</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex>
                                    <FormLabel fontSize={12}> Estrutura <InputGroup>
                                        <Input isRequired={true} size={'md'} w={24} type="number" placeholder='Estrutura' defaultValue={realizedCost.structure} {...register("structure", { valueAsNumber: true })} /> <InputRightAddon >R$/m²</InputRightAddon>
                                    </InputGroup> </FormLabel>
                                </Flex>
                                <Flex pt={2.5}> <Button type="submit" color='lightSide' bgColor="darkSide" size={'md'}> {updatingDB ? <Spinner boxSize={6} /> : 'Alterar'} </Button> </Flex>
                            </Flex>
                        </form>
                    </Flex>
                    : ''
                }
                <Flex gap={4}>
                    <Flex>
                        <BarChart width={400} height={500} data={dataCost} barGap={20}>
                            <XAxis dataKey="etapa" />
                            <YAxis type='number' domain={([0, (maxCost + maxCost / 10)])} hide />
                            <Tooltip />
                            <Legend />
                            <Bar radius={8} barSize={64} dataKey="Previsto" fill="#64748B" label={renderCustomBarLabelMonetary} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                            <Bar radius={8} barSize={64} dataKey="Realizado" fill="#51c25d" label={renderCustomBarLabelMonetary} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                        </BarChart>
                    </Flex>
                    <Divider orientation="vertical" h={64} my='auto' bgColor={'grayDivisor'} />
                    <Flex>
                        <BarChart width={400} height={500} data={dataCostPerArea} barGap={20}>
                            <XAxis dataKey="etapa" />
                            <YAxis type='number' domain={([0, (maxCostPerArea + maxCostPerArea / 10)])} hide />
                            <Tooltip />
                            <Legend />
                            <Bar radius={8} barSize={64} dataKey="Previsto" fill="#64748B" label={renderCustomBarLabelMonetary} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                            <Bar radius={8} barSize={64} dataKey="Realizado" fill="#51c25d" label={renderCustomBarLabelMonetary} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                        </BarChart>
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
        </Flex>
    )
}