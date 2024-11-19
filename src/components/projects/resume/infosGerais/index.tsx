import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { createPrismaNotification } from "@/app/api/createNotification/route";
import { getPrismaNotification } from "@/app/api/getNotification/route";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { useEffect, useState } from "react";
import { TextAreaInput } from "@/components/CreateProjects/Inputs/TextAreaInput";
import { ProjectInput } from "@/components/CreateProjects/Inputs/ProjectInput";
import { AxiosError } from "axios";
import { IoMdAlert } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NotificationsBoard } from "./notificationsBoard";
import { NotificationsHeader } from "./notificationsHeader";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function InfosGerais({ userData, projectData }: ProjectDataProps) {

    const { register, handleSubmit } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [createNotificationLoading, setCreateNotificationLoading] = useState(false)
    const [triggerReloadNotifications, setTriggerReloadNotifications] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [yupError, setYupError] = useState<string>("")

    const [page, setPage] = useState(1)
    const [pageRange, setPageRange] = useState(4)
    const [totalDocuments, setTotalDocuments] = useState(0)


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
        console.log(page)

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

            console.log(data)

            data = {
                ...data,
                investmentId: projectData.id
            }

            const response = await createPrismaNotification(data)

            console.log(response)


            if (response.status === 200 || response.status === 202) {
                notificationCreatedConfirmed()
            }
            else {
                console.log('erro no cradastro')
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
        <Flex w='100%' py={8} flexDir={'column'}>
            {/* IMAGEM GIGANTE */}
            <Flex w='100%'>
                <Image src={projectData.images[0].url} h={300} w='100%' objectFit={'cover'} objectPosition={'center'} />
            </Flex>

            <Flex w='100%' py={16} gap={8}>

                {/* GRAFICOS */}
                <Flex w='100%' flexDir={'column'} gap={8}>
                    <Flex flexDir={'column'}>
                        <Text fontSize={20} fontWeight={'semibold'}>
                            Gráfico de custo previsto x realizado
                        </Text>
                        <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                            Aqui ficará o gráfico de custo previsto da obra vs realizado mês a mês
                        </Text>
                    </Flex>

                    <Flex flexDir={'column'}>
                        <Text fontSize={20} fontWeight={'semibold'}>
                            Gráfico do andamento da obra
                        </Text>
                        <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                            Aqui ficará o gráfico do andamento de cada uma das partes da obra
                        </Text>
                    </Flex>
                </Flex>

                {/* QUADRO DE AVISOS */}
                <Flex w='100%' flexDir={'column'} gap={8}>

                    <NotificationsHeader createNotification={createNotification}/>

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