import { Box, Flex, Text } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

export function WhatCanIHelp() {
  return (
    <Flex
      pl={20}
      gap={14}
      alignItems="start"
      bgColor="siam"
      lineHeight="lg"
      h="64rem"
    >
      <Box py={20}>
        <Heading
          size="lg"
          text="No que posso te ajudar?"
          isHighlighted
          highlightedText="te ajudar?"
          highlightColor="whiskey"
          color="alabaster"
        />
        <Box mt={12}>
          <Heading size="sm" text="Psicoterapia" color="alabaster" />
          <Box h="2px" bgColor="whiskey" w={40} />
          <Text fontSize="lg" color="alabaster" mt={6}>
            Processo terapêutico que atua em diversas queixas: ansiedade,
            traumas, depressão, luto. Além dessas demandas pode ter o foco foco
            em aprofundar o processo de autoconhecimento, trabalhar o equilíbrio
            emocional, desenvolver a autoestima e/ou melhorar a qualidade dos
            relacionamentos.
          </Text>
        </Box>
        <Box mt={12}>
          <Heading
            size="sm"
            text="Programa de Orientação de Carreira individual"
            color="alabaster"
          />
          <Box h="2px" bgColor="whiskey" w={40} />
          <Text fontSize="lg" color="alabaster" mt={6}>
            É um processo que ajuda a Escolher e/ou Desenvolver uma carreira
            rentável e prazerosa mesmo que você esteja confuso (a) ou não saiba
            por onde começar.
          </Text>
          <Box mt={6}>
            <Heading
              size="xs"
              color="alabaster"
              text="Qual a visão do programa?"
              isHighlighted
              highlightColor="whiskey"
              highlightedText="visão"
            />
            <Flex direction="column" gap={2.5} alignItems="start" mt={6}>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={6} bgColor="whiskey"></Box>
                <Text fontSize="lg" color="alabaster">
                  Clareza para saber o que se quer na própria carreira
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={6} bgColor="whiskey"></Box>
                <Text fontSize="lg" color="alabaster">
                  Ajuda para decidir como construir a sua carreira
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={6} bgColor="whiskey"></Box>
                <Text fontSize="lg" color="alabaster">
                  Fazer as pazes com a sua carreira atual (se não for o caso de
                  mudar)
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={6} bgColor="whiskey"></Box>
                <Text fontSize="lg" color="alabaster">
                  Escolher a carreira ideal para o seu perfil (se for o caso de
                  mudar)
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={6} bgColor="whiskey"></Box>
                <Text fontSize="lg" color="alabaster">
                  Crescer e prosperar na vida profissional
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Button variant="light" text="Agende uma sessão" mt={12} />
      </Box>
      <Box
        bgImage="/assets/WhoAmI.jpg"
        flexShrink={0}
        bgSize="cover"
        h="100%"
        w="38vw"
      ></Box>
    </Flex>
  )
}
