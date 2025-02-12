import { resetPassword } from "@/app/services/changePassword";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from "@chakra-ui/react";
import { Envelope, Key } from "phosphor-react";
import { useEffect, useState } from "react";

interface UserHeaderProps {
    userData: User | null
}

export function UsersHeader({ userData }: UserHeaderProps) {

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [changingPassword, setChangingPassword] = useState(false)
    const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal

    const changePassword = () => {
        setChangingPassword(true)
    }

    useEffect(() => {
        const updatePassword = async (email: User["email"]) => {
            const resetPasswordMessage = await resetPassword(email)
            setModalMessage('resetPasswordMessage'); // Define a mensagem do modal
            onOpen();
        }

        if (changingPassword) {

            if (userData) {
                updatePassword(userData.email)
                setChangingPassword(false)
            }
        }

    }, [changingPassword])

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        Seu perfil
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar e editar as informações cadastradas no painel
                    </Text>
                </Flex>
            </Flex>

            <Flex>
                <Button onClick={changePassword} _hover={{ bgColor: 'redSide' }} color={'lightSide'} bgColor={useColorModeValue('darkSide', 'dark.lightSide')} mt={4}>
                    <Flex minW={32} alignItems={'center'} justifyContent={'center'}>

                        {changingPassword ?
                            <Spinner boxSize={4} />
                            :
                            <Text>Alterar senha</Text>
                        }
                    </Flex>
                </Button>
            </Flex>


            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>
                        <Flex gap={4} alignItems={'center'}>
                            <Key size={24} color={'#EF3A5D'} />
                            <Text>
                                Alteração de Senha
                            </Text>
                        </Flex>
                    </ModalHeader> */}
                    <ModalCloseButton color={'#EF3A5D'} />
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