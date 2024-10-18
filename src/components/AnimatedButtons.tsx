import { Flex, Text } from "@chakra-ui/react";
import { motion, inView } from "framer-motion";


interface AnimatedButtonProps {
    inView: boolean,
    animation: string,
    title: string
}


export function AnimatedButton({ inView, animation, title }:AnimatedButtonProps) {
    return (
        <Flex
            w='100%'
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Flex
                minW={60}
                as={motion.div}
                animation={inView ? animation : {}}
                px={[4, 4, 8, 8]}
                textAlign={'center'}
                py={2}
                borderRadius={'md'}
                bgColor={'siam'}
                border='1px solid #ffffff55'
                cursor={'pointer'}
                _hover={{ bgColor: 'whiskey', transition: '360ms' }}
            // _hover={{ rotate: '45deg', bgColor: 'whiskey', transition: "360ms" }}
            >
                <Text
                    w='100%'
                    color={'alabaster'}
                >
                    {title}
                </Text>
            </Flex>
        </Flex>
    )
}