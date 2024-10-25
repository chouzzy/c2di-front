import { Box, Divider, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Button } from "./Button";
import { Heading } from "./Heading";


export function Supera() {

    const isLg = useBreakpointValue({ lg: true })

    return (

        <Flex
            w='100%'
            flexDir={['column']}
            alignItems={'center'}
            justifyContent={'center'}
            bgColor={'siam'}
            color='alabaster'
            p={[2, 2, 12, 12]}
            my={8}
            gap={[8, 8, 16, 16]}
        >

            {/* HEADER */}
            <Flex
                flexDir={'column'}
                align={'center'}
                justify={'center'}
            >   <Image src="/assets/icon_logo_light.svg" alt="icon" boxSize={12} />
                <Heading
                    text="Grupo terapeutico SUPERA!"
                    textAlign={'center'}
                    size={isLg? "lg" : 'md'}
                    isHighlighted
                    highlightedText={"SUPERA!"}
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

            {/* CONTENT */}
            <Flex
                w='100%'
                gap={8}
                p={4}
                flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
            >

                {/* LEFT CONTENT */}
                <Flex flexDir={'column'} w='100%' justifyContent={'space-between'} gap={[8, 8, 0, 0]}>
                    <Text>
                        No grupo terapêutico <b style={{color:'#D49671'}}> SUPERA </b> vamos aprofundar cada um desses temas de forma prática
                        e profunda a cada encontro, dando espaço para a dor, compreensão e acolhimento,
                        com objetivo principal da retomada de uma vida significativa após a separação.
                        <br></br>
                        <br></br>
                        Inicio: Janeiro de <b style={{color:'#D49671'}}> 2025 </b>
                    </Text>

                    <Flex flexDir={'column'} gap={2}>
                        {isLg ?
                            <>
                                <Button text="Clique aqui para se inscrever na lista de interessados" variant="light" 
                                    prevText="Olá, acessei o site Natasha Macedo e gostaria de me inscrever na lista de interessados"
                                />
                                <Button text="Clique aqui caso você precise de forma imediata" variant="dark" 
                                    prevText="Olá, acessei o site Natasha Macedo e gostaria de me inscrever de forma imediata."
                                />
                            </>

                            :
                            <>
                                <Button text="Inscrever-se na lista de interessados" variant="light" 
                                    prevText="Olá, acessei o site Natasha Macedo e gostaria de me inscrever na lista de interessados"
                                />
                                <Button text="Preciso de forma imediata!" variant="dark" 
                                    prevText="Olá, acessei o site Natasha Macedo e gostaria de me inscrever de forma imediata."
                                />
                            </>
                        }
                    </Flex>



                    <Text _highlighted={'SUPERA'}>
                        Para quem é Grupo Terapêutico <b style={{color:'#D49671'}}> SUPERA</b>?
                        <br></br><br></br>
                        Mulheres e homens que acabaram de se separar de um relacionamento (divorcio ou separação) e se sentem:
                    </Text>
                    <Image mt={2} src='assets/new-images/brain-diagram.png' />
                </Flex>

                <Divider orientation={isLg ? "vertical" : "horizontal"} bgColor={'whiskey'} h={isLg ? '360px' : "0.5px"} w={isLg ? '0.5px' : "100%"} my='auto' />


                {/* RIGHT CONTENT */}
                <Flex
                    w='100%'
                    flexDir={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={[4,4,0,0]}
                >
                    <Flex>
                        <Heading
                            text="TEMAS:"
                            size="md"
                            fontWeight={'b'}
                            isHighlighted
                            highlightedText={":"}
                            highlightColor="whiskey"
                        />
                    </Flex>
                    <Flex p={[2, 2, 8, 8]}>
                        <Image src='assets/new-images/themes.png' />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    )
}