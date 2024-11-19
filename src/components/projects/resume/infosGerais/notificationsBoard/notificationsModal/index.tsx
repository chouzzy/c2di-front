import { Modal, ModalOverlay, ModalContent, ModalHeader, Flex, ModalCloseButton, ModalBody, Button, Text, Spinner } from "@chakra-ui/react"
import { GoProjectRoadmap } from "react-icons/go"
import { MdCircleNotifications } from "react-icons/md"

interface NotificationsModalProps {
    isOpen: boolean,
    closeNotification: () => void,
    notificationOpened: Notification | undefined,
    redirectToProject: (notificationID: Notification["id"]) => void,
    deletingNotification: boolean
}


export function NotificationsModal({ isOpen, closeNotification, notificationOpened, redirectToProject, deletingNotification }: NotificationsModalProps) {
    return (

        <Modal isOpen={isOpen} onClose={closeNotification}>
            <ModalOverlay />
            <ModalContent p={4}>
                <ModalHeader>
                    <Flex gap={2} alignItems={'end'} flexDir={'row'} pt={4}>
                        <Flex color='redSide'>
                            <MdCircleNotifications size={32} />
                        </Flex>
                        <Text>
                            Notificação
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton color={'#EF3A5D'} />
                <ModalBody >
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={4} w='100%'>

                        {notificationOpened ?

                            <>
                                <Flex alignItems={'start'} flexDir={'column'} pt={4} w='100%' justifyContent={'space-between'} gap={12}>
                                    <Flex flexDir={'column'} gap={4}>
                                        <Text fontSize={18} fontWeight={'medium'}>
                                            {notificationOpened.title}
                                        </Text>
                                        <Text fontWeight={'light'} fontSize={14}>
                                            {notificationOpened.message}
                                        </Text>
                                    </Flex>


                                    <Flex
                                        onClick={() => { redirectToProject(notificationOpened.investmentId) }}
                                        cursor={'pointer'}
                                        _hover={{ textDecoration: 'none', color: 'grayHoverSide' }}
                                        color='lightSide'
                                        bgColor={'redSide'}
                                        py={2}
                                        px={3}
                                        borderRadius={8}
                                        alignItems={'center'}
                                        gap={2}
                                        w='100%'
                                        justifyContent={'center'}
                                    >
                                        <Text fontWeight={'medium'}>
                                            Ver projeto
                                        </Text>
                                        <GoProjectRoadmap size={20} />
                                    </Flex>

                                </Flex>
                                <Flex alignItems={'center'} justifyContent={'center'} w='100%'>
                                    <Button onClick={closeNotification} w='100%' _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={'darkSide'}>
                                        <Flex minW={12} alignItems={'center'} justifyContent={'center'}>
                                            {deletingNotification ?
                                                <Spinner boxSize={6} />
                                                :
                                                <Text>Fechar notificação</Text>
                                            }
                                        </Flex>
                                    </Button>
                                </Flex>
                            </>
                            :
                            <Spinner boxSize={32} />
                        }

                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}