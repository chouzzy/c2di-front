import { Button, Flex, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ProjectDashboardInvestorProps {
    projectsData: Investment[]
    setPage: Dispatch<SetStateAction<number>>
    page: number
    totalPages: number
    elementsPerPage: number
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
                {/* MENU COM PROJETOS */}
                <SimpleGrid columns={2} w='100%'>

                    {projectsData.map((project) => {

                        console.log(Math.ceil(totalPages / elementsPerPage))


                        return (

                            // CARD DO PROJETO
                            <Flex key={project.id} flexDir={'column'} gap={4} w={440} mt={6}>

                                {/* IMAGEM E STATUS */}
                                <Flex>
                                    <Flex w='100%' flexDir={'column'} gap={1}>
                                        <Image src={`/assets/projects/${project.images[0].url}`} h={160} w={440} objectFit={'cover'} objectPosition={'center'} />

                                        <Flex
                                            w={'min'}
                                            px={2}
                                            bgColor={project.active ? 'green.400' : 'orange.200'}
                                            fontSize={'sm'}
                                            fontWeight={'semibold'}
                                            color={project.active ? 'green.800' : 'orange.800'}
                                            borderRadius={4}
                                        >
                                            {project.active ? <Text>Ativo</Text> : <Text>Arquivado</Text>}
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* DADOS DO PROJETO */}
                                <Flex flexDir={'column'} gap={2} h={16}>

                                    <Text fontSize={20} fontWeight={'semibold'}>
                                        {project.title}
                                    </Text>
                                    <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                                        {project.description}
                                    </Text>
                                </Flex>

                                {/* ACTION BUTTONS */}
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

            {/* FOOTER */}
            <Flex w='100%' justifyContent={'space-between'} gap={4} >
                <Flex>
                    <Text>
                        Total de {projectsData.length} projeto(s)
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
                        isDisabled={page>= Math.ceil(totalPages / elementsPerPage)}
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