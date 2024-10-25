import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Heading } from "./Heading";
import { Button } from "./Button";



export function PsicologiaClinica() {
    const isLg = useBreakpointValue({ lg: true })

    return (
        <Flex flexDir={'column'} p={12} my={8}>
            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={4}>

                <Flex flexDir={'column'}>
                    <Heading
                        text="Um prazer imenso em ser Psicóloga Clinica!"
                        size="lg"
                        isHighlighted
                        highlightedText={"Psicóloga Clinica!"}
                        highlightColor="whiskey"
                    />

                    <Box
                        mt={2}
                        h={1}
                        display="inline-block"
                        width="100%"
                        bg="linear-gradient(90deg, #A29C8411 , hsla(21, 50%, 59%, 1) 50%, #A29C8411)"
                    />
                </Flex>

                <Flex gap={24} py={[2, 2, 12, 12]} flexDir={['column','column','row','row']}>

                    <Flex flexDir={'column'} textAlign={'justify'} gap={4} fontSize={'md'} fontWeight={'300'} w='100%'>

                        <Text>
                            Tenho um prazer imenso em ser Psicóloga Clinica! É ao mesmo tempo um grande desafio e responsabilidade, assim como alegria e privilégio!
                            Um dos meus propósitos de vida é ajudar as pessoas a atravessarem por suas dores de uma forma que possam viver uma vida com significado apesar da dor.

                        </Text>

                        {isLg ?
                            ""
                            :
                            <Image
                                src='assets/new-images/clinica.jpg'
                                objectFit={'cover'}
                                objectPosition={'center'}
                                py={4}
                            />
                        }
                        <Text>
                            Esse propósito existe não apenas por ser inerente à profissão de psicóloga, mas porque também já sofri em diversos momentos da minha vida e a terapia fez total diferença na minha forma de experenciar as minhas dores, aceitá-las e lidar com elas, além de aprender a me ver sob outra perspectiva: percebendo as minhas qualidades, compreendendo o meu funcionamento, e validando o meu amadurecimento e crescimento. Tendo a consciência de que a vida sempre será um desenvolvimento continuo com seus desafios inerentes. Eventualmente terei que lidar com algo novo que talvez não esteja preparada e faz parte.
                        </Text>
                        <Text>
                            A vida é dinâmica, é movimento. Tem muitas coisas que acontecem que não podemos prever ou impedir que aconteçam.
                            Algumas coisas podemos controlar e outras tantas não podemos.
                        </Text>
                        <Text>
                            O maior problema é que muitos acontecimentos doem, nos fazem sofrer e esse sofrimento quando não é vivenciado, acolhido, aceito e compreendido pode atrapalhar a nossa vida. Não dá para colocar uma dor profunda para baixo do tapete. É preciso atravessar pela dor. Sei que pode ser muito difícil, mas é possível a partir de um ambiente seguro que a Psicoterapia proporciona: uma escuta sem julgamento, um espaço confiável e acolhedor.
                        </Text>
                        <Text>
                            As nossas dores nos atravessam, deixam marcas de uma forma ou de outra. O que está de fato no nosso controle é como aprender a lidar e nisso a Psicoterapia pode ajudar muito!
                        </Text>
                        <Text>
                            Podemos aprender com as nossas dores. É fonte riquíssima de autoconhecimento. Aprendemos porque vamos perceber a conexão dos acontecimentos x emoções predominantes, a intensidade dessas emoções e como reagimos à elas. Além do que pensamos sobre tudo isso, e as regras que criamos a partir do que nos aconteceu sobre as situações, nós mesmos e os outros.
                        </Text>
                        <Text>
                            A vida é feita disso mesmo: de amor, alegrias, incertezas, fracassos, realizações, sofrimento, abundância, escassez, paz..... Precisamos acomodar tudo o que nos acontece e achar um significado na nossa vida apesar dos revezes. Sei que pode não ser fácil, mas vale a pena!
                        </Text>
                        {isLg ?
                            ""
                            :
                            <Image
                                src='assets/new-images/smile.jpg'
                                objectFit={'cover'}
                                objectPosition={'center'}
                                py={4}
                            />
                        }

                        <Button text="Estou aqui para te ajudar! Conta comigo!" w='100%' variant="light" />


                    </Flex>

                    {isLg ?
                        < Flex w='100%'>
                            <Image
                                src='assets/new-images/clinica.jpg'
                                objectFit={'cover'}
                                objectPosition={'center'}
                            />

                        </Flex>
                        :
                        ""
                    }

                </Flex>
            </Flex>
        </Flex >
    )
}