import { Badge, Button, Flex, Image, Link, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ProjectDashboardInvestorProps {
    projectsData: Investment[]
    setPage: Dispatch<SetStateAction<number>>
    page: number
    totalPages: number
    elementsPerPage: number
}

export function ProjectDashboardInvestor({ projectsData, page, setPage, totalPages, elementsPerPage }: ProjectDashboardInvestorProps) {

    const textColor = useColorModeValue('graySide', 'dark.graySide')
    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')
    const borderCMColor = useColorModeValue('grayDivisor', 'dark.grayDivisor')

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }

    const buildingStatusDict = {
        LANCAMENTO: { name: "Lançamento", color: "green" },
        CONSTRUCAO: { name: "Em construção", color: "blue" },
        FINALIZACAO: { name: "Fase de finalização", color: "cyan" },
        FINALIZADO: { name: "Finalizado", color: "gray" },
    };

    return (
        <Flex flexDir={'column'} w='100%' gap={16} >

            {/* CARDS */}
            <Flex>
                {/* MENU COM PROJETOS */}
                <SimpleGrid columns={[1, 1, 1, 2, 2]} w='100%' gap={4}>

                    {projectsData.map((project) => {

                        const capas = project.photos.find((photoGroup) => photoGroup.category === "CAPA")

                        const projectCapa = capas?.images[0]
                        let capa = '/assets/img-not-found.png'
                        if (projectCapa) { capa = projectCapa.url }

                        return (

                            // CARD DO PROJETO
                            <Flex key={project.id} flexDir={'column'} gap={6} w={['100%', '100%', '100%', 440, 440]} mt={6} p={4} border='1px' borderColor={borderCMColor} boxShadow={'md'}>

                                {/* IMAGEM E STATUS */}
                                <Flex>
                                    <Flex w='100%' flexDir={'column'} gap={1}>
                                        <Image src={`${capa}`} h={160} w={['100%', '100%', '100%', 440, 440]} objectFit={'cover'} objectPosition={'center'} />

                                        <Flex gap={2}>
                                            <Flex
                                                w={'min'}
                                                px={2}
                                                bgColor={project.active ? 'green.400' : 'orange.200'}
                                                fontSize={'sm'}
                                                fontWeight={'semibold'}
                                                color={project.active ? 'white' : 'orange.800'}
                                                borderRadius={4}
                                            >
                                                {project.active ? <Text>Ativo</Text> : <Text>Arquivado</Text>}
                                            </Flex>
                                            <Flex>
                                                <Badge variant='solid' fontSize={'sm'} colorScheme={buildingStatusDict[project.buildingStatus].color}> {buildingStatusDict[project.buildingStatus].name} </Badge>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* DADOS DO PROJETO */}
                                <Flex flexDir={'column'} gap={[0, 0, 0, 2, 2]}>

                                    <Text fontSize={[20]} fontWeight={'semibold'}>
                                        {project.title}
                                    </Text>
                                    <Text fontSize={14} fontWeight={'normal'} color={textColor} letterSpacing={'-0.2px'}>
                                        {project.description}
                                    </Text>
                                </Flex>

                                {/* ACTION BUTTONS */}
                                <Flex justifyContent={['space-between', 'space-between', 'space-between', 'start', 'start']} gap={8}>
                                    <Link href={`/projects/${project.id}`}>
                                        <Button _hover={{ bgColor: 'graySide' }} size={['sm', 'sm', 'sm', 'md']} color={'lightSide'} bgColor={bgButtonColor} fontSize={14}>
                                            <Flex alignItems={'center'} justifyContent={'center'}>
                                                <Text>Ver projeto</Text>
                                            </Flex>
                                        </Button>
                                    </Link>
                                    <Button _hover={{ bgColor: 'graySide' }} size={['sm', 'sm', 'sm', 'md']} color={'lightSide'} bgColor={bgButtonColor} fontSize={14}>
                                        <Flex alignItems={'center'} justifyContent={'center'}>
                                            <Text>Entrar em contato</Text>
                                        </Flex>
                                    </Button>
                                </Flex>


                            </Flex>

                        )
                    })}
                </SimpleGrid>
            </Flex>

            {/* FOOTER */}
            <Flex w='100%' gap={4} >
                <Flex gap={4} w='100%' alignItems={'center'} justifyContent={'space-between'}>

                    <Button
                        onClick={previousPage}
                        _hover={{ bgColor: 'graySide', color: 'lightSide' }}
                        color={'darkSide'}
                        bgColor={'lightSide'}
                        border='1px'
                        borderColor={'grayDivisor'}
                        isDisabled={page <= 1}
                    >
                        <Flex minW={18} alignItems={'center'} justifyContent={'center'}>
                            <Text>Anterior</Text>
                        </Flex>
                    </Button>

                    <Flex>
                        <Text textAlign={'center'} fontSize={[12, 12, 12, 14, 14]}>
                            Mostrando {projectsData.length} de {totalPages} projeto(s)
                        </Text>
                    </Flex>
                    <Button
                        onClick={nextPage}
                        _hover={{ bgColor: 'graySide' }}
                        color={'lightSide'}
                        bgColor={bgButtonColor}
                        isDisabled={page >= Math.ceil(totalPages / elementsPerPage)}
                    >
                        <Flex minW={18} alignItems={'center'} justifyContent={'center'}>
                            <Text>Próximo</Text>
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}