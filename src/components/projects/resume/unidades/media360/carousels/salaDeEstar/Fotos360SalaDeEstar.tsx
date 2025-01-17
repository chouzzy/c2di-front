import { Button, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import { changePrismaProjectFotosGerais } from "@/app/services/changeFotosGerais";
import { Fotos360SalaDeEstarInput } from "./Fotos360SalaDeEstarInput";


interface FotosGeraisProps {
    userData: User
    projectData: Investment
    openImage: (img: Investment["apartamentTypes"][0]["fotos"][0]) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
    unidadeInView?: number
    setFotoType: Dispatch<SetStateAction<string>>
}


export function Fotos360SalaDeEstar({ userData, projectData, openImage, setLoadingFiles, unidadeInView, setFotoType }: FotosGeraisProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [destaques, setDestaques] = useState(unidadeInView ? projectData.apartamentTypes[unidadeInView].media360.salaDeEstar : projectData.apartamentTypes[0].media360.salaDeEstar)

    useEffect(() => {

        if (unidadeInView || unidadeInView == 0) {
            setDestaques(projectData.apartamentTypes[unidadeInView].media360.salaDeEstar)
        }

    }, [unidadeInView])

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    const slidesResponsive = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3, xl: 4 })

    // DELETE IMAGE DESTAQUES
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

                if (!unidadeInView && unidadeInView != 0) {
                    console.error('Unidade selecionada inválida')
                    return
                }
                const imageToDelete = destaques.find((image) => image === imageID);

                if (!imageToDelete) {
                    console.warn(`Imagem com ID ${imageID} não encontrada no array destaques`);
                    return;
                }

                const responseImgDeleted = await axios.post('/api/delete-image', {
                    imageUrl: decodeURIComponent(imageToDelete)
                });


                // Encontra o índice da foto a ser removida no array fotos
                const fotoIndex = projectData.apartamentTypes[unidadeInView].media360.salaDeEstar.indexOf(imageToDelete);

                // Remove a foto do array
                if (fotoIndex > -1) {
                    projectData.apartamentTypes[unidadeInView].media360.salaDeEstar.splice(fotoIndex, 1);
                }

                const response = await changePrismaProjectFotosGerais(projectData.id, projectData)
                const investmentUpdated: Investment = response.data.investment
                // Salvando alterações no estado
                projectData.apartamentTypes[unidadeInView] = investmentUpdated.apartamentTypes[unidadeInView]
                setDestaques(projectData.apartamentTypes[unidadeInView].media360.salaDeEstar)

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

            {unidadeInView || unidadeInView === 0 ?
                <>
                    {/* HEADER */}
                    < Flex w='100%' flexDir={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'} minH={16}>

                        {/* LABEL */}
                        <Text fontSize={20} fontWeight={'medium'} mt={2}>
                            Sala de estar ({destaques.length})
                        </Text>

                        {/* EDIT MODE */}
                        <Flex gap={4} alignItems={'center'}>

                            {editMode ?
                                <Fotos360SalaDeEstarInput
                                    key={"FOTOS"}
                                    allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                                    accept="image/*"
                                    projectData={projectData}
                                    setLoadingFiles={setLoadingFiles}
                                    unidadeInView={unidadeInView}
                                />
                                :
                                ''
                            }


                            {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?

                                <Button
                                    onClick={() => { setEditMode(!editMode) }}
                                    mt={2}
                                    size={'md'}
                                    _hover={editMode ? { bgColor: 'darkSide' } : { bgColor: 'redSide' }}
                                    color={'lightSide'}
                                    bgColor={editMode ? 'redSide' : 'darkSide'}>
                                    {editMode ? 'Cancelar' : 'Editar'}
                                </Button>
                                : ''}

                        </Flex>
                    </Flex>
                </>
                : ''}

            {/* SWIPER */}
            <Flex maxW={'100%'}>
                {unidadeInView || unidadeInView === 0 ?

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
                        {destaques.map((img, index) => {
                            return (

                                <SwiperSlide key={img + index}>
                                    <Flex
                                        key={img + index}
                                        onClick={editMode ? () => { deleteImage(img) } : () => { openImage(img); setFotoType('3d') }}
                                        _hover={editMode ? { bgColor: 'redSide', transition: '500ms' } : { bgColor: 'white', transition: '500ms' }}
                                        position={'relative'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <Image
                                            cursor={editMode ? 'pointer' : 'grabbing'}
                                            src={`${img}`}
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
                    : ''}
            </Flex>
            <Flex>

            </Flex>

        </Flex >
    )
}