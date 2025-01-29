import { Flex, Button, Link, Text, useBreakpointValue, Image } from "@chakra-ui/react"
import { IoIosArrowForward } from "react-icons/io"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"


interface MyInvestmentsResumeProps {
    projectsData:Investment[]
}
export function MyInvestmentsResume({projectsData}: MyInvestmentsResumeProps) {

    const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false, xl: false })

    return (
        <Flex flexDir={'column'} gap={4}>
            <Link href="/myInvestments" _hover={{ color: 'redSide' }}>
                <Flex align={'center'} gap={2}>
                    <Text fontSize={24} fontWeight={'semibold'}>
                        Meus investimentos
                    </Text>
                    <IoIosArrowForward size={24} />
                </Flex>
            </Link>

            {/* MENU COM PROJETOS */}
            <Flex w='100%' justifyContent={'space-between'} gap={4}>

                {projectsData.map((project, index) => {


                    if (index > 2) {
                        return
                    }
                    if (isMobile && index > 0) {
                        return
                    }
                    return (

                        // CARD DO PROJETO
                        <Flex key={project.id} flexDir={'column'} gap={2}>

                            {/* IMAGEM E STATUS */}
                            <Flex>
                                <Flex w='100%' flexDir={'column'} gap={1}>
                                    <Image src={`${project.images[0].url}`} h={120} w={320} objectFit={'cover'} objectPosition={'center'} />

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
                                <Text fontSize={14} fontWeight={'normal'} color='graySide' letterSpacing={'-0.2px'}>
                                    {project.description}
                                </Text>
                            </Flex>

                            {/* ACTION BUTTONS */}
                            <Flex justifyContent={'start'} gap={8}>
                                <Link href={`/projects/${project.id}`}>
                                    <Button size={'sm'} _hover={{ bgColor: 'graySide' }} color={'lightSide'} bgColor={'darkSide'}>
                                        <Flex alignItems={'center'} justifyContent={'center'}>
                                            <Text>Ver projeto</Text>
                                        </Flex>
                                    </Button>
                                </Link>
                            </Flex>


                        </Flex>

                    )
                })}
                <Flex border={'1px'} borderColor={'grayDivisor'} bgColor={'grayHoverSide'}>

                    <Link href="/myInvestments" _hover={{ color: 'lightSide', bgColor: 'grayCardSide' }} h='100%'>
                        <Flex h='100%' alignItems={'center'} justifyContent={'center'} >
                            <Flex> <MdKeyboardDoubleArrowRight size={40} /> </Flex>
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    )
}