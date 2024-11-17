import { resetPassword } from "@/app/api/changePassword/route";
import { deletePrismaAndAuth0User } from "@/app/api/deletePrismaAndAuth0User/route";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Envelope, Key } from "phosphor-react";
import { useEffect, useState } from "react";

interface HeaderAdminProjectProps {
    userData: User | null
    user: UserProfile
}

export function HeaderAdminProjectList({ userData, user }: HeaderAdminProjectProps) {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [changingPassword, setChangingPassword] = useState(false)
    const [deletingUser, setDeletingUser] = useState(false)
    const [deleteUserConfirm, setDeleteUserConfirm] = useState(false)
    const [userDeleted, setUserDeleted] = useState(false)
    const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal

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
            // router.push('/api/auth/logout')
        } else {
            onClose()
        }
    }

    // useEffect(() => {
    //     const deleteUser = async (id: User["id"], auth0UserID: UserProfile["sub"]) => {
    //         setDeletingUser(true)
    //         const deleteUserSuccessMessage = await deletePrismaAndAuth0User(id, auth0UserID)
    //         setModalMessage(deleteUserSuccessMessage); // Define a mensagem do modal
    //         setUserDeleted(true)
    //         onClose()
    //         router.push('/api/auth/logout')

    //     }

    //     if (deletingUser) {

    //         if (userData && user) {
    //             deleteUser(userData.id, user.sub)
    //             setChangingPassword(false)
    //         }
    //     }

    // }, [deleteUserConfirm])

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Projetos
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar a listagem de projetos disponíveis para investir
                    </Text>
                </Flex>
            </Flex>

            <Flex gap={8} alignItems={'center'}>
                <Button onClick={() => {alert("Criar um imóvel")}} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                    <Flex minW={32} alignItems={'center'} justifyContent={'center'}>
                        <Text>Criar imóvel</Text>
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
                                        Criar usuário
                                    </Text>
                                    <Text fontWeight={'light'} fontSize={14}>
                                        Esta ação não pode ser desfeita. Você irá deletar os dados desse usuário permanentemente do nosso banco de dados.
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
                                            <Text>Deletar</Text>
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