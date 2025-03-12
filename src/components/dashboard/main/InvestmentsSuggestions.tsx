import { getProjectList } from "@/app/services/getProjectList"
import { Flex, Button, Link, Text, useBreakpointValue, Image, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"


interface InvestmentsSuggestionsProps {
    projectsData: Investment[]
}
export function InvestmentsSuggestions({ projectsData }: InvestmentsSuggestionsProps) {

    const textColor = useColorModeValue('graySide', 'dark.graySide')
    const bgButtonColor = useColorModeValue('darkSide', 'dark.lightSide')

    const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false })

    const [suggestions, setSuggestions] = useState<Investment[]>([])

    useEffect(() => {

        const getInvestmentsComplete = async () => {
            try {


                const projectsCompleteList = getProjectList({ page: '0', pageRange: '999', active: true })

                // 1. Criar um Set com os IDs dos investimentos que o usuário já possui
                const userInvestmentIds = new Set(
                    projectsData.map((investment) => investment.id)
                );

                // 2. Filtrar a lista completa de investimentos
                const filteredProjects = (await projectsCompleteList).filter(
                    (project) => !userInvestmentIds.has(project.id)
                );

                setSuggestions(filteredProjects)

            } catch (error) {
                console.error('Erro ao buscar os investimentos:', error)
            }
        }

        getInvestmentsComplete()
    }, [])

    return (
        <Flex flexDir={'column'} gap={4}>
            <Link href="/myInvestments" _hover={{ color: 'redSide' }}>
                <Flex align={'center'} gap={2}>
                    <Text fontSize={24} fontWeight={'semibold'}>
                        Sugestões de investimentos
                    </Text>
                    <IoIosArrowForward size={24} />
                </Flex>
            </Link>

            {/* MENU COM PROJETOS */}
            <Flex w='100%' justifyContent={'space-between'} gap={4}>

                {suggestions.map((project, index) => {


                    if (index > 2) {
                        return
                    }
                    if (isMobile && index > 0) {
                        return
                    }

                    
                    const capas = project.photos.find((photoGroup) => photoGroup.category === "CAPA")

                    const projectCapa = capas?.images[0]
                    let capa = '/assets/img-not-found.png'
                    if (projectCapa) { capa = projectCapa.url }

                    return (

                        // CARD DO PROJETO
                        <Flex key={project.id} flexDir={'column'} gap={2} justifyContent={'space-between'} w='100%'>

                            <Flex flexDir={'column'} gap={2}>

                                {/* IMAGEM E STATUS */}
                                <Flex>
                                    <Flex w='100%' flexDir={'column'} gap={1}>
                                        <Image src={`${capa}`} h={120} w={320} objectFit={'cover'} objectPosition={'center'} />

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
                                <Flex flexDir={'column'}>

                                    <Text fontSize={20} fontWeight={'semibold'}>
                                        {project.title}
                                    </Text>
                                    <Text fontSize={14} fontWeight={'normal'} color={textColor} letterSpacing={'-0.2px'}>
                                        {project.description}
                                    </Text>
                                </Flex>
                            </Flex>

                            {/* ACTION BUTTONS */}
                            <Flex justifyContent={'start'} gap={8}>
                                <Link href={`/projects/${project.id}`}>
                                    <Button size={'sm'} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={bgButtonColor}>
                                        <Flex alignItems={'center'} justifyContent={'center'}>
                                            <Text>Ver projeto</Text>
                                        </Flex>
                                    </Button>
                                </Link>
                            </Flex>


                        </Flex>

                    )
                })}
                <Flex border={'1px'} color={'lightSide'} borderColor={'lightSide'} bgColor={'grayCardSide'}>

                    <Link href="/projects" _hover={{ color: 'grayDivisor', bgColor: 'grayHoverSide' }} h='100%'>
                        <Flex h='100%' alignItems={'center'} justifyContent={'center'} >
                            <Flex> <MdKeyboardDoubleArrowRight size={40} /> </Flex>
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    )
}