import { Button, Flex, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip, Bar, BarChart, Legend, Pie, PieChart, Cell } from "recharts";
import { data, data01, data02 } from "./data/dashData";
import { IoIosArrowForward, IoIosTrendingUp } from "react-icons/io";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


interface InvestorDashboardProps {
    projectsData: Investment[]
}

export function MainInvestorDashboard({ projectsData }: InvestorDashboardProps) {

    return (
        <Flex w='100%'>
            <Flex w='100%' flexDir={'column'} gap={16} pb={48}>

                {/* PRMEIRA LINHA */}
                <Flex justifyContent={'space-between'} w='100%'>

                    {/* GRAFICO 1 */}
                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <AreaChart
                                width={620}
                                height={272}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis hide />
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#0F172A" fill="#0F172A" />
                                <Area type="monotone" dataKey="pv" stroke="#0F172A" fill="#475569" />
                            </AreaChart>
                        </Flex>
                    </Flex>

                    {/* GRAFICO 2 */}
                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <BarChart width={360} height={300} data={data} barGap={20}>
                                <XAxis dataKey="etapa" />
                                <YAxis type='number' hide />
                                <Tooltip />
                                <Legend />
                                <Bar radius={2} barSize={64} dataKey="pv" fill="#64748B" activeBar={{ stroke: 'black', strokeWidth: 2, }} />
                                <Bar radius={2} barSize={64} dataKey="uv" fill="#46cb18" activeBar={{ stroke: 'black', strokeWidth: 2, }} />
                            </BarChart>
                        </Flex>
                    </Flex>

                </Flex>

                {/* SEGUNDA LINHA */}
                <Flex justifyContent={'space-between'} w='100%' alignItems={'start'}>

                    {/* GRAFICO DE BARRAS */}
                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <BarChart width={320} height={260} data={data} barGap={20}>
                                <XAxis dataKey="etapa" />
                                <YAxis type='number' hide />
                                <Tooltip />
                                <Legend />
                                <Bar radius={2} barSize={20} dataKey="amt" fill="#64748Baa" activeBar={{ stroke: 'black', strokeWidth: 2, }} />
                            </BarChart>
                        </Flex>
                    </Flex>

                    {/* GRAFICO DE PIZZA */}
                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <PieChart width={260} height={200}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    fill="#8884d8"
                                    activeShape={{ fill: '#46cb18bb' }}
                                    label
                                >
                                    {data01.map((data) => {
                                        return (
                                            <Cell key={data.name} fill={data.color} />
                                        )
                                    })}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </Flex>
                    </Flex>

                    {/* CARDS */}
                    <Flex flexDir={'column'} gap={4} minW={360} color={'lightSide'}>

                        {/* CARD 1 */}
                        <Flex flexDir={'column'} gap={4} w='100%' bgColor={'grayCardSide'} px={8} py={4} borderRadius={12}>

                            <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                                <Flex fontSize={12}>Dado 1</Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Flex fontSize={22} fontWeight={'medium'} letterSpacing={2} color={'green.300'}> <Text> R$7.265,33 </Text></Flex>
                                    <Flex fontSize={14} alignItems={'center'} color={'green.300'}> <Text> +11.01% </Text> <IoIosTrendingUp /> </Flex>
                                </Flex>

                            </Flex>

                            <Flex>
                                <Link href='/projects'>
                                    <Flex alignItems={'center'}>
                                        <Text>
                                            Investir
                                        </Text>
                                        <Flex>
                                            <IoIosArrowForward />
                                        </Flex>
                                    </Flex>
                                </Link>
                            </Flex>

                        </Flex>

                        {/* CARD 2 */}
                        <Flex flexDir={'column'} gap={4} w='100%' bgColor={'grayCardSide'} px={8} py={4} borderRadius={12}>

                            <Flex flexDir={'column'} justifyContent={'space-between'} gap={4}>

                                <Flex fontSize={12}>Dado 1</Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Flex fontSize={26} fontWeight={'medium'} letterSpacing={2} color={'green.300'}> <Text> R$24.265,07 </Text></Flex>
                                    <Flex fontSize={14} alignItems={'center'} color={'green.300'}> <Text> +24.16% </Text> <IoIosTrendingUp /> </Flex>
                                </Flex>

                            </Flex>

                            <Flex>
                                <Link href='myInvestments'>
                                    <Flex alignItems={'center'}>
                                        <Text>
                                            Ver meus investimentos
                                        </Text>
                                        <Flex>
                                            <IoIosArrowForward />
                                        </Flex>
                                    </Flex>
                                </Link>
                            </Flex>

                        </Flex>

                    </Flex>

                </Flex>

                {/* TERCEIRA LINHA */}
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
                    <Flex w='100%' justifyContent={'space-between'}>

                        {projectsData.map((project, index) => {

                            if (index > 2) {
                                return
                            }
                            return (

                                // CARD DO PROJETO
                                <Flex key={project.id} flexDir={'column'} gap={2}>

                                    {/* IMAGEM E STATUS */}
                                    <Flex>
                                        <Flex w='100%' flexDir={'column'} gap={1}>
                                            <Image src={`/assets/projects/${project.images[0].url}`} h={120} w={320} objectFit={'cover'} objectPosition={'center'} />

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

                            <Link href="/myInvestments" _hover={{ color: 'lightSide', bgColor:'grayCardSide' }} h='100%'>
                                <Flex h='100%' alignItems={'center'} justifyContent={'center'} >
                                    <Flex> <MdKeyboardDoubleArrowRight size={40} /> </Flex>
                                </Flex>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    )
}