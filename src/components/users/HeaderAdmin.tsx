import { resetPassword } from "@/app/services/changePassword";
import { deletePrismaAndAuth0User } from "@/app/services/deletePrismaAndAuth0User";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Envelope, Key } from "phosphor-react";
import { useEffect, useState } from "react";

interface AdminHeaderProps {
    userData: User | null
    user: UserProfile
}

export function AdminHeader({ userData, user }: AdminHeaderProps) {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [changingPassword, setChangingPassword] = useState(false)
    const [deletingUser, setDeletingUser] = useState(false)
    const [deleteUserConfirm, setDeleteUserConfirm] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)
    const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal

    const changePassword = () => {
        setChangingPassword(true)
    }

    const deleteUser = () => {
        setDeletingUser(true)
        onOpen()
    }

    const deleteUserConfirmed = () => {
        setDeleteUserConfirm(true)
        onOpen()
    }

    const cancelDeleteUser = () => {
        setDeletingUser(false)
        setDeleteUserConfirm(false)
        onClose()
    }

    const refreshPageAfterCloseModal = () => {
        if (userDeleted) {
            onClose()
            router.push('/users/list')
        } else {
            onClose()
        }
    }

    useEffect(() => {
        const updatePassword = async (email: User["email"]) => {
            const resetPasswordMessage = await resetPassword(email)
            setModalMessage(resetPasswordMessage); // Define a mensagem do modal
            onOpen();
        }

        if (changingPassword) {

            if (userData) {
                updatePassword(userData.email)
                setChangingPassword(false)
            }
        }

    }, [changingPassword])

    useEffect(() => {
        const deleteUser = async (id: User["id"], auth0UserID: UserProfile["sub"]) => {
            setDeletingUser(true)
            const deleteUserSuccessMessage = await deletePrismaAndAuth0User(id, auth0UserID)
            setModalMessage(deleteUserSuccessMessage); // Define a mensagem do modal
            setUserDeleted(true)
            onClose()
            router.push('/users/list')

        }

        if (deletingUser) {

            if (userData && user) {
                deleteUser(userData.id, user.sub)
                setChangingPassword(false)
            }
        }

    }, [deleteUserConfirm])

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Perfil do usuário
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar e editar as informações cadastradas no painel
                    </Text>
                </Flex>
            </Flex>

            <Flex gap={8} alignItems={'center'}>
                <Button onClick={changePassword} _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                    <Flex minW={32} alignItems={'center'} justifyContent={'center'}>

                        {changingPassword ?
                            <Spinner boxSize={4} />
                            :
                            <Text>Alterar senha</Text>
                        }
                    </Flex>
                </Button>
                <Button onClick={deleteUser} _hover={{ bgColor: 'red' }} color={'lightSide'} bgColor={'redSide'} mt={4}>
                    <Flex minW={32} alignItems={'center'} justifyContent={'center'}>
                        <Text>Desativar usuário</Text>
                    </Flex>
                </Button>
            </Flex>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={refreshPageAfterCloseModal} >
                <ModalOverlay />
                <ModalContent>
                    {deletingUser ?
                        <>
                            <ModalHeader>
                                <Flex gap={2} alignItems={'start'} flexDir={'column'} pt={4}>
                                    <Text>
                                        Desativar usuário
                                    </Text>
                                    <Text fontWeight={'light'} fontSize={14}>
                                        Esta ação não pode ser desfeita. Você irá deletar este usuário permanentemente do portal.
                                    </Text>
                                </Flex>
                            </ModalHeader>
                            <ModalCloseButton onClick={cancelDeleteUser} color={'#EF3A5D'} />
                            <ModalBody>
                                <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <Text textAlign={'center'} fontWeight={'light'}>
                                        {modalMessage} {/* Exibe a mensagem do modal */}
                                    </Text>
                                </Flex>
                                <Flex alignItems={'center'} justifyContent={'end'} gap={2}>
                                    <Button onClick={cancelDeleteUser} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                                        <Flex minW={16} alignItems={'center'} justifyContent={'center'} fontWeight={'normal'}>
                                            <Text>Voltar</Text>
                                        </Flex>
                                    </Button>
                                    <Button onClick={deleteUserConfirmed} _hover={{ bgColor: 'red' }} color={'lightSide'} bgColor={'redSide'} mt={4}>
                                        <Flex minW={16} alignItems={'center'} justifyContent={'center'} fontWeight={'normal'}>
                                            <Text>Desativar</Text>
                                        </Flex>
                                    </Button>
                                </Flex>
                            </ModalBody>
                        </>
                        :

                        <ModalBody>
                            <Flex p={8} flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                <Flex alignItems={'center'}>
                                    <Envelope size={32} color={'#EF3A5D'} />
                                    <Key size={24} color={'#EF3A5D'} />
                                </Flex>
                                <Text textAlign={'center'} fontWeight={'normal'}>
                                    {modalMessage} {/* Exibe a mensagem do modal */}
                                </Text>
                            </Flex>
                        </ModalBody>
                    }
                    {/* <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>


    )
}