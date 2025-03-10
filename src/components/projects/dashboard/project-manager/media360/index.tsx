import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Pannellum, PannellumVideo } from "pannellum-react";



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FotosMedia360 } from "./carousel/FotosMedia360";
import { FotosCarousel } from "../fotos/carousel/FotosCarousel";

interface ProjectMedia360ProjectManager {
    projectData: Investment
    setProjectData: Dispatch<SetStateAction<Investment | null>>
    userData: User
}


export function ProjectMediaMedia360({ projectData, setProjectData, userData }: ProjectMedia360ProjectManager) {


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
        <Flex flexDir={'column'} w='100%' gap={4}>

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
                        label={"MEDIA360"}
                        userData={userData}
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
                                {imageOnView ? (

                                    <Pannellum
                                        width="100%"
                                        height="500px"
                                        image={imageOnView.url}
                                        pitch={10}
                                        yaw={180}
                                        hfov={110}
                                        autoLoad
                                    >
                                    </Pannellum>

                                ) : (
                                    <Spinner boxSize={32} />
                                )}
                            </ModalBody>
                        </ModalContent>
                    </Modal >
                </>
            }
        </Flex>
    )
}
