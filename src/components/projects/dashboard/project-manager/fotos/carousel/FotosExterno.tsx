import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { deletePrismaProjectImage } from "@/app/services/deleteInvestmentImage";
import { FotosExternoInput } from "@/components/CreateProjects/Inputs/FotosExternoInput";


interface FotosExternoProps {
    projectData: Investment
    openImage: (img: Investment["images"][0]) => void
}

export function FotosExterno({ projectData, openImage }: FotosExternoProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [externo, setExterno] = useState<Investment["images"]>(projectData.images.filter(img => img.label === 'EXTERNO'))

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    // DELETE IMAGE EXTERNO
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

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
                    Área externa: ({externo.length})
                </Text>

                {/* EDIT MODE */}
                <Flex gap={4} alignItems={'center'}>

                    {editMode ?
                        <FotosExternoInput
                            key={"FOTOS"}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            projectData={projectData}
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
                    slidesPerView={externo.length < 4 ? externo.length : 4}
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
                                        src={`/assets/projects/${img.url}`}
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