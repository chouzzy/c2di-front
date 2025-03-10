import { resetPassword } from "@/app/services/changePassword";
import { changeProjectStatus } from "@/app/services/changeProjectStatus";
import { deletePrismaAndAuth0User } from "@/app/services/deletePrismaAndAuth0User";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, Flex, Spinner, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Envelope, Key } from "phosphor-react";
import { useEffect, useState } from "react";

interface HeaderProjectProps {
    userData: User | null
    projectData: Investment
    user: UserProfile
}

export function HeaderAdminProject({ projectData, userData, user }: HeaderProjectProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [changingPassword, setChangingPassword] = useState(false)
    const [archivingProject, setArchivingProject] = useState(false)
    const [archiveProjectConfirm, setArchiveProjectConfirm] = useState(false)
    const [archivedProject, setArchivedProject] = useState(false)
    const [modalMessage, setModalMessage] = useState(''); // Estado para a mensagem do modal

    const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure() // Adiciona o hook useDisclosure
    const [capa, setCapa] = useState<Photos["url"]>('/assets/img-not-found.png')
    const [imageOnView, setImageOnView] = useState<Photos["url"]>()


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

    const openImage = (url: Photos["url"]) => {
        setImageOnView(url)
        onOpenImage()
    }

    const closeImage = () => {
        onCloseImage()
    }

    useEffect(() => {

        const getCapa = async () => {

            const capa = projectData.photos.find((photoGroup) => photoGroup.category === "CAPA")
            if (capa) {
                setCapa(capa.images[0].url)
            } else {
                setCapa('/assets/img-not-found.png')
            }
        }

        if (projectData) {
            getCapa()
        }
    }, [projectData])


    useEffect(() => {

        const archiveProject = async (projectData: Investment, status: boolean) => {

            try {

                setArchivedProject(true)
                const response = await changeProjectStatus(projectData.id, status)
                onClose()
                window.location.href = `${window.location.pathname}`

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
            <Flex flexDir={['column', 'column', 'column', 'row', 'row']} alignItems={['center']} justifyContent={'space-between'} w='100%'>

                <Flex alignItems={['center']} justifyContent={'space-between'} gap={8}>

                    <Flex>
                        <Image
                            src={capa}
                            cursor={'pointer'}
                            h={32}
                            w='100%'
                            objectFit={'cover'}
                            objectPosition={'center'}
                            borderRadius={8}
                            onClick={() => { capa ? openImage(capa) : alert('Capa não cadastrada') }}
                        />
                    </Flex>

                    <Flex flexDir={'column'} w='100%'>
                        <Flex>
                            <Text fontSize={[24, 24, 24, 28, 28]} fontWeight={'semibold'}>
                                {projectData.title}
                            </Text>
                        </Flex>
                        <Flex>
                            <Text fontSize={16}>
                                Aqui você pode visualizar e editar as informações cadastradas no painel
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex gap={8} alignItems={'center'} w={['100%', '100%', '100%', 'initial', 'initial']}>
                    {projectData.active ?
                        <Button onClick={archiveProject} minW={['100%', '100%', '100%', 32, 32]} _hover={{ bgColor: 'red' }} color={'lightSide'} bgColor={'redSide'} mt={4}>
                            <Flex alignItems={'center'} justifyContent={'center'}>
                                <Text>Arquivar projeto</Text>
                            </Flex>
                        </Button>
                        :
                        <Button onClick={activateProject} minW={['100%', '100%', '100%', 32, 32]} _hover={{ bgColor: 'green.600' }} color={'lightSide'} bgColor={'green.400'} mt={4}>
                            <Flex alignItems={'center'} justifyContent={'center'}>
                                <Text>Reativar projeto</Text>
                            </Flex>
                        </Button>
                    }

                </Flex>

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
                            <Button onClick={cancelArchiveProject} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={bgButtonColor} mt={4}>
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

            <Modal isOpen={isOpenImage} onClose={closeImage} size={'6xl'} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton color={'white'} bgColor={'#EF3A5D'} />
                    <ModalBody p={0}>
                        {imageOnView ?
                            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={4} w='100%'>
                                <Image w='100%' src={`${imageOnView}`} objectFit={'cover'} objectPosition={'center'} />
                            </Flex>
                            :
                            <Spinner boxSize={32} />}
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>


    )
}