import { Button, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { deletePrismaProjectImage } from "@/app/services/deleteInvestmentImage";
import { FotosExternoInput } from "@/components/CreateProjects/Inputs/FotosExternoInput";
import axios from "axios";


interface FotosExternoProps {
    projectData: Investment
    openImage: (img: Investment["images"][0]) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>

}

export function FotosExterno({ projectData, openImage, setLoadingFiles }: FotosExternoProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [externo, setExterno] = useState<Investment["images"]>(projectData.images.filter(img => img.label === 'EXTERNO'))

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    const slidesResponsive = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3, xl: 4 })


    // DELETE IMAGE EXTERNO
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {

            try {

                const imageToDelete = externo.find((image) => image.id === imageID);

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
                setExterno(response.images.filter((img: Investment["images"][0]) => img.label === 'EXTERNO'))
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
                    Área comum ({externo.length})
                </Text>

                {/* EDIT MODE */}
                <Flex gap={4} alignItems={'center'}>

                    {editMode ?
                        <FotosExternoInput
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
                    slidesPerView={externo.length < (slidesResponsive??4) ? externo.length : slidesResponsive}
                    navigation
                    loop
                    // pagination
                    scrollbar={{ draggable: true }}
                >
                    {externo.map((img) => {
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