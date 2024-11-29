import { FotosMedia360Input } from "@/components/CreateProjects/Inputs/FotosMedia360Input";
import { Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deletePrismaProjectImage } from "@/app/services/deleteInvestmentImage";
import { BsBadgeVrFill, BsHeadsetVr } from "react-icons/bs";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { PiGoogleCardboardLogoFill } from "react-icons/pi";
import { Md360 } from "react-icons/md";
import { TbView360Number } from "react-icons/tb";




interface FotosMedia360Props {
    projectData: Investment
    openImage: (img: Investment["images"][0]) => void
}

export function FotosMedia360({ projectData, openImage }: FotosMedia360Props) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [media360, setMedia360] = useState<Investment["images"]>(projectData.images.filter(img => img.label === 'PANORAMICAS'))

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }


    // DELETE IMAGE PANORAMICAS
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

                const response = await deletePrismaProjectImage(projectData.id, imageID)
                // Salvando alterações no estado
                projectData.images = response.images
                setMedia360(response.images.filter((img: Investment["images"][0]) => img.label === 'PANORAMICAS'))

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
                <Flex fontSize={20} fontWeight={'medium'} mt={2} alignItems={'center'} gap={2}>
                    <Flex alignItems={'center'} gap={1}>Fotos 360º<BsBadgeVrFill size={20} /></Flex>  ({media360.length})
                </Flex>

                {/* EDIT MODE */}
                <Flex gap={4} alignItems={'center'}>

                    {editMode ?
                        <FotosMedia360Input
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

            {/* 360 IMAGES */}
            <Flex maxW={'100%'} gap={2}>
                <SimpleGrid columns={2} gap={2} w='100%'>
                    {media360.map((img) => {
                        return (
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
                        )
                    })}
                </SimpleGrid>
            </Flex>

        </Flex>
    )
}