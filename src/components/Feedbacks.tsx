import {
  Box,
  Button,
  Flex,
  FlexProps,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Heading } from './Heading'
import { CaretLeft, CaretRight } from 'phosphor-react'
import feedbacks from '../data/feedbacks.json'
import { useState } from 'react'

interface FeedbackProps extends FlexProps {
  size: string
  feedback: string
  name: string
  role: string
  type: string
}

function Feedback({ size, feedback, name, role, type }: FeedbackProps) {
  const isLg = useBreakpointValue({ lg: true })
  const w =
    size === 'sm'
      ? '28rem'
      : size === 'md'
        ? '32rem'
        : size === 'lg'
          ? '40rem'
          : size

  return (
    <Flex
      direction="column"
      pt={{ base: 16, lg: 24 }}
      px={{ base: 6, lg: 12 }}
      minW={w}
      h={{ base: 'calc(100vh - 12rem)', lg: '30rem' }}
      maxH={{ base: '460px', lg: 'initial' }}
      position="relative"
      overflow="hidden"
    >
      <Text
        fontSize={{ base: 'sm', lg: 'md' }}
        lineHeight={{ base: 'sm', lg: 'md' }}
        fontWeight="light"
        fontStyle="italic"
        mb={{ base: 0, lg: 12 }}
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
        bgColor={type === 'Carreira' ? 'bitter' : 'brass'}
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
        <Heading size={isLg ? 'xs' : '2xs'} text={type} textAlign="end" />
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
  const [count, setCount] = useState(0)

  function nextFeedback() {
    count + 1 > feedbacks.length - 1 ? setCount(0) : setCount(count + 1)
  }

  function previousFeedback() {
    count - 1 < 0 ? setCount(0) : setCount(count - 1)
  }

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
        w="calc(100vw - 6rem)"
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
        {feedbacks.map((feedback, index) => (
          <>
            <Feedback
              size={feedback.size}
              name={feedback.name}
              role={feedback.role}
              feedback={feedback.feedback}
              type={feedback.type}
            />
            {index !== feedbacks.length - 1 && (
              <Box
                borderLeftWidth="1px"
                alignSelf="stretch"
                w="auto"
                h="auto"
                borderColor="gray.200"
              />
            )}
          </>
        ))}
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
        size="calc(100vw - 8rem)"
        name={feedbacks[count].name}
        role={feedbacks[count].role}
        feedback={feedbacks[count].feedback}
        type={feedbacks[count].type}
      />
      <Flex alignItems="center" justifyContent="center" gap={4} mt={6}>
        <Button
          bgColor="olive"
          p={2}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          onClick={previousFeedback}
          isDisabled={count === 0}
        >
          <CaretLeft size={24} color="#fbfbfb" />
        </Button>
        <Box
          bgColor="olive"
          p={2}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          onClick={nextFeedback}
        >
          <CaretRight size={24} color="#fbfbfb" />
        </Box>
      </Flex>
    </Box>
  )
}
