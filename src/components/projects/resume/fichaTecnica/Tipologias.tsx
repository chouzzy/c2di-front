import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Bed, FlagCheckered, RocketLaunch } from "phosphor-react";
import { useState } from "react";
import { BiSolidBed } from "react-icons/bi";
import { LiaToiletPaperSolid, LiaToiletSolid } from "react-icons/lia";
import { PiBlueprintDuotone, PiBuildingApartmentDuotone, PiMoneyWavyDuotone, PiDoorDuotone, PiElevatorDuotone, PiRocket, PiShootingStarDuotone, PiBulldozerDuotone, PiBedDuotone, PiCarProfileDuotone, PiRulerDuotone } from "react-icons/pi";

interface CaracteristicasProps {
    projectData: Investment
}

export function Tipologias({ projectData }: CaracteristicasProps) {

    const colorCaracteristicas = useColorModeValue('dark.beigeSide', 'light.beigeSide')

    const [floorPlanTypesAdapted, setFloorPlanTypesAdapted] = useState(projectData.floorPlanTypes.map((floorPlan) => { return ' ' + floorPlan + ' m²' }))

    const { valorMetroQuadrado, launchDate, constructionStartDate, expectedDeliveryDate } = projectData

    const projectTypesDict = {
        RESIDENCIAL_MULTIFAMILIAR: "Residencial Multifamiliar",
        RESIDENCIAL_VERTICAL: "Residencial vertical",
        COMERCIAL_GERAL: "Comercial geral",
        MISTO: "Misto",
    };

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

            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Tipologias </Text> </Flex>

            <Flex flexDir={'column'} gap={8}>

                {projectData.tipologies.map((tipo) => {
                    return (
                        <Flex key={tipo.id} cursor={'pointer'} color={colorCaracteristicas} fontWeight={'semibold'} gap={2} flexDir={'column'}  onClick={() => openImage(tipo.image)} 
                        _hover={{color:'blue.500', transition:'300ms', pl:2}}>
                            <Flex gap={2}>
                                <PiBlueprintDuotone size={24} />
                                <Text>{tipo.name}</Text>
                            </Flex>
                            <Flex gap={4}>
                                {tipo.rooms ?
                                    <Flex gap={1}>
                                        <PiBedDuotone size={24} />
                                        <Text>{tipo.rooms}</Text>
                                    </Flex>
                                    : ''}
                                {tipo.suits ?

                                    <Flex gap={1}>
                                        <BiSolidBed size={24} />
                                        <Text>{tipo.suits}</Text>
                                    </Flex>
                                    : ''}
                                {tipo.bathrooms ?

                                    <Flex gap={1}>
                                        <LiaToiletSolid size={24} />
                                        <Text>{tipo.bathrooms}</Text>
                                    </Flex>
                                    : ''}
                                {tipo.parkingSpaces ?

                                    <Flex gap={1}>
                                        <PiCarProfileDuotone size={24} />
                                        <Text>{tipo.parkingSpaces}</Text>
                                    </Flex>
                                    : ''}
                                {tipo.area ?

                                    <Flex gap={1}>
                                        <PiRulerDuotone size={24} />
                                        <Text>{tipo.area}m²</Text>
                                    </Flex>
                                    : ''}
                            </Flex>

                            <Flex gap={2}>
                                {tipo.tags.map((tag, id) => {
                                    return (
                                        <Tag key={tag + id} size={'sm'} variant='subtle' colorScheme='blue'>
                                            <TagLabel>{tag}</TagLabel>
                                        </Tag>
                                    )
                                })}
                            </Flex>

                        </Flex>
                    )
                })}

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
        </Flex>
    )
}