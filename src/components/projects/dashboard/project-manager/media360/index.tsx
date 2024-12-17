import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { Pannellum, PannellumVideo } from "pannellum-react";



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FotosMedia360 } from "./carousel/FotosMedia360";

interface ProjectMedia360ProjectManager {
    projectData: Investment
}


export function ProjectMedia360ProjectManager({ projectData }: ProjectMedia360ProjectManager) {


    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [imageOnView, setImageOnView] = useState<Investment["images"][0]>()


    const openImage = (img: Investment["images"][0]) => {
        setImageOnView(img)
        onOpen()
    }


    const closeImage = () => {
        onClose()
    }

    return (
        <Flex flexDir={'column'} w='100%' gap={4} >

            <FotosMedia360
                projectData={projectData}
                openImage={openImage}
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
                                onLoad={() => {
                                    console.log("panorama loaded");
                                }}
                            >
                            </Pannellum>

                        ) : (
                            <Spinner boxSize={32} />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal >

        </Flex>
    )
}
