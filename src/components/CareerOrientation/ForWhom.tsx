import { Box, Flex, Text } from '@chakra-ui/react'
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
        h={14}
        w={14}
      >
        {icon}
      </Flex>
      <Text fontSize="lg" lineHeight="lg" w={96}>
        {text}
      </Text>
    </Flex>
  )
}

export function ForWhom() {
  return (
    <Box py={20} px={40} bgColor="siam" color="alabaster">
      <Heading
        text="Pra quem é este programa?"
        size="md"
        isHighlighted
        highlightColor="whiskey"
        highlightedText="Pra quem é"
      />
      <Flex justifyContent="space-between" alignItems="center" mt={12} w="100%">
        <Topic
          text="Não sabe se continua onde está ou se muda totalmente de carreira"
          icon={<Question size={32} color="#fbfbfb" weight="light" />}
        />
        <Topic
          text="Gosta de muitas coisas ou de nada"
          icon={<Asterisk size={32} color="#fbfbfb" weight="light" />}
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={8} w="100%">
        <Topic
          text="Está insatisfeito com a carreira atual"
          icon={<SmileySad size={32} color="#fbfbfb" weight="light" />}
        />
        <Topic
          text="Se sente inseguro para fazer uma transição de carreira"
          icon={
            <ArrowsOutLineHorizontal size={32} color="#fbfbfb" weight="light" />
          }
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={8} w="100%">
        <Topic
          text="Não sabe o que fazer na carreira"
          icon={<ArrowsOutCardinal size={32} color="#fbfbfb" weight="light" />}
        />
        <Topic
          text="Tem dificuldades em tomar decisões"
          icon={<BezierCurve size={32} color="#fbfbfb" weight="light" />}
        />
      </Flex>
    </Box>
  )
}
