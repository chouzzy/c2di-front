import { Button, Flex, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ProjectDashboardInvestorProps {
    projectsData: Investment[]
    setPage: Dispatch<SetStateAction<number>>
    page: number
    totalPages:number
    elementsPerPage:number
}

export function ProjectDashboardProjectManager({ projectsData, page, setPage, totalPages, elementsPerPage }: ProjectDashboardInvestorProps) {

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }

    return (
        <Flex flexDir={'column'} w='100%' gap={16} >
            <Flex>
                <SimpleGrid columns={2} w='100%'>
                    {projectsData.map((project) => {
                        return (

                            <Flex key={project.id} flexDir={'column'} gap={4} w={440} mt={6}>
                                <Flex>
                                    <Image src={project.images[0].url} h={160} w={440} objectFit={'cover'} objectPosition={'center'} />
                                </Flex>
                                <Flex flexDir={'column'} gap={2} h={16}>

                                    <Text fontSize={20} fontWeight={'semibold'}>
                                        {project.title}
                                    </Text>
                                    <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                                        {project.description}
                                    </Text>
                                </Flex>
                                <Flex>
                                </Flex>
                                <Flex justifyContent={'start'} gap={8}>
                                    <Link href={`/project-manager/projects/${project.id}`}>
                                        <Button _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} fontSize={14}>
                                            <Flex minW={24} alignItems={'center'} justifyContent={'center'}>
                                                <Text>Ver projeto</Text>
                                            </Flex>
                                        </Button>
                                    </Link>
                                    <Button _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'} fontSize={14}>
                                        <Flex minW={32} alignItems={'center'} justifyContent={'center'}>
                                            <Text>Entrar em contato</Text>
                                        </Flex>
                                    </Button>
                                </Flex>


                            </Flex>

                        )
                    })}
                </SimpleGrid>
            </Flex>
            <Flex w='100%' justifyContent={'space-between'} gap={4} >
                <Flex>
                    <Text>
                        Mostrando {page} de 38 projetos
                    </Text>
                </Flex>
                <Flex gap={4}>

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

                    <Button
                        onClick={nextPage}
                        _hover={{ bgColor: 'graySide' }}
                        color={'lightSide'}
                        bgColor={'darkSide'}
                        isDisabled={page >= Math.ceil(totalPages/elementsPerPage)}
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