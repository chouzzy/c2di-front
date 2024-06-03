import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

export function WhatCanIHelp() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      pl={{ base: 0, lg: 20 }}
      gap={{ base: 8, lg: 14 }}
      alignItems={{ base: 'center', lg: 'start' }}
      bgColor="siam"
      lineHeight={{ base: 'sm', lg: 'lg' }}
      h={{ base: 'fit-content', lg: '64rem' }}
      direction={{ base: 'column-reverse', lg: 'row' }}
    >
      <Box
        py={{ base: 0, lg: 20 }}
        px={{ base: 8, lg: 0 }}
        mb={{ base: 8, lg: 0 }}
      >
        <Heading
          size={isLg ? 'lg' : 'sm'}
          text="No que posso te ajudar?"
          isHighlighted
          highlightedText="te ajudar?"
          highlightColor="whiskey"
          color="alabaster"
          textAlign={{ base: 'center', lg: 'start' }}
        />
        <Box mt={{ base: 6, lg: 12 }}>
          <Heading
            size={isLg ? 'sm' : 'xs'}
            text="Psicoterapia"
            color="alabaster"
            textAlign={{ base: 'center', lg: 'start' }}
          />
          <Box
            h="2px"
            bgColor="whiskey"
            w={40}
            mx={{ base: 'auto', lg: 0 }}
            mt={{ base: 2, lg: 0 }}
          />
          <Text
            fontSize={{ base: 'sm', lg: 'lg' }}
            color="alabaster"
            mt={{ base: 4, lg: 6 }}
            textAlign={{ base: 'center', lg: 'start' }}
          >
            Processo terapêutico que atua em diversas queixas: ansiedade,
            traumas, depressão, luto. Além dessas demandas pode também ter o
            foco em aprofundar o processo de autoconhecimento, trabalhar o
            equilíbrio emocional, desenvolver a autoestima e/ou melhorar a
            qualidade dos relacionamentos.
          </Text>
        </Box>
        <Box mt={{ base: 6, lg: 12 }}>
          <Heading
            size={isLg ? 'sm' : 'xs'}
            text="Programa de Orientação de Carreira"
            color="alabaster"
            textAlign={{ base: 'center', lg: 'start' }}
          />
          <Box
            h="2px"
            bgColor="whiskey"
            w={40}
            mx={{ base: 'auto', lg: 0 }}
            mt={{ base: 2, lg: 0 }}
          />
          <Text
            fontSize={{ base: 'sm', lg: 'lg' }}
            color="alabaster"
            mt={{ base: 4, lg: 6 }}
            textAlign={{ base: 'center', lg: 'start' }}
          >
            É um processo que ajuda a Escolher e/ou Desenvolver uma carreira
            rentável e prazerosa mesmo que você esteja confuso (a) ou não saiba
            por onde começar.
          </Text>
          <Box mt={6}>
            <Heading
              size={isLg ? 'xs' : '2xs'}
              color="alabaster"
              text="Qual a visão do programa?"
              isHighlighted
              highlightColor="whiskey"
              highlightedText="visão"
            />
            <Flex
              direction="column"
              gap={{ base: 4, lg: 2.5 }}
              alignItems="start"
              mt={6}
            >
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                  Clareza para saber o que se quer na própria carreira
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                  Ajuda para decidir como construir a sua carreira
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                  Fazer as pazes com a sua carreira atual (se não for o caso de
                  mudar)
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                  Escolher a carreira ideal para o seu perfil (se for o caso de
                  mudar)
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                  Crescer e prosperar na vida profissional
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Button
          variant="light"
          text="Agende uma sessão"
          mt={{ base: 6, lg: 12 }}
          mx={{ base: 'auto', lg: 0 }}
        />
      </Box>
      <Box
        bgImage="/assets/WhoAmI.jpg"
        flexShrink={0}
        bgSize="cover"
        h={{ base: '100vw', lg: '100%' }}
        w={{ base: '100vw', lg: '38vw' }}
        mt={{ base: -0.5, lg: 0 }}
      ></Box>
    </Flex>
  )
}
