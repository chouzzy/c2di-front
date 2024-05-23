import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from '../Heading'

export function Header() {
  const isLg = useBreakpointValue({ lg: true })
  return (
    <Box px={{ base: 8, lg: 0 }}>
      <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" mx="auto" />
      <Flex alignItems="center" justifyContent="space-between" gap={6}>
        {isLg && (
          <Box
            mt={5}
            h={1}
            display="inline-block"
            w="20%"
            bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
          ></Box>
        )}
        <Heading
          size={isLg ? 'lg' : 'sm'}
          text="Programa de Orientação de Carreira"
          isHighlighted
          highlightColor="brass"
          highlightedText="Orientação"
          flex="1"
          textAlign="center"
        />
        {isLg && (
          <Box
            mt={5}
            h={1}
            display="inline-block"
            w="20%"
            bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
          ></Box>
        )}
      </Flex>
    </Box>
  )
}
