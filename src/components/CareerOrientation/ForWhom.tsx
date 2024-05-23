import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from '../Heading'
import {
  ArrowsOutCardinal,
  ArrowsOutLineHorizontal,
  Asterisk,
  BezierCurve,
  Question,
  SmileySad,
} from 'phosphor-react'
import { ReactNode } from 'react'

function Topic({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Flex alignItems="center" gap={4}>
      <Flex
        alignItems="center"
        justifyContent="center"
        bgColor="whiskey"
        borderRadius="full"
        h={{ base: 10, lg: 14 }}
        w={{ base: 10, lg: 14 }}
        flexShrink={0}
      >
        {icon}
      </Flex>
      <Text
        fontSize={{ base: 'sm', lg: 'lg' }}
        lineHeight={{ base: 'sm', lg: 'lg' }}
        w={{ base: 'inherit', lg: 96 }}
      >
        {text}
      </Text>
    </Flex>
  )
}

export function ForWhom() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Box
      py={{ base: 8, lg: 20 }}
      px={{ base: 8, lg: 40 }}
      bgColor="siam"
      color="alabaster"
    >
      <Heading
        text="Pra quem é este programa?"
        size={isLg ? 'md' : 'xs'}
        isHighlighted
        highlightColor="whiskey"
        highlightedText="Pra quem é"
        mx={{ base: 'auto', lg: 0 }}
        textAlign={{ base: 'center', lg: 'start' }}
      />
      <Flex
        justifyContent="space-between"
        alignItems={{ base: 'start', lg: 'center' }}
        mt={{ base: 6, lg: 12 }}
        w="100%"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 0 }}
      >
        <Topic
          text="Não sabe se continua onde está ou se muda totalmente de carreira"
          icon={
            <Question size={isLg ? 32 : 24} color="#fbfbfb" weight="light" />
          }
        />
        <Topic
          text="Gosta de muitas coisas ou de nada"
          icon={
            <Asterisk size={isLg ? 32 : 24} color="#fbfbfb" weight="light" />
          }
        />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems={{ base: 'start', lg: 'center' }}
        mt={{ base: 6, lg: 8 }}
        w="100%"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 0 }}
      >
        <Topic
          text="Está insatisfeito com a carreira atual"
          icon={
            <SmileySad size={isLg ? 32 : 24} color="#fbfbfb" weight="light" />
          }
        />
        <Topic
          text="Se sente inseguro para fazer uma transição de carreira"
          icon={
            <ArrowsOutLineHorizontal
              size={isLg ? 32 : 24}
              color="#fbfbfb"
              weight="light"
            />
          }
        />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems={{ base: 'start', lg: 'center' }}
        mt={{ base: 6, lg: 8 }}
        w="100%"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 0 }}
      >
        <Topic
          text="Não sabe o que fazer na carreira"
          icon={
            <ArrowsOutCardinal
              size={isLg ? 32 : 24}
              color="#fbfbfb"
              weight="light"
            />
          }
        />
        <Topic
          text="Tem dificuldades em tomar decisões"
          icon={
            <BezierCurve size={isLg ? 32 : 24} color="#fbfbfb" weight="light" />
          }
        />
      </Flex>
    </Box>
  )
}
