import { StaticProject } from '@/components/users/StaticProject';
import { Flex } from '@chakra-ui/react';


interface ProjectDataProps {
    projectData: Investment
}

export function FichaTecnica({ projectData }: ProjectDataProps) {

    return (


        <Flex w='100%' flexDir={'column'} py={8} gap={8}>

            {/* Title */}
            <Flex> <StaticProject type='Nome do empreendimento' data={projectData.title} /> </Flex>


            {/* Dates */}
            <Flex gap={12} w='100%'>
                <StaticProject type='Data de início da obra' data={new Date(projectData.constructionStartDate).toLocaleDateString("pt-br")} />
                <StaticProject type='Previsão de entrega da obra' data={new Date(projectData.expectedDeliveryDate).toLocaleDateString("pt-br")} />
                <StaticProject type='Previsão de lançamento' data={new Date(projectData.launchDate).toLocaleDateString("pt-br")} />
            </Flex>

            {/* Tipo e nome da construtora */}
            <Flex gap={12} w='100%'>
                <StaticProject type='Tipo do projeto' data={projectData.projectType} />
                <StaticProject type='Nome da construtora' data={projectData.companyName} />
                <StaticProject type='Total de unidades' data={String(projectData.totalUnits)} />
                <StaticProject type='Número de pavimentos' data={String(projectData.numberOfFloors)} />
            </Flex>

            {/* Total de unidades e pavimentos */}
            <Flex gap={12} w='100%'>

            </Flex>

            {/* Unidade de pavimento e tipologia de planta */}
            <Flex gap={12} w='100%'>
                <StaticProject type='Tipologia das plantas' data={String(projectData.floorPlanTypes)} />
                <StaticProject type='Unidades por pavimento' data={String(projectData.unitsPerFloor)} />
            </Flex>

        </Flex>
    )
}