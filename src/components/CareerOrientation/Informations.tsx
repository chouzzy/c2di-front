import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Heading } from '../Heading'
import { Button } from '../Button'
import {
  NumberCircleFour,
  NumberCircleOne,
  NumberCircleThree,
  NumberCircleTwo,
} from 'phosphor-react'

export function Informations() {
  return (
    <Flex
      pt={20}
      px={20}
      alignItems="start"
      justifyContent="space-between"
      gap={24}
    >
      <Box h="100%">
        <Heading
          size="md"
          text="Etapas do programa"
          isHighlighted
          highlightColor="brass"
          highlightedText="Etapas"
        />
        <Flex
          direction="column"
          py={12}
          gap={12}
          alignItems="start"
          mt={12}
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            h="100%"
            left={8}
            bgColor="brass"
            w={2}
          ></Box>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={2}
              pr={4}
              pl={12}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleOne size={40} color="#fbfbfb" weight="light" />
            </Flex>
            <Text fontSize="lg" lineHeight="lg">
              Análise de Perfil Única
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={2}
              pr={4}
              pl={12}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleTwo size={40} color="#fbfbfb" weight="light" />
            </Flex>
            <Text fontSize="lg" lineHeight="lg">
              Definição de Objetivos Essenciais
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={2}
              pr={4}
              pl={12}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleThree size={40} color="#fbfbfb" weight="light" />
            </Flex>
            <Text fontSize="lg" lineHeight="lg">
              Desenvolvimento e Lapidação de habilidades
            </Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Flex
              alignItems="center"
              justifyContent="center"
              py={2}
              pr={4}
              pl={12}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              bgColor="brass"
            >
              <NumberCircleFour size={40} color="#fbfbfb" weight="light" />
            </Flex>
            <Text fontSize="lg" lineHeight="lg">
              Plano de Carreira rentável e prazerosa
            </Text>
          </Flex>
        </Flex>
        <Box mt={8}>
          <Heading size="xs" color="siam" text="Se interessou?" />
          <Button text="Agende uma conversa gratuita" variant="dark" mt={2} />
        </Box>
      </Box>
      <Box>
        <Heading
          size="md"
          text="Todo o processo utiliza como base o Ciclo Virtuoso da Carreira"
          isHighlighted
          highlightColor="brass"
          highlightedText="Ciclo Virtuoso da Carreira"
          textAlign="center"
          maxW="35rem"
        />
        <Image src="/assets/cicle.png" alt="cicle" h="100%" mt={6} mx="auto" />
      </Box>
    </Flex>
  )
}
