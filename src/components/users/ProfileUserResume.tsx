import { Button, Flex, Text } from "@chakra-ui/react";


export function ProfileUserResume() {

    return (
        <Flex w='100%' maxW={'480px'} flexDir={'column'} justifyContent={'space-between'}>

            <Flex flexDir={'column'} gap={4}>
                <Flex flexDir={'column'} gap={1}>
                    <Flex>
                        <Text fontWeight={'medium'} color='graySide'>
                            Seu perfil de investidor
                        </Text>
                    </Flex>
                    <Flex>
                        <Text fontSize={32} fontWeight={'medium'}>
                            Nome do perfil
                        </Text>
                    </Flex>
                </Flex>
                <Flex>
                    Aqui uma descrição sobre este perfil de investidor. Lorem ipsum dolor sit amet consectetur.
                    Non aliquam a odio et. Nisl quis tellus odio netus arcu aliquam. Risus leo at mattis quis.
                    Nec pharetra ullamcorper quis faucibus enim aenean eget leo. Enim eros consectetur rhoncus
                    et velit. Neque eget lacus cursus purus tellus morbi arcu. Aliquam ullamcorper ut suscipit
                    amet fermentum purus mattis id. Accumsan eget ornare leo neque. Volutpat eu malesuada arcu
                    elementum magna neque. Nulla viverra sapien nisl ipsum pharetra purus pellentesque.
                    Dolor eu tempor dictumst fames blandit etiam sed cras duis. Id facilisis fringilla at in.
                    Lacinia eget vel placerat ornare viverra.
                </Flex>
            </Flex>

            <Flex>
                <Button fontWeight={'normal'} bgColor={'redSide'} color={'lightSide'} mt={4}>
                    Refazer teste de perfil
                </Button>
            </Flex>

        </Flex>
    )
}