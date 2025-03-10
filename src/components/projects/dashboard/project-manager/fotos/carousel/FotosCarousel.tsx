import { Button, Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Text, useBreakpointValue, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Scrollbar, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { deletePrismaProjectImage } from "@/app/services/deleteInvestmentImage";
import axios from "axios";
import { FotosCarouselInput } from "@/components/CreateProjects/Inputs/FotosCarousel";
import { capitalizeFirstLetter } from "@/components/users/utils";
import { changePrismaProjectPhotos } from "@/app/services/changePhotos";
import { PiCheckFatDuotone } from "react-icons/pi";


interface FotosCarouselProps {
    projectData: Investment
    openImage: (img: Photos) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
    label: PhotosGroup["category"]
    setProjectData: Dispatch<SetStateAction<Investment | null>>
    userData: User
}

export function FotosCarousel({ projectData, openImage, setLoadingFiles, label, setProjectData, userData }: FotosCarouselProps) {

    const [editMode, setEditMode] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [deletingImageID, setDeletingImageID] = useState<string>()

    const [destaques, setDestaques] = useState<Photos[]>([]); // Inicializa com array vazio
    const [loading, setLoading] = useState(true); // Estado de loading. Começa true.

    const [newPhotoTitle, setNewPhotoTitle] = useState("")
    const [uploadPhotoTrigger, setUploadPhotoTrigger] = useState<boolean>(false)

    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    const deleteImage = (imageID: Investment["images"][0]["id"]) => {
        setDeletingImageID(imageID)
        setIsDeletingImage(true)
    }

    const editPhotoName = (imageID: Photos["id"]) => {

        const updatedDestaques = destaques.map((img) => {
            if (img.id === imageID) {
                // Cria um *NOVO* objeto, copiando as propriedades existentes e atualizando o title
                return { ...img, title: newPhotoTitle };
            }
            return img; // Retorna o objeto original se o ID não corresponder
        });

        // Agora, atualize o estado com o *novo* array:
        setDestaques(updatedDestaques);

        const groupIndex = projectData.photos.findIndex(
            (group) => group.category === label // Usa a variável 'label'
        );
        projectData.photos[groupIndex]

        const updatedPhotos = projectData.photos.map((group, index) => {
            if (index === groupIndex) {
                // Atualiza *APENAS* o grupo correto.
                return { ...group, images: updatedDestaques }; // Substitui o array 'images'
            }
            return group; // Mantém os outros grupos inalterados
        });

        // 3. Criar um *NOVO* objeto projectData.
        const updatedProjectData = { ...projectData, photos: updatedPhotos };

        setProjectData(updatedProjectData)

        setUploadPhotoTrigger(true)
    }

    const slidesResponsive = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3, xl: 3 })
    const bgButtonColor = useColorModeValue("darkSide", "graySide")

    // DELETE IMAGE GROUP
    useEffect(() => {

        const deleteImage = async (imageID: Investment["images"][0]["id"]) => {
            try {

                setLoading(true)

                const imageToDelete = destaques.find((image) => image.id === imageID);

                if (!imageToDelete) {
                    console.warn(`Imagem com ID ${imageID} não encontrada no array destaques`);
                    return;
                }

                const responseImgDeleted = await axios.post('/api/delete-image', {
                    imageUrl: imageToDelete.url
                });

                const investmentUpdated = await deletePrismaProjectImage(projectData.id, imageID)
                setProjectData(investmentUpdated)

                setLoading(false)


            } catch (error) {
                console.error(error)
            }
        }

        if (isDeletingImage && deletingImageID) {

            deleteImage(deletingImageID)
            setIsDeletingImage(false)
        }

    }, [isDeletingImage])


    // GET IMAGE GROUP
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

    // UPDATE PHOTO NAME
    useEffect(() => {

        const uploadPhotoName = async () => {
            try {

                await changePrismaProjectPhotos(projectData.id, projectData)
                setUploadPhotoTrigger(false)

            } catch (error) {
                console.error(error)
            }
        }

        if (uploadPhotoTrigger) {
            uploadPhotoName()
        }
    }, [uploadPhotoTrigger])

    return (

        <Flex flexDir={'column'} gap={8}>

            {/* HEADER */}
            <Flex w='100%' flexDir={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'} minH={16}>

                {/* LABEL */}
                <Text fontSize={20} fontWeight={'medium'} mt={2}>
                    {capitalizeFirstLetter(label)} ({destaques.length})
                </Text>

                {/* EDIT MODE */}
                <Flex gap={4} alignItems={'center'}>

                    {editMode ?
                        <FotosCarouselInput
                            key={"FOTOS"}
                            label={label}
                            allowedTypes={['image/png', 'image/jpeg', 'image/jpg']}
                            accept="image/*"
                            projectData={projectData}
                            setLoadingFiles={setLoadingFiles}
                            setProjectData={setProjectData}
                        />
                        :
                        ''
                    }

                    {userData.role === 'PROJECT_MANAGER' || userData.role === 'ADMINISTRATOR' ?

                        <Button
                            onClick={() => { setEditMode(!editMode) }}
                            mt={2}
                            size={'md'}
                            px={12}
                            _hover={editMode ? { bgColor: bgButtonColor } : { bgColor: 'redSide' }}
                            color={'lightSide'}
                            bgColor={editMode ? 'graySide' : bgButtonColor}>
                            {editMode ?
                                loading ?
                                    <Flex gap={2} alignItems={'center'} fontSize={'xs'}>
                                        <Text> Apagando imagem...</Text>
                                        <Spinner boxSize={2} mx='auto' />
                                    </Flex>
                                    :
                                    'Retornar'
                                :
                                'Editar'}
                        </Button>
                        : ''
                    }

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
                                <Flex flexDir={'column'} gap={2}>

                                    <Flex
                                        key={img.id}
                                        onClick={editMode ? () => { deleteImage(img.id) } : () => { openImage(img) }}
                                        _hover={editMode ? { bgColor: 'redSide', transition: '500ms' } : { bgColor: 'white', transition: '500ms' }}
                                        position={'relative'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        flexDir={'column'}
                                        gap={2}
                                        py={2}
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
                                        <Flex>

                                            <Text fontSize={'sm'}> {img.title} </Text>
                                        </Flex>
                                        {editMode ?


                                            <Text position={'absolute'} cursor='pointer'>Clique para apagar</Text>
                                            :
                                            ''
                                        }
                                    </Flex>

                                    {editMode ?
                                        <Flex>
                                            <InputGroup size='md'>
                                                <Input
                                                    type='text'
                                                    defaultValue={img.title}
                                                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button
                                                        h='1.75rem'
                                                        mr={2}
                                                        size='sm'
                                                        bgColor={bgButtonColor}
                                                        color={'lightSide'}
                                                        _hover={{ bgColor: 'green.400' }}
                                                        onClick={() => editPhotoName(img.id)}
                                                    >
                                                        Alterar
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Flex>
                                        : ''
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