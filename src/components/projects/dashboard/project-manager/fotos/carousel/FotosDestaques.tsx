import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { deletePrismaProjectImage } from "@/app/services/deleteInvestmentImage";
import { FotosDestaquesInput } from "@/components/CreateProjects/Inputs/FotosDestaquesInput";
import axios from "axios";


interface FotosDestaquesProps {
    projectData: Investment
    openImage: (img: Photos) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
    label:PhotosGroup["category"]
}

export function FotosDestaques({ projectData, openImage, setLoadingFiles, label }: FotosDestaquesProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [destaques, setDestaques] = useState<Photos[]>([]); // Inicializa com array vazio
    const [loading, setLoading] = useState(true); // Estado de loading. Começa true.

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    const slidesResponsive = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3, xl: 4 })

    // DELETE IMAGE DESTAQUES
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

                const imageToDelete = destaques.find((image) => image.id === imageID);

                if (!imageToDelete) {
                    console.warn(`Imagem com ID ${imageID} não encontrada no array destaques`);
                    return;
                }

                const responseImgDeleted = await axios.post('/api/delete-image', {
                    imageUrl: imageToDelete.url
                });

                const response = await deletePrismaProjectImage(projectData.id, imageID)
                // Salvando alterações no estado
                projectData.images = response.images
                setDestaques(response.images.filter((img: Investment["images"][0]) => img.label === label))

            } catch (error) {
                console.error(error)
            }
        }

        if (isDeletingImage && deletingImageID) {

            deleteImage(deletingImageID)
            setIsDeletingImage(false)
        }

    }, [isDeletingImage])

    useEffect(() => {
        if (projectData && projectData.photos) {
            const destaquesGroup = projectData.photos.find(
                (group) => group.category === label
            );

            if (destaquesGroup) {
                setDestaques(destaquesGroup.images);
            } else {
                setDestaques([]); // Define como array vazio se não encontrar
            }
            setLoading(false); //Muda o status para false, indicando que o componente não está mais no loading
        } else {
            setLoading(false); //Caso não encontre, já define o loading como false.
        }

    }, [projectData]); // Executa o efeito quando projectData mudar


    return (

        <Flex flexDir={'column'} gap={8}>

            {/* HEADER */}
            <Flex w='100%' flexDir={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'} minH={16}>

                {/* LABEL */}
                <Text fontSize={20} fontWeight={'medium'} mt={2}>
                    Fachada ({destaques.length})
                </Text>

                {/* EDIT MODE */}
                <Flex gap={4} alignItems={'center'}>

                    {editMode ?
                        <FotosDestaquesInput
                            key={"FOTOS"}
                            label={label}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            projectData={projectData}
                            setLoadingFiles={setLoadingFiles}
                        />
                        :
                        ''
                    }

                    <Button
                        onClick={() => { setEditMode(!editMode) }}
                        mt={2}
                        size={'md'}
                        _hover={editMode ? { bgColor: 'darkSide' } : { bgColor: 'redSide' }}
                        color={'lightSide'}
                        bgColor={editMode ? 'redSide' : 'darkSide'}>
                        {editMode ? 'Cancelar' : 'Editar'}
                    </Button>

                </Flex>
            </Flex>

            {/* SWIPER */}
            <Flex maxW={'100%'}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    // slidesPerView={}
                    slidesPerView={destaques.length < (slidesResponsive ?? 4) ? destaques.length : slidesResponsive}
                    navigation
                    loop
                    // pagination
                    scrollbar={{ draggable: true }}
                >
                    {destaques.map((img) => {
                        return (

                            <SwiperSlide key={img.id}>
                                <Flex
                                    key={img.id}
                                    onClick={editMode ? () => { deleteImage(img.id) } : () => { openImage(img) }}
                                    _hover={editMode ? { bgColor: 'redSide', transition: '500ms' } : { bgColor: 'white', transition: '500ms' }}
                                    position={'relative'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <Image
                                        cursor={editMode ? 'pointer' : 'grabbing'}
                                        src={`${img.url}`}
                                        h={190}
                                        w='100%'
                                        objectFit={'cover'}
                                        objectPosition={'center'}
                                        opacity={editMode ? 0.2 : ''}
                                        _hover={{ opacity: 0.2, transition: '500ms' }}
                                    />
                                    {editMode ?
                                        <Text position={'absolute'} cursor='pointer'>Clique para apagar</Text>
                                        :
                                        ''
                                    }
                                </Flex>
                            </SwiperSlide>
                        )
                    })}
                    <Flex w={0}>.</Flex>
                </Swiper>
            </Flex>

        </Flex >
    )
}