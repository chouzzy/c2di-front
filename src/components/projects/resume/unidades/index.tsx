import { Button, Container, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { ProjectFileInput } from "@/components/CreateProjects/Inputs/FileInput";
import { ErrorInputComponent } from "@/components/ErrorInputComponent";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { importExcelUnidades } from "@/app/services/importExcelUnidades";
import { FotosGerais } from "./fotos/FotosGerais";
import { FotosPlanta } from "./plantas/FotosPlanta";
import { SpinnerFullScreen } from "@/components/Loading/SpinnerFullScreen";
import axios from "axios";

interface ProjectDataProps {
    projectData: Investment
    userData: User
}

export interface listNotificationsResponse {
    notifications: Notification[],
    totalDocuments: number
}

export function Unidades({ userData, projectData }: ProjectDataProps) {


    const [yupError, setYupError] = useState(''); // Estado para controlar o modo de edição

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [imageOnView, setImageOnView] = useState<Investment["apartamentTypes"][0]["fotos"][0]>()

    const [loadingFiles, setLoadingFiles] = useState(false);

    const [unidadeInView, setUnidadeInView] = useState<number | undefined>(undefined)

    const [activeButton, setActiveButton] = useState('')

    const openImage = (img: Investment["apartamentTypes"][0]["fotos"][0]) => {
        setImageOnView(img)
        onOpen()
    }

    const closeImage = () => {
        onClose()
    }

    const selectApartamentType = (id: Investment["apartamentTypes"][0]["id"]) => {

        const index = projectData.apartamentTypes.findIndex(tipo => tipo.id === id);

        setUnidadeInView(index)
        setActiveButton(id)
    }

    const onSubmitImport = async (data: any) => {

        setYupError("")

        try {
            setLoadingFiles(true)

            for (let apTypeIndex = 0; apTypeIndex < projectData.apartamentTypes.length; apTypeIndex++) {


                // Deleta as fotos gerais no banco de imagens
                for (let fotosIndex = 0; fotosIndex < projectData.apartamentTypes[apTypeIndex].fotos.length; fotosIndex++) {

                    const responseImgDeleted = await axios.post('/api/delete-image', {
                        imageUrl: decodeURIComponent(projectData.apartamentTypes[apTypeIndex].fotos[fotosIndex])
                    });
                }

                // Deleta as plantas no banco de imagens
                for (let plantasIndex = 0; plantasIndex < projectData.apartamentTypes[apTypeIndex].plantas.length; plantasIndex++) {

                    const responseImgDeleted = await axios.post('/api/delete-image', {
                        imageUrl: decodeURIComponent(projectData.apartamentTypes[apTypeIndex].plantas[plantasIndex])
                    });
                }
            }


            const file = data.document[0]

            const formData = new FormData();
            formData.append('file', file); // Adiciona o arquivo ao FormData

            const investment = await importExcelUnidades(formData, projectData.id)

            window.location.reload()

        } catch (error) {

            console.error('Erro no update do building progress')
            console.error(error)
            setYupError(String(error))
        }
    }




    return (
        // <Container w='100%' border='1px'>
        <Flex w='100%' py={8} flexDir={'row'} flexDirection={'column'} gap={16}>

            <ErrorInputComponent error={yupError} />

            {loadingFiles ?
                <Flex w='100%' justifyContent={'center'} gap={4} alignItems={'center'}>
                    <Text>Fazendo upload dos arquivos, aguarde...</Text>
                    <Spinner boxSize={4} />
                </Flex>
                :


                <Flex flexDir={'column'} w='100%'>
                    <Flex flexDir={'column'} gap={4}>
                        <Flex>
                            <Text fontSize={'lg'} fontWeight={'medium'}>
                                Detalhamento das unidades
                            </Text>
                        </Flex>
                        <Flex>
                            <Text>
                                Aqui você poderá ver o detalhamento de cada unidade do empreendimento
                            </Text>
                        </Flex>

                        {/* INPUT DO EXCEL */}
                        {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?
                            < Flex >
                                <form onSubmit={handleSubmit(onSubmitImport)} style={{ width: '100%' }}>
                                    <Flex w='100%' flexDir={'row'} alignItems={'center'}>
                                        <ProjectFileInput
                                            key={"EXCEL"}
                                            className={'excel'}
                                            isRequired={true}
                                            multiple={false}
                                            allowedTypes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                                            accept=".xls, .xlsx"
                                            label_top='Documentos (Excel)'
                                            register={register("document")}
                                        />
                                        <Button ml={4} maxW={32} mt={12} _hover={{ bgColor: 'redSide' }} size={'md'} borderRadius={8} type='submit' color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} >
                                            Salvar dados
                                        </Button>
                                    </Flex>
                                </form>
                            </Flex>
                            : ''}

                        <Flex>
                            <Text>
                                Total de apartamentos: {projectData.apartaments.length}
                            </Text>
                        </Flex>
                        <Flex gap={4}>
                            {projectData.apartamentTypes.map((type, index) => {
                                return (
                                    <Flex key={type.id}>
                                        <Flex cursor={'pointer'} p={2} fontWeight={'medium'} borderRadius={2} bgColor={type.id == activeButton ? 'green.500' : 'redSide'} color={'lightSide'} onClick={() => selectApartamentType(type.id)}>
                                            {type.metragem} - {type.description}
                                        </Flex>
                                    </Flex>
                                )
                            })}
                        </Flex>

                        <FotosGerais
                            unidadeInView={unidadeInView}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            userData={userData}
                            />
                        <FotosPlanta
                            unidadeInView={unidadeInView}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            userData={userData}
                        />

                        <Modal isOpen={isOpen} onClose={closeImage} size={'6xl'} isCentered={true}>
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

                    </Flex>
                </Flex>
            }
        </Flex >
        // </Container>
    )
}