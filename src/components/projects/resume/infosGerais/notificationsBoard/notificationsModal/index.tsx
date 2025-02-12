import { Modal, ModalOverlay, ModalContent, ModalHeader, Flex, ModalCloseButton, ModalBody, Button, Text, Spinner, useColorModeValue } from "@chakra-ui/react"
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
            <ModalContent py={2} borderRadius={2}>
                <ModalHeader>
                    <Flex gap={2} alignItems={'center'} flexDir={'row'} pt={4}>
                        <Flex color={useColorModeValue('graySide', 'dark.graySide')}>
                            <MdCircleNotifications size={28} />
                        </Flex>
                        <Text>
                            Notificação
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton color={'#EF3A5D'} />
                <ModalBody >
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={16} w='100%'>

                        {notificationOpened ?

                            <>
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
                                            Var projeto
                                        </Text>
                                        {/* <GoProjectRoadmap size={20} /> */}
                                    </Flex>

                                    <Flex alignItems={'center'} justifyContent={'center'}>
                                        <Button onClick={closeNotification} w='100%' _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={useColorModeValue('darkSide', 'dark.lightSide')} borderRadius={2}>
                                            <Flex minW={12} alignItems={'center'} justifyContent={'center'}>
                                                {deletingNotification ?
                                                    <Spinner boxSize={6} />
                                                    :
                                                    <Text>Fechar</Text>
                                                }
                                            </Flex>
                                        </Button>
                                    </Flex>
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