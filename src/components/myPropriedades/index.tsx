import { Button, Flex, Image, Link, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ProjectDashboardInvestorProps {
    projectsData: Investment[]
    userInvestmentsData: UserInvestment[]
    setPage: Dispatch<SetStateAction<number>>
    page: number
    totalPages: number
    elementsPerPage: number
}

export function MyPropriedadesList({ userInvestmentsData, projectsData, page, setPage, totalPages, elementsPerPage }: ProjectDashboardInvestorProps) {

    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')
    const textColor = useColorModeValue('graySide', 'dark.graySide')

    const nextPage = async () => {
        setPage(page + 1)
    }
    const previousPage = async () => {
        setPage(page - 1)
    }


    return (
        <Flex flexDir={'column'} w='100%' gap={16} pb={20}>


            {/* PROJECT LIST */}
            <Flex flexDir={'column'} gap={2}>
                <Flex flexDir={'column'}>
                    <Text fontSize={24} fontWeight={'semibold'}>
                        Projetos investidos:
                    </Text>
                </Flex>
                {/* MENU COM PROJETOS */}
                <SimpleGrid columns={[1, 1, 2, 2, 2]} w='100%' gap={8}>

                    {projectsData.map((project) => {

                        return (

                            // CARD DO PROJETO
                            <Flex key={project.id} flexDir={'column'} gap={2} w={'100%'} borderColor={'grayDivisor'} p={4} borderRadius={8} boxShadow={'md'}>

                                {/* IMAGEM E STATUS */}
                                <Flex>
                                    <Flex w='100%' flexDir={'column'} gap={1}>
                                        <Image src={`${project.images[0].url}`} h={160} w={'100%'} objectFit={'cover'} objectPosition={'center'} />

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
                                <Flex flexDir={['column', 'column', 'column', 'column', 'row']} gap={[4,4,4,4,4]} justifyContent={'space-between'}>

                                    <Flex flexDir={'column'}>

                                        <Text fontSize={20} fontWeight={'semibold'}>
                                            {project.title}
                                        </Text>


                                        <Text fontSize={14} fontWeight={'normal'} color={textColor} letterSpacing={'-0.2px'}>
                                            {project.description}
                                        </Text>
                                    </Flex>
                                    <Link href={`/projects/${project.id}`}>
                                        <Button _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={bgButtonColor} fontSize={14} borderRadius={2}>
                                            <Flex minW={24} alignItems={'center'} justifyContent={'center'}>
                                                <Text>Ver projeto</Text>
                                            </Flex>
                                        </Button>
                                    </Link>
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
                        Mostrando {projectsData.length} de {totalPages} projeto(s)
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