import { Box, Flex } from '@chakra-ui/react'
import { FlowerLotus, Target, TrafficSign } from 'phosphor-react'
import { Heading } from './Heading'

export function Freedom() {
  return (
    <Flex
      px={32}
      mt={12}
      mb={20}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap={6} alignItems="center">
        <Box p={3} bgColor="whiskey" borderRadius="lg">
          <TrafficSign size={40} color="#fbfbfb" />
        </Box>
        <Heading
          size="sm"
          text="Liberdade de escolha"
          isHighlighted
          highlightedText="escolha"
          highlightColor="siam"
          w="13.6rem"
        />
      </Flex>
      <Flex gap={6} alignItems="center">
        <Box p={3} bgColor="whiskey" borderRadius="lg">
          <Target size={40} color="#fbfbfb" />
        </Box>
        <Heading
          size="sm"
          text="Liberdade de ação"
          isHighlighted
          highlightedText="ação"
          highlightColor="siam"
          w="13.6rem"
        />
      </Flex>
      <Flex gap={6} alignItems="center">
        <Box p={3} bgColor="whiskey" borderRadius="lg">
          <FlowerLotus size={40} color="#fbfbfb" />
        </Box>
        <Heading
          size="sm"
          text="Liberdade de ser"
          isHighlighted
          highlightedText="ser"
          highlightColor="siam"
          w="13.6rem"
        />
      </Flex>
    </Flex>
  )
}
