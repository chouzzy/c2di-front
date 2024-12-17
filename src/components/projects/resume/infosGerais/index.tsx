import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { XAxis, YAxis, BarChart, Bar, Legend, Tooltip, Area, AreaChart } from 'recharts';
import { createPrismaNotification } from "@/app/services/createNotification";
import { getPrismaNotification } from "@/app/services/getNotification";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { useEffect, useState } from "react";
import { TextAreaInput } from "@/components/CreateProjects/Inputs/TextAreaInput";
import { ProjectInput } from "@/components/CreateProjects/Inputs/ProjectInput";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { NotificationsBoard } from "./notificationsBoard";
import { NotificationsHeaderInvestor } from "./notificationsHeaderAdmin";
import { NotificationsHeaderAdmin } from "./notificationsHeaderInvestor";
import { formataData, formatarMoeda, formataDataMonthShort, formatarPercentual } from "@/app/services/utils";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function InfosGerais({ userData, projectData }: ProjectDataProps) {

    const { predictedCost, realizedCost, financialTotalProgress, buildingTotalProgress } = projectData
    const { acabamento, alvenaria, estrutura, fundacao, instalacoes, pintura } = projectData.buildingProgress

    const minCost = financialTotalProgress[0].previsto
    const maxCost = financialTotalProgress[financialTotalProgress.length - 1].previsto

    const graphWidth = useBreakpointValue({
        base: 320,
        sm: 320,
        md: 700,
        lg: 900,
        xl: 600
    })

    const { register, handleSubmit } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [createNotificationLoading, setCreateNotificationLoading] = useState(false)
    const [triggerReloadNotifications, setTriggerReloadNotifications] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [yupError, setYupError] = useState<string>("")

    const [page, setPage] = useState(1)
    const [pageRange, setPageRange] = useState(4)
    const [totalDocuments, setTotalDocuments] = useState(0)

    const data = [
        { etapa: 'Fundação', Evolução: fundacao },
        { etapa: 'Estrutura', Evolução: estrutura },
        { etapa: 'Instalações', Evolução: instalacoes },
        { etapa: 'Alvenaria', Evolução: alvenaria },
        { etapa: 'Acabamento', Evolução: acabamento },
        { etapa: 'Pintura', Evolução: pintura },
    ];


    const renderCustomBarLabel = ({ payload, x, y, width, height, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#0F172A" textAnchor="middle" dy={-8} fontWeight={500} >{`${value}%`}</text>;
    };


    const createNotification = () => {
        onOpen()
    }

    const notificationCreatedConfirmed = () => {
        setCreateNotificationLoading(false)
        onClose()
        window.location.reload()
    }

    const cancelCreateNotification = () => {
        onClose()
    }

    const reloadNotifications = () => {
        setTriggerReloadNotifications(true)
    }


    useEffect(() => {


        const getProjectNotifications = async (id: Investment["id"]) => {

            try {
                const response: listNotificationsResponse = await getPrismaNotification(projectData.id, page, pageRange)
                setNotifications(response.notifications)
                setTotalDocuments(response.totalDocuments)

            } catch (error) {
                throw error
            }
        }
        if (triggerReloadNotifications) {
            getProjectNotifications(projectData.id)
            setTriggerReloadNotifications(false)
        }

    }, [triggerReloadNotifications])

    useEffect(() => {

        const getProjectNotifications = async (id: Investment["id"]) => {

            try {
                const response: listNotificationsResponse = await getPrismaNotification(projectData.id, page, pageRange)
                setNotifications(response.notifications)
                setTotalDocuments(response.totalDocuments)

            } catch (error) {
                throw error
            }
        }

        getProjectNotifications(projectData.id)

    }, [page])

    const onSubmit = async (data: any) => {

        try {
            setCreateNotificationLoading(true)
            setYupError("")


            data = {
                ...data,
                investmentId: projectData.id
            }

            const response = await createPrismaNotification(data)



            if (response.status === 200 || response.status === 202) {
                notificationCreatedConfirmed()
            }
            else {
                alert('Ocorreu um problema no cadastro, entre em contato com o suporte.')
                throw Error("Ocorreu um problema ao cadastrar")
            }

        } catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    console.log(error)
                } else {
                    console.log(error)
                }
            } else {
                console.log(error)
            }
        }
    };


    return (
        <Flex w='100%' py={8} flexDir={['column', 'column', 'column', 'column', 'row']} gap={12}>
            {/* IMAGEM GIGANTE */}
            <Flex>
                <Image src={`${projectData.images[0].url}`} h={[300, 300, 300, 300, '100%']} minW={['100%', '100%', '100%', '100%', 440]} objectFit={'cover'} objectPosition={'center'} borderRadius={2} boxShadow={'md'} />
            </Flex>

            <Flex gap={8} flexDir={'column'} justifyContent={'space-between'}>

                {/* GRAFICOS */}
                <Flex w='100%' flexDir={'column'} gap={2} alignItems={'center'}>
                    <Flex flexDir={'column'}>
                        <Flex gap={8} fontSize={12} py={2} flexDir={'column'}>

                            {/* FINANCEIRO TOTAL */}
                            <Flex flexDir={'column'}>
                                <Text fontSize={16} fontWeight={'semibold'}>
                                    Financeiro (previsto x realizado):
                                </Text>
                                <AreaChart
                                    width={graphWidth}
                                    height={200}
                                    data={financialTotalProgress}
                                    margin={{
                                        top: 16,
                                        right: 0,
                                        left: 12,
                                        bottom: 0,
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

                            {/* OBRA TOTAL */}
                            <Flex flexDir={'column'}>
                                <Text fontSize={16} fontWeight={'semibold'}>
                                    Obra (previsto x realizado):
                                </Text>
                                <AreaChart
                                    width={graphWidth}
                                    height={200}
                                    data={buildingTotalProgress}
                                    margin={{
                                        top: 16,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
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

                    <Flex flexDir={'column'} fontSize={12}>
                        <Text fontSize={16} fontWeight={'semibold'}>
                            Acompanhamento de obra:
                        </Text>
                        <BarChart width={graphWidth} height={160} data={data}>
                            <XAxis dataKey="etapa" />
                            <YAxis type='number' domain={([0, 120])} hide />
                            <Tooltip />
                            <Legend />
                            <Bar radius={8} barSize={40} dataKey="Evolução" fill="#64748B" label={renderCustomBarLabel} activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                        </BarChart>
                    </Flex>
                </Flex>

                {/* QUADRO DE AVISOS */}
                <Flex w='100%' flexDir={'column'} gap={8}>

                    {userData.role == 'INVESTOR' ?
                        <NotificationsHeaderInvestor createNotification={createNotification} />
                        :
                        <NotificationsHeaderAdmin createNotification={createNotification} />
                    }

                    <NotificationsBoard totalDocuments={totalDocuments} page={page} pageRange={pageRange} setPage={setPage} reloadNotifications={reloadNotifications} notifications={notifications} />



                    {/* MODAL CREATE NOTIFICATIONS */}
                    {/* Modal */}
                    <Modal isOpen={isOpen} onClose={cancelCreateNotification} size={"xl"}>
                        <ModalOverlay />
                        <ModalContent p={4}>
                            <ModalHeader>
                                <Flex gap={2} alignItems={'start'} flexDir={'column'} pt={4}>
                                    <Text>
                                        Criar notificação
                                    </Text>
                                    <Text fontWeight={'light'} fontSize={14}>
                                        Uma notificação será criada e exibida para todos os usuários que investiram no projeto.
                                    </Text>
                                </Flex>
                            </ModalHeader>
                            <ModalCloseButton color={'#EF3A5D'} />
                            <ModalBody >
                                <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={8} w='100%'>

                                    <ErrorInputComponent error={yupError} />

                                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                                        <Flex alignItems={'center'} flexDir={'column'} w='100%' gap={2}>

                                            {/* Título da notificação */}
                                            <ProjectInput
                                                key={"title"}
                                                isRequired={true}
                                                type='text'
                                                placeholder={'Ex: Atualização de obra'}
                                                label_top='Título da notificação'
                                                register={register("title")}
                                            />
                                            {/* Mensagem */}
                                            <TextAreaInput
                                                key={"message"}
                                                isRequired={true}
                                                placeholder={'Ex: Houve uma atualização no status da fundação da sua obra, agora está em 50%'}
                                                label_top='Mensagem'
                                                register={register("message")}
                                            />

                                        </Flex>

                                        <Flex alignItems={'center'} justifyContent={'end'} py={4}>
                                            <Button type="submit" _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                                                <Flex minW={24} alignItems={'center'} justifyContent={'center'}>
                                                    {createNotificationLoading ?
                                                        <Spinner boxSize={6} />
                                                        :
                                                        <Text>Criar</Text>
                                                    }
                                                </Flex>
                                            </Button>
                                        </Flex>
                                    </form>

                                </Flex>
                            </ModalBody>

                            {/* <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter> */}
                        </ModalContent>
                    </Modal>



                </Flex>
            </Flex>
        </Flex>
    )
}