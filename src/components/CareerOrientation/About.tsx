import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Heading } from '../Heading'
import { Bag, Signpost, Smiley, Wall } from 'phosphor-react'

export function About() {
  return (
    <Flex mt={20} pl={20} alignItems="start">
      <Box>
        <Box>
          <Heading
            text="O que é?"
            size="md"
            isHighlighted
            highlightColor="brass"
            highlightedText="é?"
          />
          <Text mt={6} fontSize="lg" lineHeight="lg">
            É um processo que ajuda a Escolher e Desenvolver uma carreira
            rentável e prazerosa mesmo que você esteja confuso (a) ou não saiba
            por onde começar.
          </Text>
        </Box>
        <Box mt={12}>
          <Heading
            text="Quais são os objetivos do programa?"
            size="md"
            isHighlighted
            highlightColor="brass"
            highlightedText="objetivos do programa?"
          />
          <Flex mt={6} direction="column" gap={6} alignItems="start">
            <Box>
              <Flex alignItems="center" gap={2}>
                <Signpost size={32} color="#B16E51" weight="duotone" />
                <Heading size="xs" color="brass" text="Clareza e Escolha" />
              </Flex>
              <Box h={0.5} bgColor="brass" w={40} mt={2} />
              <Text fontSize="lg" lineHeight="lg" mt={3}>
                Escolher um direcionamento de carreira, em base nas experiências
                de vida, interesses, personalidade, valores pessoais, sonhos e
                objetivos de vida.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Wall size={32} color="#B16E51" weight="duotone" />
                <Heading size="xs" color="brass" text="Flexibilidade" />
              </Flex>
              <Box h={0.5} bgColor="brass" w={40} mt={2} />
              <Text fontSize="lg" lineHeight="lg" mt={3}>
                Superar barreiras que impedem ou dificultam a escolha, o
                posicionamento e o crescimento profissional.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Bag size={32} color="#B16E51" weight="duotone" />
                <Heading size="xs" color="brass" text="Realização" />
              </Flex>
              <Box h={0.5} bgColor="brass" w={40} mt={2} />
              <Text fontSize="lg" lineHeight="lg" mt={3}>
                Ter uma vida profissional funcional, coerente e gratificante.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Smiley size={32} color="#B16E51" weight="duotone" />
                <Heading size="xs" color="brass" text="Prosperidade" />
              </Flex>
              <Box h={0.5} bgColor="brass" w={40} mt={2} />
              <Text fontSize="lg" lineHeight="lg" mt={3}>
                Proporcionar prosperidade aliada ao prazer
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Image src="/assets/about_career.png" alt="about_career" h="100%" />
    </Flex>
  )
}
