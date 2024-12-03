import { listUserNotifications } from "@/app/services/listUserNotifications"
import { Modal, ModalOverlay, ModalContent, ModalHeader, Flex, ModalCloseButton, ModalBody, Button, Text, Spinner, Menu, MenuButton, MenuItem, MenuList, Avatar, HStack, LightMode, Spacer, VStack, useDisclosure } from "@chakra-ui/react"
import { ArrowDown, Bell } from "phosphor-react"
import { useEffect, useState } from "react"
import { GoProjectRoadmap } from "react-icons/go"
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Importa a localização em português

import { PiArrowCircleLeft, PiArrowCircleRight } from "react-icons/pi"
import { MdCircleNotifications } from "react-icons/md"
import { readPrismaUserNotification } from "@/app/services/readUserNotification"

interface NotificationsModalProps {
    userData: User
}


export function UserNotificationsModal({ userData }: NotificationsModalProps) {

    const userDataNotifications = userData.userNotifications

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [page, setPage] = useState(1)
    const [isAlertsOpen, setIsAlertsOpen] = useState(false)
    const [pageRange, setPageRange] = useState(6)
    const [totalDocuments, setTotalDocuments] = useState<number>(0)
    const [userNotifications, setUserNotifications] = useState<Notification[] | null>()
    const [notificationOpened, setNotificationOpened] = useState<Notification>()
    const [readingNotification, setReadingNotification] = useState(false)


    // const [userDataNotifications, setUserDataNotifications] = useState<User["userNotifications"]>()

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }
    const closeNotification = () => {
        setReadingNotification(false)

        onClose()
    }

    const openNotification = (notificationOpened: Notification) => {
        setNotificationOpened(notificationOpened)
        setReadingNotification(true)
        onOpen()
    }

    const redirectToProject = (investmentId: Investment["id"]) => {

        if (userData.role === 'PROJECT_MANAGER') {
            window.location.href = `/project-manager/projects/${investmentId}`
        }
        if (userData.role === 'ADMINISTRATOR' || userData.role === "INVESTOR") {
            window.location.href = `/projects/${investmentId}`
        }
    }

    useEffect(() => {

        const loadNotifications = async (userID: User["id"]) => {

            try {

                const response = await listUserNotifications(userID, page, pageRange)
                setUserNotifications(response.notifications)
                setTotalDocuments(response.totalDocs)

            } catch (error) {
                console.error(error)
            }

        }

        if (userData) {
            loadNotifications(userData.id)
        }

    }, [isAlertsOpen, page])


    useEffect(() => {

        const readNotification = async (notificationID: Notification["id"]) => {

            try {
                userData.userNotifications

                const updatedUserNotifications = userData.userNotifications.map((notification) =>
                    notification.notificationID === notificationID ? { ...notification, isRead: true } : notification
                );

                userData.userNotifications = updatedUserNotifications

                const userUpdated = await readPrismaUserNotification(userData.id, userData)

                userData = userUpdated

            } catch (error) {
                console.error(error)
            }

        }

        if (readingNotification && notificationOpened && !notificationOpened.isRead) {
            readNotification(notificationOpened.id)
        }

    }, [readingNotification])

    return (
        <>
            <Menu >
                <MenuButton onClick={() => setIsAlertsOpen(!isAlertsOpen)} as={Flex} cursor={'pointer'}>
                    <Bell size={22} />
                </MenuButton>
                <Flex>
                    <MenuList color='darkSide' w='400px'>

                        {/* TITULO */}
                        <Flex w='100%' textAlign={'center'} p={4}>
                            <Text fontSize={'md'} fontWeight={'semibold'} w='100%'>Notificações</Text>
                        </Flex>


                        {userNotifications?.map((notification) => {

                            const { title, message, createdAt } = notification

                            const notificationData = userDataNotifications.find(
                                (notificationData) => notificationData.notificationID === notification.id
                            );

                            if (!notificationData) { return }

                            const { isRead, notificationID } = notificationData
                            notification.isRead = isRead

                            return (

                                <MenuItem
                                    key={notification.id}
                                    onClick={() => { openNotification(notification) }}
                                    _hover={{ bgColor: 'blue.100' }}
                                    bgColor={isRead ? 'white.100' : 'gray.100'}
                                    my={1}
                                    cursor={'pointer'}
                                >
                                    <Flex gap={3} alignItems="center" w='100%' py={2}>

                                        <Avatar size="sm" bgColor="grayBoxSide" icon={<GoProjectRoadmap size={20} />} />

                                        <Flex flexDir={'row'} alignItems="center" justifyContent={'space-between'} w='100%' gap={4}>

                                            <Flex flexDir={'column'}>
                                                <Text fontWeight="bold" fontSize="sm">
                                                    {title}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    {message.length > 48 ? message.slice(0, 48) + '...' : message}
                                                </Text>
                                            </Flex>

                                            <Flex>
                                                <Text fontSize={10} color="gray.400" textAlign={'center'}>
                                                    {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
                                                </Text>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                </MenuItem>
                            )
                        })}


                        {/* FOOTER E PAGINAÇÃO */}
                        <Flex w='100%' textAlign={'center'} p={4}>

                            <Button
                                onClick={previousPage}
                                _hover={{ bgColor: 'graySide', color: 'lightSide' }}
                                color={'darkSide'}
                                bgColor={'lightSide'}
                                border='1px'
                                borderColor={'grayDivisor'}
                                size='xs'
                                isDisabled={page <= 1}
                            >
                                <Flex minW={18} alignItems={'center'} justifyContent={'center'}>
                                    <Text><PiArrowCircleLeft size={18} /></Text>
                                </Flex>
                            </Button>

                            <Flex flexDir={'column'} w='100%' gap={2}>
                                <Text fontSize={'sm'} fontWeight={'medium'} w='100%'>Mostrando {userNotifications?.length} de {totalDocuments ?? 0} notificações </Text>
                                <Text fontSize={10} fontWeight={'light'} w='100%'> Página {page} </Text>
                            </Flex>

                            <Button
                                onClick={nextPage}
                                _hover={{ bgColor: 'graySide' }}
                                color={'lightSide'}
                                bgColor={'darkSide'}
                                size='xs'
                                isDisabled={page >= Math.ceil(totalDocuments / pageRange)}
                            >
                                <Flex minW={18} alignItems={'center'} justifyContent={'center'}>
                                    <Text><PiArrowCircleRight size={18} /></Text>
                                </Flex>
                            </Button>

                        </Flex>

                    </MenuList>
                </Flex>
            </Menu>




            <Modal isOpen={isOpen} onClose={closeNotification}>
                <ModalOverlay />
                <ModalContent py={2} borderRadius={2}>
                    <ModalHeader>
                        <Flex gap={2} alignItems={'center'} flexDir={'row'} pt={4}>
                            <Flex color='graySide'>
                                <MdCircleNotifications size={28} />
                            </Flex>
                            <Text>
                                Notificação
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton color={'#EF3A5D'} />
                    <ModalBody >
                        {notificationOpened ?
                            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={16} w='100%'>
                                <Flex alignItems={'start'} flexDir={'column'} pt={4} w='100%' justifyContent={'space-between'} gap={12}>
                                    <Flex flexDir={'column'} gap={4}>
                                        <Text fontSize={18} fontWeight={'medium'} borderBottom={'1px'} borderColor={'grayDivisor'}>
                                            {notificationOpened.title}
                                        </Text>
                                        <Text fontWeight={'light'} fontSize={14}>
                                            {notificationOpened.message}
                                        </Text>
                                    </Flex>




                                </Flex>

                                <Flex w='100%' justifyContent={'space-between'}>
                                    <Flex
                                        onClick={() => { redirectToProject(notificationOpened.investmentId) }}
                                        cursor={'pointer'}
                                        _hover={{ textDecoration: 'none', color: 'grayHoverSide', bgColor: 'redSide', transition: '300ms' }}
                                        color='lightSide'
                                        bgColor={'graySide'}
                                        py={2}
                                        px={3}
                                        borderRadius={2}
                                        alignItems={'center'}
                                        gap={2}
                                        justifyContent={'center'}
                                    >
                                        <Text fontWeight={'medium'}>
                                            Ver projeto
                                        </Text>
                                        {/* <GoProjectRoadmap size={20} /> */}
                                    </Flex>

                                    <Flex alignItems={'center'} justifyContent={'center'}>
                                        <Button onClick={closeNotification} w='100%' _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={'darkSide'} borderRadius={2}>
                                            <Flex minW={12} alignItems={'center'} justifyContent={'center'}>
                                                Fechar
                                                {/* {deletingNotification ?
                                                        <Spinner boxSize={6} />
                                                        :
                                                        <Text>Fechar</Text>
                                                    } */}
                                            </Flex>
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                            :
                            <Spinner boxSize={32} />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal >

        </>
    )
}