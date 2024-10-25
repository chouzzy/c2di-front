import { Flex, Link, Text } from "@chakra-ui/react";
import { motion, inView } from "framer-motion";


interface AnimatedButtonProps {
    inView: boolean,
    animation: string,
    title: string
    id: string
}


export function AnimatedButton({ inView, animation, title, id }: AnimatedButtonProps) {
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
                <Link _hover={{ textDecoration: 'none' }} href={id}>
                    <Text
                        w='100%'
                        color={'alabaster'}
                    >
                        {title}
                    </Text>
                </Link>
            </Flex>
        </Flex>
    )
}