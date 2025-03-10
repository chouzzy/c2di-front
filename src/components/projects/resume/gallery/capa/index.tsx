import { CapaInput } from "@/components/CreateProjects/Inputs/CapaInput";
import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ProjectDataProps {
    projectData: Investment
    userData: User
    setProjectData: Dispatch<SetStateAction<Investment | null>>
}
export function CapaGaleria({ userData, projectData, setProjectData }: ProjectDataProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [capa, setCapa] = useState<Photos>({
        id: '',
        url: '/assets/img-not-found.png',
        description: "",
        title: ""
    })

    const [imageOnView, setImageOnView] = useState<Photos>()

    const [loadingFiles, setLoadingFiles] = useState(false);

    useEffect(() => {
        const changeCapa = () => {
            const capa = projectData.photos.find((photoGroup) => photoGroup.category == "CAPA" )

            if (capa) {
                setCapa(capa.images[0])
            }
        }

        if (projectData) {
            changeCapa()
        }
    }, [projectData])

    const openImage = (img: Photos) => {
        setImageOnView(img)
        onOpen()
    }

    const closeImage = () => {
        onClose()
    }

    return (

        <Flex flexDir={'column'} w='100%' gap={6}>
            {/* HEADER */}
            <Flex justifyContent={'space-between'} w='100%' alignItems={'center'}>
                <Flex flexDir={'column'}>
                    <Flex> <Text fontSize={16} fontWeight={'semibold'}> Capa </Text></Flex>
                    <Flex> <Text fontSize={14}> Imagem que aparecerá como capa do projeto. </Text></Flex>
                </Flex>
                {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?

                    <Flex>
                        <CapaInput
                            label={"CAPA"}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            projectData={projectData}
                            setLoadingFiles={setLoadingFiles}
                            setProjectData={setProjectData}
                        />
                    </Flex>
                    : ''}
            </Flex>

            {/* IMAGE */}
            {loadingFiles ?
                <Flex w='100%' justifyContent={'center'}>
                    <Flex gap={4} h='100%' alignItems={'center'}>
                        <Text>Fazendo upload do arquivo...</Text>
                        <Spinner boxSize={4} />
                    </Flex>
                </Flex>
                :
                <Flex>
                    <Image
                        src={capa.url}
                        cursor={'pointer'}
                        h={32}
                        w='100%'
                        objectFit={'cover'}
                        objectPosition={'center'}
                        onClick={() => { capa ? openImage(capa) : alert('Capa não cadastrada') }}
                    />
                </Flex>
            }

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
        </Flex>
    )
}