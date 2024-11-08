import { Flex, Image, Text } from "@chakra-ui/react";
import { GoDotFill } from "react-icons/go";


export function BlackCard() {
    return (
        <Flex w='100%' bgColor={'black'} color={'lightSide'} >

            <Flex flexDir={'column'} alignItems={'start'} justifyContent={'space-between'} px={20} py={24}>
                <Flex>
                    <Image src="/assets/logo_c2di_white.svg" alt="logo" h={12}/>
                </Flex>
                <Flex flexDir={'column'} gap={2}>
                    <Text>
                        O mercado imobiliário molda cidades, transforma
                        vidas e possibilita sonhos se tornarem realidade,
                        promovendo crescimento econômico e social.
                    </Text>
                    <Flex>
                        <GoDotFill size={16} color="white" />
                        <GoDotFill size={16} color="gray" />
                        <GoDotFill size={16} color="gray" />
                        <GoDotFill size={16} color="gray" />
                        <GoDotFill size={16} color="gray" />
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}