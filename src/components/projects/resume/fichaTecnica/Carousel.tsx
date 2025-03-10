import React, { useState } from 'react';
import { Box, IconButton, Flex, Image, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, Spinner } from '@chakra-ui/react';
import { ArrowArcLeft, ArrowArcRight, ArrowLeft, ArrowRight } from 'phosphor-react';

interface CarouselProps {
    images: string[]; // Defina o tipo correto das suas imagens
    editMode?: boolean; // Se você precisa do modo de edição
}

export function Carousel({ images, editMode = false }: CarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (<></>)
    }

    const { isOpen, onOpen, onClose } = useDisclosure() // Adiciona o hook useDisclosure

    const [imageOnView, setImageOnView] = useState<Investment["images"][0]["url"]>()

    const openImage = (img: Investment["images"][0]["url"]) => {
        setImageOnView(img)
        onOpen()
    }
    const closeImage = () => {
        onClose()
    }


    return (
        <Flex w='100%' flexDir={'column'} gap={4}>
            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Plantas </Text> </Flex>
            <Flex position="relative" width="100%" overflow="hidden" h={400}>

                {/* Imagem atual */}
                <Image
                    onClick={() => { openImage(images[currentImageIndex]) }}
                    src={images[currentImageIndex]}
                    alt={`Imagem ${currentImageIndex + 1}`}
                    width="100%" // Ocupa toda a largura do container
                    objectFit="cover" // Ajusta a imagem para cobrir o espaço, mantendo a proporção
                    objectPosition="center"
                    cursor='pointer'
                    opacity={editMode ? 0.2 : 1}
                    transition="opacity 500ms" // Transição suave
                    _hover={{ opacity: editMode ? 0.2 : 1 }} // Efeito de hover

                // Outras opções que você pode querer adicionar, para melhorar a experiência do usuário:
                // draggable={false} // Impede que a imagem seja arrastada (opcional)
                // userSelect="none" // Impede que a imagem seja selecionada (opcional)
                // Outras propriedades de acessibilidade
                />

                {/* Botões de navegação (opcional) */}
                {images.length > 1 && (
                    <>
                        <IconButton
                            _hover={{ bgColor: 'redSide' }}
                            bgColor={'graySide'}
                            border={'1px solid white'}
                            boxShadow={'lg'}
                            aria-label="Imagem anterior"
                            icon={<ArrowLeft />}
                            position="absolute"
                            left="1rem" // Posiciona à esquerda
                            top="50%"   // Centraliza verticalmente
                            transform="translateY(-50%)"
                            onClick={prevImage}
                            zIndex={2} // Garante que os botões fiquem acima da imagem
                            variant="ghost"
                            color='white'
                            isDisabled={!editMode && images.length <= 1} // Desabilita se não houver mais de uma imagem.
                        />
                        <IconButton
                            _hover={{ bgColor: 'redSide' }}
                            bgColor={'graySide'}
                            border={'1px solid white'}
                            boxShadow={'lg'}
                            aria-label="Próxima imagem"
                            icon={<ArrowRight />}
                            position="absolute"
                            right="1rem" // Posiciona à direita
                            top="50%"
                            transform="translateY(-50%)"
                            onClick={nextImage}
                            zIndex={2}
                            variant="ghost"
                            color='white'
                            isDisabled={!editMode && images.length <= 1}
                        />
                    </>
                )}
            </Flex>

           


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
                            <Spinner boxSize={32} />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal >
        </Flex>
    );
};

export default Carousel;