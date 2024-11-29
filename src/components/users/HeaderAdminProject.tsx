import { resetPassword } from "@/app/services/changePassword/route";
import { changeProjectStatus } from "@/app/services/changeProjectStatus/route";
import { deletePrismaAndAuth0User } from "@/app/services/deletePrismaAndAuth0User/route";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Envelope, Key } from "phosphor-react";
import { useEffect, useState } from "react";

interface HeaderProjectProps {
    userData: User | null
    projectData: Investment
    user: UserProfile
}

export function HeaderAdminProject({ projectData, userData, user }: HeaderProjectProps) {

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure
    const [changingPassword, setChangingPassword] = useState(false)
    const [archivingProject, setArchivingProject] = useState(false)
    const [archiveProjectConfirm, setArchiveProjectConfirm] = useState(false)
    const [archivedProject, setArchivedProject] = useState(false)
    const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal

    const [activatingProject, setActivatingProject] = useState(false)
    const [confirmProjectActivation, setConfirmProjectActivation] = useState(false)

    const archiveProject = () => {
        setArchivingProject(true)
        onOpen()
    }

    const activateProject = () => {
        setActivatingProject(true)
        onOpen()
    }

    const archiveProjectConfirmed = () => {
        setArchiveProjectConfirm(true)
    }

    const activateProjectConfirmed = () => {
        setConfirmProjectActivation(true)
    }

    const cancelArchiveProject = () => {
        setArchivingProject(false)
        setArchiveProjectConfirm(false)
        onClose()
    }


    useEffect(() => {

        const archiveProject = async (projectData: Investment, status: boolean) => {

            try {

                console.log('projeto active:' + status)
                setArchivedProject(true)
                const response = await changeProjectStatus(projectData.id, status)
                console.log('response')
                console.log(response)
                onClose()
                window.location.href = 'http://localhost:3000/project-manager/projects'

            } catch (error) {
                console.error(error)
            }

        }

        if (archivingProject) {

            if (projectData) {
                archiveProject(projectData, false)
            }
        }
        if (activatingProject) {

            if (projectData) {
                archiveProject(projectData, true)
            }
        }

    }, [archiveProjectConfirm, confirmProjectActivation])

    return (
        <>
            <Flex flexDir={'column'}>
                <Flex>
                    <Text fontSize={28} fontWeight={'semibold'}>
                        {projectData.title}
                    </Text>
                </Flex>
                <Flex>
                    <Text fontSize={16}>
                        Aqui você pode visualizar e editar as informações cadastradas no painel
                    </Text>
                </Flex>
            </Flex>

            <Flex gap={8} alignItems={'center'}>
                {projectData.active ?
                    <Button onClick={archiveProject} _hover={{ bgColor: 'red' }} color={'lightSide'} bgColor={'redSide'} mt={4}>
                        <Flex minW={32} alignItems={'center'} justifyContent={'center'}>
                            <Text>Arquivar projeto</Text>
                        </Flex>
                    </Button>
                    :
                    <Button onClick={activateProject} _hover={{ bgColor: 'green.600' }} color={'lightSide'} bgColor={'green.400'} mt={4}>
                        <Flex minW={32} alignItems={'center'} justifyContent={'center'}>
                            <Text>Reativar projeto</Text>
                        </Flex>
                    </Button>
                }

            </Flex>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={cancelArchiveProject} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex gap={2} alignItems={'start'} flexDir={'column'} pt={4}>
                            
                            {projectData.active ?
                                <Text> Arquivar projeto? </Text>
                                :
                                <Text> Reativar projeto? </Text>
                            }


                            <Flex fontWeight={'light'} fontSize={14}>
                                {projectData.active ?
                                    <Text> Esta ação pode gerar consequências graves, você irá desativar o projeto para todos os usuários. </Text>
                                    :
                                    <Text> Você reativará o projeto para todos os usuários </Text>
                                }
                            </Flex>

                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton onClick={cancelArchiveProject} color={'#EF3A5D'} />
                    <ModalBody>
                        <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
                            <Text textAlign={'center'} fontWeight={'light'}>
                                {modalMessage}
                            </Text>
                        </Flex>
                        <Flex alignItems={'center'} justifyContent={'end'} gap={2}>
                            <Button onClick={cancelArchiveProject} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} mt={4}>
                                <Flex minW={16} alignItems={'center'} justifyContent={'center'} fontWeight={'normal'}>
                                    <Text>Voltar</Text>
                                </Flex>
                            </Button>

                            {projectData.active ?
                                <Button onClick={archiveProjectConfirmed} _hover={{ bgColor: 'red' }} color={'lightSide'} bgColor={'redSide'} mt={4}>
                                    <Flex minW={16} alignItems={'center'} justifyContent={'center'} fontWeight={'normal'}>
                                        <Text>Arquivar</Text>
                                    </Flex>
                                </Button>
                                :
                                <Button onClick={activateProjectConfirmed} _hover={{ bgColor: 'green.600' }} color={'lightSide'} bgColor={'green.400'} mt={4}>
                                    <Flex minW={16} alignItems={'center'} justifyContent={'center'} fontWeight={'normal'}>
                                        <Text>Reativar</Text>
                                    </Flex>
                                </Button>
                            }
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