import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

export function Psicotherapy() {
  return (
    <Flex p={20} alignItems="end" justifyContent="space-between" gap={20}>
      <Image src="/assets/psicotherapy.png" alt="psicotherapy" h="100%" />
      <Box>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" />
          <Heading size="lg" text="Psicoterapia" color="brass" />
        </Flex>
        <Box
          mt={5}
          h={1}
          display="inline-block"
          width="100%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>
        <Text mt={12} textAlign="center" fontSize="lg" lineHeight="lg">
          É um processo que leva em consideração e trabalha com foco na história
          de vida e nos comportamentos atuais (pensamentos, sentimentos e
          atitudes). Precisamos entender o contexto, os acontecimentos e a forma
          de lidar com o que acontece e o quanto isso incomoda ou ajuda a viver
          uma vida que faça sentido pra você.
        </Text>
        <Text mt={6} textAlign="center" fontSize="lg" lineHeight="lg">
          A psicoterapia pode ainda ter por objetivo trabalhar qualquer forma de
          luto (em perdas como: divórcio, morte, doença, demissão, tragédias),
          medos extremos, inseguranças, crises de ansiedade ou mesmo para
          aprofundar o autoconhecimento com foco no equilíbrio emocional,
          desenvolvimento da autoestima e para melhorar a qualidade dos
          relacionamentos.
        </Text>
        <Button
          mt={12}
          text="Quero fazer psicoterapia individual"
          variant="dark"
          w="100%"
        />
      </Box>
    </Flex>
  )
}
