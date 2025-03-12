import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface HeaderProjectProps {
    projectData: Investment
}

export function HeaderInvestorProject({ projectData }: HeaderProjectProps) {

    const { isOpen: isOpenImage, onOpen: onOpenImage, onClose: onCloseImage } = useDisclosure() // Adiciona o hook useDisclosure
    const [capa, setCapa] = useState<Photos["url"]>('/assets/img-not-found.png')
    const [imageOnView, setImageOnView] = useState<Photos["url"]>()

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


    return (
        <>
            <Flex flexDir={'column'}>
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
                </Modal>
            </Flex >
        </>


    )
}