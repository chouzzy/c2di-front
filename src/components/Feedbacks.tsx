import {
  Box,
  Flex,
  FlexProps,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Heading } from './Heading'
import { CaretLeft, CaretRight } from 'phosphor-react'

interface FeedbackProps extends FlexProps {
  w: string
  feedback: string
  name: string
  role: string
}

function Feedback({ w, feedback, name, role }: FeedbackProps) {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      direction="column"
      pt={{ base: 16, lg: 24 }}
      pb={{ base: 6, lg: 12 }}
      px={{ base: 6, lg: 12 }}
      minW={w}
      h={{ base: 'calc(100vh - 32rem)', lg: '30rem' }}
      position="relative"
      overflow="hidden"
    >
      <Text
        fontSize={{ base: 'sm', lg: 'md' }}
        lineHeight={{ base: 'sm', lg: 'md' }}
        fontWeight="light"
        fontStyle="italic"
      >
        {feedback}
      </Text>
      <Box mt="auto">
        <Heading size={isLg ? 'xs' : '2xs'} text={name} color="brass" />
        <Text
          fontSize={{ base: 'sm', lg: 'md' }}
          lineHeight={{ base: 'sm', lg: 'md' }}
          color="bitter"
        >
          {role}
        </Text>
      </Box>
      <Flex
        position="absolute"
        left="0"
        top="0"
        bgColor="bitter"
        color="alabaster"
        justifyContent="flex-end"
        align="center"
        pr={6}
        py={2.5}
        w={{ base: 36, lg: 40 }}
        borderRightRadius="lg"
        borderLeftRadius={0}
        zIndex={2}
      >
        <Heading size={isLg ? 'xs' : '2xs'} text="Carreira" textAlign="end" />
      </Flex>
      <Image
        position="absolute"
        top="-20px"
        right="-24px"
        alt="quote"
        src="/assets/quote.svg"
        opacity="0.15"
        h={44}
      />
    </Flex>
  )
}

export function Feedbacks() {
  const isLg = useBreakpointValue({ lg: true })

  return isLg ? (
    <Box pl={20} mb={20} borderRadius="lg">
      <Heading
        size="lg"
        text="O que meus pacientes e clientes têm a dizer?"
        isHighlighted
        highlightColor="brass"
        highlightedText="têm a dizer?"
      />
      <Flex
        w="calc(100vw - 5rem)"
        overflowX="scroll"
        py={12}
        scrollBehavior="smooth"
        sx={{
          '&::-webkit-scrollbar': {
            h: '8px',
            borderRadius: '9999px',
            backgroundColor: `rgba(32, 34, 34, 0.2)`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
            backgroundColor: `brass`,
          },
        }}
        borderRadius="lg"
      >
        <Feedback
          w="28rem"
          name="Anne Gabriele Sousa de Oliveira"
          role="Empreendedora"
          feedback="Graças ao processo e as ferramentas pude descobrir o meu perfil
            comportamental, percebendo minha essência, crenças e inseguranças.
            Percebi o que eu sou e o que quero para meu futuro próximo - hoje
            tenho um retrato claro do caminho a ser traçado. Estou completamente
            satisfeita com os resultados em minha vida pessoal e profissional"
        />
        <Box
          borderLeftWidth="1px"
          alignSelf="stretch"
          w="auto"
          h="auto"
          borderColor="gray.200"
        />
        <Feedback
          w="40rem"
          name="Estevão Junior"
          role="Gerente Administrativo e Financeiro"
          feedback="Acredito que poderia ficar escrevendo os inúmeros benefícios que o
          processo de carreira me proporcionou. A confiança, liberdade de
          escolhas, ver no outro a melhor parte do trabalho....Mas tudo isso
          não teria a menor importância se não tivesse me voltado para dentro
          de mim buscando o melhor do meu EU que estava escondido e muito
          desconfiado de tudo e todos. Nossa parceria está sendo um grande
          processo de aprendizagem onde sou desafiado a pensa e buscar o
          melhor no trabalho e por consequência reflete na minha vida pessoal."
        />
        <Box
          borderLeftWidth="1px"
          alignSelf="stretch"
          w="auto"
          h="auto"
          borderColor="gray.200"
        />
        <Feedback
          w="28rem"
          name="Diogo Kammers"
          role="Profissional da Área Comercial e Marketing"
          feedback="A Orientação de Carreira foi um processo desafiador e muito
          gratificante. Aprender mais sobre mim e como lidar com situações
          desconfortáveis me ajudou bastante na evolução na empresa e na minha
          vida particular. O maior ganho com certeza foi me conhecer melhor e
          trabalhar no plano de ação para ajudar a desenvolver os meus pontos
          fracos"
        />
      </Flex>
    </Box>
  ) : (
    <Box px={8} mb={8}>
      <Heading
        size="sm"
        text="O que meus pacientes e clientes têm a dizer?"
        isHighlighted
        highlightColor="brass"
        highlightedText="têm a dizer?"
        mb={8}
        textAlign="center"
      />
      <Feedback
        w="calc(100vw - 8rem)"
        name="Anne Gabriele Sousa de Oliveira"
        role="Empreendedora"
        feedback="Graças ao processo e as ferramentas pude descobrir o meu perfil
          comportamental, percebendo minha essência, crenças e inseguranças.
          Percebi o que eu sou e o que quero para meu futuro próximo - hoje
          tenho um retrato claro do caminho a ser traçado. Estou completamente
          satisfeita com os resultados em minha vida pessoal e profissional"
      />
      <Flex alignItems="center" justifyContent="center" gap={4}>
        <Box
          bgColor="whiskey"
          p={2}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <CaretLeft size={24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="whiskey"
          p={2}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <CaretRight size={24} color="#fbfbfb" />
        </Box>
      </Flex>
    </Box>
  )
}
