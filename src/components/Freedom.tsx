import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { FlowerLotus, Target, TrafficSign } from 'phosphor-react'
import { Heading } from './Heading'

export function Freedom() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      px={{ base: 8, lg: 32 }}
      mt={{ base: 4, lg: 12 }}
      mb={{ base: 8, lg: 20 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex
        gap={{ base: 2, lg: 6 }}
        alignItems="center"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box
          p={{ base: 2, lg: 3 }}
          bgColor="whiskey"
          borderRadius={{ base: 'md', lg: 'lg' }}
        >
          <TrafficSign size={isLg ? 40 : 20} color="#fbfbfb" />
        </Box>
        <Heading
          size={isLg ? 'sm' : '2xs'}
          text="Liberdade de escolha"
          isHighlighted
          highlightedText="escolha"
          highlightColor="siam"
          w={{ base: 24, lg: '13.6rem' }}
          textAlign={{ base: 'center', lg: 'start' }}
        />
      </Flex>
      <Flex
        gap={{ base: 2, lg: 6 }}
        alignItems="center"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box
          p={{ base: 2, lg: 3 }}
          bgColor="whiskey"
          borderRadius={{ base: 'md', lg: 'lg' }}
        >
          <Target size={isLg ? 40 : 20} color="#fbfbfb" />
        </Box>
        <Heading
          size={isLg ? 'sm' : '2xs'}
          text="Liberdade de ação"
          isHighlighted
          highlightedText="ação"
          highlightColor="siam"
          w={{ base: 24, lg: '13.6rem' }}
          textAlign={{ base: 'center', lg: 'start' }}
        />
      </Flex>
      <Flex
        gap={{ base: 2, lg: 6 }}
        alignItems="center"
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box
          p={{ base: 2, lg: 3 }}
          bgColor="whiskey"
          borderRadius={{ base: 'md', lg: 'lg' }}
        >
          <FlowerLotus size={isLg ? 40 : 20} color="#fbfbfb" />
        </Box>
        <Heading
          size={isLg ? 'sm' : '2xs'}
          text="Liberdade de ser"
          isHighlighted
          highlightedText="ser"
          highlightColor="siam"
          w={{ base: 24, lg: '13.6rem' }}
          textAlign={{ base: 'center', lg: 'start' }}
        />
      </Flex>
    </Flex>
  )
}
