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
    openImage: (img: Investment["images"][0]) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
}

export function FotosDestaques({ projectData, openImage, setLoadingFiles }: FotosDestaquesProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [destaques, setDestaques] = useState<Investment["images"]>(projectData.images.filter(img => img.label === 'DESTAQUES'))

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
                setDestaques(response.images.filter((img: Investment["images"][0]) => img.label === 'DESTAQUES'))

            } catch (error) {
                console.error(error)
            }
        }

        if (isDeletingImage && deletingImageID) {

            deleteImage(deletingImageID)
            setIsDeletingImage(false)
        }

    }, [isDeletingImage])





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
            <Flex>

            </Flex>

        </Flex>
    )
}