import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FlagCheckered, RocketLaunch } from "phosphor-react";
import { useState } from "react";
import { PiBlueprintDuotone, PiBuildingApartmentDuotone, PiMoneyWavyDuotone, PiDoorDuotone, PiElevatorDuotone, PiRocket, PiShootingStarDuotone, PiBulldozerDuotone } from "react-icons/pi";

interface CaracteristicasProps {
    projectData: Investment
}

export function Caracteristicas({ projectData }: CaracteristicasProps) {

    const colorCaracteristicas = useColorModeValue('dark.beigeSide', 'light.beigeSide')

    const [floorPlanTypesAdapted, setFloorPlanTypesAdapted] = useState(projectData.floorPlanTypes.map((floorPlan) => { return ' ' + floorPlan + ' m²' }))

    const { valorMetroQuadrado, launchDate, constructionStartDate, expectedDeliveryDate } = projectData

    const projectTypesDict = {
        RESIDENCIAL_MULTIFAMILIAR: "Residencial Multifamiliar",
        RESIDENCIAL_VERTICAL: "Residencial vertical",
        COMERCIAL_GERAL: "Comercial geral",
        MISTO: "Misto",
    };


    return (

        <Flex w='100%' flexDir={'column'} justifyContent={'space-between'} gap={4}>

            <Flex> <Text fontWeight={'semibold'} fontSize={'2xl'}> Características </Text> </Flex>

            <Flex flexDir={'column'} gap={2}>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <PiBlueprintDuotone size={24} />
                    <Text>{projectTypesDict[projectData.projectType]}</Text>
                </Flex>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <PiMoneyWavyDuotone size={24} />
                    <Text>{valorMetroQuadrado && valorMetroQuadrado.length > 0 ? `R$${valorMetroQuadrado[valorMetroQuadrado.length - 1].valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} /m²` : "m²"}</Text>
                </Flex>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <PiDoorDuotone size={24} />
                    <Text>{projectData.totalUnits} unidades, {projectData.unitsPerFloor} por pavimento</Text>
                </Flex>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <PiElevatorDuotone size={24} />
                    <Text>{projectData.numberOfFloors} pavimentos</Text>
                </Flex>
                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <PiBulldozerDuotone size={24} />
                    <Text>Início da obra: {new Date(constructionStartDate).toLocaleDateString('pt-BR')}</Text>
                </Flex>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <RocketLaunch size={24} weight="duotone" />
                    <Text>Data de lançamento: {new Date(launchDate).toLocaleDateString('pt-BR')}</Text>
                </Flex>

                <Flex color={colorCaracteristicas} fontWeight={'semibold'} gap={2}>
                    <FlagCheckered size={24} weight="fill" />
                    <Text>Data prevista de entrega: {new Date(expectedDeliveryDate).toLocaleDateString('pt-BR')}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}