import { Box, Flex, Image } from '@chakra-ui/react'
import { Heading } from '../Heading'

export function Header() {
  return (
    <Box>
      <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" mx="auto" />
      <Flex alignItems="center" justifyContent="space-between" gap={6}>
        <Box
          mt={5}
          h={1}
          display="inline-block"
          w="20%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>
        <Heading
          size="lg"
          text="Programa de Orientação de Carreira"
          isHighlighted
          highlightColor="brass"
          highlightedText="Orientação"
          flex="1"
          textAlign="center"
        />
        <Box
          mt={5}
          h={1}
          display="inline-block"
          w="20%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>
      </Flex>
    </Box>
  )
}
