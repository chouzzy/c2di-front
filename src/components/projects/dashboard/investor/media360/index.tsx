import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FotosMedia360 } from "./carousel/FotosMedia360";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

interface ProjectMedia360ProjectManager {
    projectData: Investment
}

export function ProjectMedia360Investor({ projectData }: ProjectMedia360ProjectManager) {


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
                        {imageOnView ?
                            <Flex maxW={'100%'} gap={2}>
                                <ReactPhotoSphereViewer
                                    src={`${imageOnView.url}`}
                                    height={"500px"}
                                    width={"100%"}
                                ></ReactPhotoSphereViewer>
                            </Flex>
                            :
                            <Spinner boxSize={32} />}
                    </ModalBody>
                </ModalContent>
            </Modal >

        </Flex>
    )
}
