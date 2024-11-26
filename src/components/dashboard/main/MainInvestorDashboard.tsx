import { Flex, Text } from "@chakra-ui/react";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip, Bar, BarChart, Legend, Pie, PieChart, Cell } from "recharts";
import { data, data01, data02 } from "./data/dashData";


export function MainInvestorDashboard() {

    return (
        <Flex w='100%'>
            <Flex w='100%' flexDir={'column'} gap={8}>

                <Flex justifyContent={'space-between'} w='100%'>

                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <AreaChart
                                width={600}
                                height={400}
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
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#0F172A" />
                                <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#1591ea" />
                            </AreaChart>
                        </Flex>
                    </Flex>


                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <BarChart width={600} height={430} data={data} barGap={20}>
                                <XAxis dataKey="etapa" />
                                <YAxis type='number' hide />
                                <Tooltip />
                                <Legend />
                                <Bar radius={2} barSize={64} dataKey="pv" fill="#64748B" activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                                <Bar radius={2} barSize={64} dataKey="uv" fill="#1591ea" activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                            </BarChart>
                        </Flex>
                    </Flex>

                </Flex>


                <Flex justifyContent={'space-between'} w='100%'>

                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <BarChart width={300} height={300} data={data} barGap={20}>
                                <XAxis dataKey="etapa" />
                                <YAxis type='number' hide />
                                <Tooltip />
                                <Legend />
                                <Bar radius={2} barSize={24} dataKey="amt" fill="#64748B" activeBar={{ stroke: 'cyan', strokeWidth: 2, }} />
                            </BarChart>
                        </Flex>
                    </Flex>


                    <Flex flexDir={'column'} gap={2}>
                        <Flex flexDir={'column'}>
                            <Text fontWeight={'semibold'} fontSize={20}>Título do gráfico</Text>
                            <Text fontSize={12}>Período do gráfico</Text>
                        </Flex>
                        <Flex>

                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    fill="#8884d8"
                                    activeShape={{ fill: '#64748B' }}
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

                    <Flex flexDir={'column'} gap={8}>
                        <Flex>CARD 1</Flex>
                        <Flex> CARD 2</Flex>
                    </Flex>

                </Flex>
            </Flex>
        </Flex >
    )
}