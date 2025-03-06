import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FotosDestaques } from "./carousel/FotosDestaques";
import { FotosInterno } from "./carousel/FotosInterno";
import { FotosExterno } from "./carousel/FotosExterno";
import { FotosCarousel } from "./carousel/FotosCarousel";


interface ProjectFotosProjectManager {
    projectData: Investment
    setProjectData:Dispatch<SetStateAction<Investment | null>>
}

export function ProjectFotosProjectManager({ projectData, setProjectData }: ProjectFotosProjectManager) {


    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [imageOnView, setImageOnView] = useState<Photos>()

    const [loadingFiles, setLoadingFiles] = useState(false);


    const openImage = (img: Photos) => {
        setImageOnView(img)
        onOpen()
    }


    const closeImage = () => {
        onClose()
    }

    return (
        <Flex flexDir={'column'} w={['100%', '100%', '100%', '100%', '100%', '100%']} gap={4} >

            {loadingFiles ?
                <Flex w='100%' justifyContent={'center'}>
                    <Flex gap={4} h='100%' alignItems={'center'}>
                        <Text>Fazendo upload dos arquivos...</Text>
                        <Spinner boxSize={4} />
                    </Flex>
                </Flex>
                :
                <>
                    <FotosCarousel
                        label={"FACHADA"}
                        projectData={projectData}
                        setProjectData={setProjectData}
                        openImage={openImage}
                        setLoadingFiles={setLoadingFiles}
                    />
                    <FotosCarousel
                        label={"INTERNO"}
                        projectData={projectData}
                        setProjectData={setProjectData}
                        openImage={openImage}
                        setLoadingFiles={setLoadingFiles}
                    />
                    <FotosCarousel
                        label={"EXTERNO"}
                        projectData={projectData}
                        setProjectData={setProjectData}
                        openImage={openImage}
                        setLoadingFiles={setLoadingFiles}
                    />

                    <Modal isOpen={isOpen} onClose={closeImage} size={'6xl'} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton color={'white'} bgColor={'#EF3A5D'} />
                            <ModalBody p={0}>
                                {imageOnView ?
                                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={4} w='100%'>
                                        <Image w='100%' src={`${imageOnView.url}`} objectFit={'cover'} objectPosition={'center'} />
                                    </Flex>
                                    :
                                    <Spinner boxSize={32} />}
                            </ModalBody>
                        </ModalContent>
                    </Modal >
                </>
            }

        </Flex>
    )
}