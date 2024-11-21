import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { deletePrismaProjectImage } from "@/app/api/deleteInvestmentImage/route";
import { FotosInternoInput } from "@/components/CreateProjects/Inputs/FotosInternoInput";


interface FotosDestaquesProps {
    projectData: Investment
    openImage: (img: Investment["images"][0]) => void
}

export function FotosInterno({ projectData, openImage }: FotosDestaquesProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [interno, setInterno] = useState<Investment["images"]>(projectData.images.filter(img => img.label === 'INTERNO'))

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    // DELETE IMAGE INTERNO
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

                const response = await deletePrismaProjectImage(projectData.id, imageID)
                // Salvando alterações no estado
                projectData.images = response.images
                setInterno(response.images.filter((img: Investment["images"][0]) => img.label === 'INTERNO'))

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
                    Área interna ({interno.length})
                </Text>

            </Flex>

            {/* SWIPER */}
            <Flex maxW={'100%'}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    loop
                    // pagination
                    scrollbar={{ draggable: true }}
                >
                    {interno.map((img) => {
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