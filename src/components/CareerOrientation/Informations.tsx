import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from '../Heading'
import { Button } from '../Button'
import {
  NumberCircleFour,
  NumberCircleOne,
  NumberCircleThree,
  NumberCircleTwo,
} from 'phosphor-react'

export function Informations() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      direction={{ base: 'column-reverse', lg: 'row' }}
      pt={{ base: 8, lg: 20 }}
      px={{ base: 8, lg: 20 }}
      alignItems="start"
      justifyContent="space-between"
      gap={{ base: 14, lg: 24 }}
    >
      <Box h="100%">
        <Heading
          size={isLg ? 'md' : 'sm'}
          text="Etapas do programa"
          isHighlighted
          highlightColor="brass"
          highlightedText="Etapas"
          textAlign={{ base: 'center', lg: 'start' }}
        />
        <Flex
          direction="column"
          py={{ base: 8, lg: 12 }}
          gap={{ base: 4, lg: 12 }}
          alignItems="start"
          mt={{ base: 6, lg: 12 }}
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            h="100%"
            left={{ base: 6, lg: 8 }}
            bgColor="brass"
            w={2}
          ></Box>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={{ base: 1, lg: 2 }}
              pr={{ base: 2, lg: 4 }}
              pl={{ base: 8, lg: 12 }}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleOne
                size={isLg ? 40 : 24}
                color="#fbfbfb"
                weight="light"
              />
            </Flex>
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'sm', lg: 'lg' }}
            >
              Análise de Perfil Única
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={{ base: 1, lg: 2 }}
              pr={{ base: 2, lg: 4 }}
              pl={{ base: 8, lg: 12 }}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleTwo
                size={isLg ? 40 : 24}
                color="#fbfbfb"
                weight="light"
              />
            </Flex>
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'sm', lg: 'lg' }}
            >
              Definição de Objetivos Essenciais
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={{ base: 1, lg: 2 }}
              pr={{ base: 2, lg: 4 }}
              pl={{ base: 8, lg: 12 }}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleThree
                size={isLg ? 40 : 24}
                color="#fbfbfb"
                weight="light"
              />
            </Flex>
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'sm', lg: 'lg' }}
            >
              Desenvolvimento e Lapidação de habilidades
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={{ base: 1, lg: 2 }}
              pr={{ base: 2, lg: 4 }}
              pl={{ base: 8, lg: 12 }}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleFour
                size={isLg ? 40 : 24}
                color="#fbfbfb"
                weight="light"
              />
            </Flex>
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'sm', lg: 'lg' }}
            >
              Plano de Carreira rentável e prazerosa
            </Text>
          </Flex>
        </Flex>
        <Box mt={{ base: 6, lg: 8 }}>
          {isLg ? (
            <Heading size="xs" color="siam" text="Se interessou?" />
          ) : (
            <Text fontSize="sm" lineHeight="sm" textAlign="center">
              Se interessou?
            </Text>
          )}
          <Button
            text="Agende uma conversa gratuita"
            variant="dark"
            mt={2}
            mx={{ base: 'auto', lg: 0 }}
          />
        </Box>
      </Box>
      <Box>
        <Heading
          size={isLg ? 'md' : 'xs'}
          text="Todo o processo utiliza como base o Ciclo Virtuoso da Carreira"
          isHighlighted
          highlightColor="brass"
          highlightedText={['Ciclo Virtuoso', 'da Carreira']}
          textAlign="center"
          maxW="35rem"
        />
        <Image
          src="/assets/cicle.png"
          alt="cicle"
          h={{ base: 'initial', lg: '100%' }}
          mt={6}
          w={{ base: 'calc(100vw-4rem)', lg: 'initial' }}
          mx="auto"
        />
      </Box>
    </Flex>
  )
}
