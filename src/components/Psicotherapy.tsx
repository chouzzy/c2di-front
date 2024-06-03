import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

export function Psicotherapy() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      p={{ base: 8, lg: 20 }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'start', lg: 'end' }}
      gap={20}
    >
      {isLg && (
        <Image src="/assets/psicotherapy.png" alt="psicotherapy" h="100%" />
      )}
      <Box>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" />
          <Heading
            size={isLg ? 'lg' : 'sm'}
            text="Psicoterapia"
            color="brass"
          />
        </Flex>
        <Box
          mt={5}
          h={1}
          display="inline-block"
          width="100%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>
        {!isLg && (
          <Image
            src="/assets/therapy_mobile.png"
            alt="curriculum"
            w="calc(100vw - 4rem)"
            mt={-7}
          />
        )}
        <Text
          mt={{ base: 6, lg: 12 }}
          textAlign="center"
          fontSize={{ base: 'sm', lg: 'lg' }}
          lineHeight={{ base: 'sm', lg: 'lg' }}
        >
          É um processo que trabalha com foco na história de vida e nos
          comportamentos atuais (pensamentos, sentimentos e atitudes).
        </Text>
        <Text
          mt={{ base: 2, lg: 6 }}
          textAlign="center"
          fontSize={{ base: 'sm', lg: 'lg' }}
          lineHeight={{ base: 'sm', lg: 'lg' }}
        >
          A psicoterapia pode ainda ter por objetivo trabalhar qualquer forma de
          luto (em perdas como: divórcio, morte, doença, demissão, tragédias),
          medos extremos, inseguranças, crises de ansiedade ou mesmo para
          aprofundar o autoconhecimento com foco no equilíbrio emocional,
          desenvolvimento da autoestima e para melhorar a qualidade dos
          relacionamentos.
        </Text>
        <Button
          mt={{ base: 6, lg: 12 }}
          text="Quero fazer psicoterapia individual"
          variant="dark"
          w="100%"
        />
      </Box>
    </Flex>
  )
}
