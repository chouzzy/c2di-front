import { Box, Flex, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Bed, FlagCheckered, RocketLaunch } from "phosphor-react";
import { useEffect, useState } from "react";
import { BiSolidBed } from "react-icons/bi";
import { LiaToiletPaperSolid, LiaToiletSolid } from "react-icons/lia";
import { PiBlueprintDuotone, PiBuildingApartmentDuotone, PiMoneyWavyDuotone, PiDoorDuotone, PiElevatorDuotone, PiRocket, PiShootingStarDuotone, PiBulldozerDuotone, PiBedDuotone, PiCarProfileDuotone, PiRulerDuotone, PiLinkDuotone } from "react-icons/pi";

interface CaracteristicasProps {
    projectData: Investment
}

export function Alvaras({ projectData }: CaracteristicasProps) {

    const colorCaracteristicas = useColorModeValue('dark.beigeSide', 'light.beigeSide')

    const [floorPlanTypesAdapted, setFloorPlanTypesAdapted] = useState(projectData.floorPlanTypes.map((floorPlan) => { return ' ' + floorPlan + ' m²' }))

    const { valorMetroQuadrado, launchDate, constructionStartDate, expectedDeliveryDate } = projectData

    const [alvarasState, setAlvarasState] = useState<Alvaras>()

    const [stepActive, setStepActive] = useState(0)

    useEffect(() => {
        const changeStepActive = () => {

            const { alvaras } = projectData

            if (alvaras) {

                setAlvarasState(alvaras)

                if (alvaras.demolicao) { setStepActive(1) }
                if (alvaras.aprovacao) { setStepActive(2) }
                if (alvaras.construcao) { setStepActive(3) }
                if (alvaras.estande) { setStepActive(4) }

            } else {
                setStepActive(0)
            }
        }
        if (projectData) {
            changeStepActive()
        }
    }, [projectData])


    return (

        <Flex w='100%' flexDir={'column'} gap={4}>

            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Alvarás </Text> </Flex>

            <Flex flexDir={'column'} gap={8}>

                <Flex h='100%' minH={[300,300,300,400,400]}>
                    <Stepper index={stepActive} orientation='vertical' height='100%'>
                        <Step key={0}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Flex alignItems={'start'} flexShrink='0' pt={1}>
                                {alvarasState?.demolicao ?
                                    <Link href={alvarasState?.demolicao?.link} target="_blank">
                                        <Flex alignItems={'strat'} gap={2}>
                                            <StepTitle>{alvarasState?.demolicao ? alvarasState.demolicao?.title : "Alvará de demolição "}</StepTitle>
                                            <PiLinkDuotone size={24} />
                                        </Flex>
                                    </Link>
                                    :
                                    <StepTitle>{alvarasState?.demolicao ? alvarasState.demolicao?.title : "Alvará de demolição "}</StepTitle>
                                }
                                {/* <StepDescription>{alvaras.demolicao.link}</StepDescription> */}
                            </Flex>

                            <StepSeparator />
                        </Step>
                        <Step key={1}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Flex alignItems={'start'} flexShrink='0' pt={1}>
                                {alvarasState?.aprovacao ?
                                    <Link href={alvarasState?.aprovacao?.link} target="_blank">
                                        <Flex alignItems={'strat'} gap={2}>
                                            <StepTitle>{alvarasState?.aprovacao ? alvarasState.aprovacao?.title : "Alvará de aprovação "}</StepTitle>
                                            <PiLinkDuotone size={24} />
                                        </Flex>
                                    </Link>
                                    :
                                    <StepTitle>{alvarasState?.aprovacao ? alvarasState.aprovacao?.title : "Alvará de aprovação "}</StepTitle>
                                }
                                {/* <StepDescription>{alvaras.aprovacao.link}</StepDescription> */}
                            </Flex>

                            <StepSeparator />
                        </Step>
                        <Step key={2}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Flex alignItems={'start'} flexShrink='0' pt={1}>
                                {alvarasState?.construcao ?
                                    <Link href={alvarasState?.construcao?.link} target="_blank">
                                        <Flex alignItems={'strat'} gap={2}>
                                            <StepTitle>{alvarasState?.construcao ? alvarasState.construcao?.title : "Alvará de construção "}</StepTitle>
                                            <PiLinkDuotone size={24} />
                                        </Flex>
                                    </Link>
                                    :
                                    <StepTitle>{alvarasState?.construcao ? alvarasState.construcao?.title : "Alvará de construção "}</StepTitle>
                                }
                                {/* <StepDescription>{alvaras.construcao.link}</StepDescription> */}
                            </Flex>

                            <StepSeparator />
                        </Step>
                        <Step key={3}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Flex alignItems={'start'} flexShrink='0' pt={1}>
                                {alvarasState?.estande ?
                                    <Link href={alvarasState?.estande?.link} target="_blank">
                                        <Flex alignItems={'strat'} gap={2}>
                                            <StepTitle>{alvarasState?.estande ? alvarasState.estande?.title : "Alvará de estande de vendas "}</StepTitle>
                                            <PiLinkDuotone size={24} />
                                        </Flex>
                                    </Link>
                                    :
                                    <StepTitle>{alvarasState?.estande ? alvarasState.estande?.title : "Alvará de estande de vendas "}</StepTitle>
                                }
                                {/* <StepDescription>{alvaras.estande.link}</StepDescription> */}
                            </Flex>

                            <StepSeparator />
                        </Step>
                    </Stepper>
                </Flex>

            </Flex>
        </Flex>
    )
}