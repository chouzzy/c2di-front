import { Button, Spinner, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { PiArrowCircleLeft, PiArrowCircleRight, PiCheckThin } from "react-icons/pi";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Flex } from "@chakra-ui/react/flex"
import { readPrismaNotification } from "@/app/services/readNotification";
import { NotificationsModal } from "./notificationsModal";
import { HiOutlineSpeakerphone, HiSpeakerphone } from "react-icons/hi";



interface NotificationsBoard {
    totalDocuments: number
    page: number
    pageRange: number
    setPage: Dispatch<SetStateAction<number>>
    notifications: Notification[]
    reloadNotifications: () => void
}

export function NotificationsBoard({ totalDocuments, page, pageRange, setPage, notifications, reloadNotifications }: NotificationsBoard) {

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [readingNotification, setReadingNotification] = useState(false)
    const [deletingNotification, setDeletingNotification] = useState(false)
    const [notificationOpened, setNotificationOpened] = useState<Notification>()


    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }


    const closeNotification = () => {
        setReadingNotification(false)
        reloadNotifications()
        onClose()
    }

    const openNotification = (notificationID: Notification["id"]) => {

        const notificationFiltered = notifications.filter(notification => notification.id === notificationID);
        setNotificationOpened(notificationFiltered[0])
        setReadingNotification(true)
        onOpen()
    }

    const redirectToProject = (notificationID: Notification["id"]) => {
        window.location.href = `/project-manager/projects/${notificationID}`
    }

    useEffect(() => {

        const readNotification = async (notificationID: Notification["id"]) => {

            try {
                const response = await readPrismaNotification(notificationID)
                console.log(response)
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
            <Flex h={52} w='100%' border='1px' borderColor={'grayDivisor'} borderRadius={8} px={4} py={2} flexDir={'column'} justifyContent={'space-between'}>

                {notifications ?
                    <Flex flexDir={'column'}>
                        {notifications.map((notification) => {
                            let { isRead } = notification
                            isRead = false
                            return (
                                <Flex
                                    key={notification.id}
                                    onClick={() => { openNotification(notification.id) }}
                                    _hover={{ color: 'graySide', transition: '300ms' }}
                                    color={isRead ? useColorModeValue('darkSide', 'lightSide') : useColorModeValue('grayDivisor', 'dark.grayDivisor')}
                                    cursor={'pointer'}
                                    py={2}
                                    gap={4}
                                    borderBottom='1px'
                                    borderColor={'grayDivisor'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Text fontSize={12} fontWeight={'medium'}>
                                        {notification.title.length > 67 ? notification.title.slice(0, 67) + '...' : notification.title}
                                    </Text>
                                    <Flex color={'graySide'}>
                                        {isRead ? <PiCheckThin size={20} /> : <HiSpeakerphone size={20} />}
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>
                    :
                    <Flex w='100%' h='100%' alignItems={'center'} justifyContent={'center'}>
                        <Spinner boxSize={24} />
                    </Flex>



                }
                <Flex justifyContent={'space-between'}>
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

                    <Button
                        onClick={nextPage}
                        _hover={{ bgColor: 'graySide' }}
                        color={'lightSide'}
                        bgColor={useColorModeValue('darkSide', 'dark.lightSide')}
                        size='xs'
                        isDisabled={page >= Math.ceil(totalDocuments / pageRange)}
                    >
                        <Flex minW={18} alignItems={'center'} justifyContent={'center'}>
                            <Text><PiArrowCircleRight size={18} /></Text>
                        </Flex>
                    </Button>
                </Flex>

            </Flex>

            <NotificationsModal
                isOpen={isOpen}
                closeNotification={closeNotification}
                notificationOpened={notificationOpened}
                redirectToProject={redirectToProject}
                deletingNotification={deletingNotification}
            />

        </>
    )
}