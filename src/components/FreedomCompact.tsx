import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react'
import { FlowerLotus, Target, TrafficSign } from 'phosphor-react'
import { Heading } from './Heading'

export function FreedomCompact() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      mt={{ base: 6, lg: 8 }}
      justifyContent="space-between"
      alignItems="center"
      color='alabaster'
    >

      <Flex
        w='100%'
        justifyContent="space-between"
        alignItems="center"
        >


        <Flex
          w='100%'
          justifyContent="space-between"
          alignItems="start"
          flexDir={['row','row','column','column']}
          
          gap={[0,0,8,8]}
      
        >
          <Flex
            gap={{ base: 2, lg: 4 }}
            alignItems="center"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Box
              p={{ base: 2, lg: 2 }}
              bgColor="whiskey"
              borderRadius={{ base: 'md', lg: 'md' }}
            >
              <TrafficSign size={isLg ? 32 : 20} color="#fbfbfb" />
            </Box>
            <Heading
              size={isLg ? 'sm' : '2xs'}
              text="Liberdade de escolha"
              isHighlighted
              highlightedText="escolha"
              highlightColor="whiskey"
              w={{ base: 24, lg: 'auto' }}
              textAlign={{ base: 'center', lg: 'center' }}
            />
          </Flex>

          <Flex
            gap={{ base: 2, lg: 4 }}
            alignItems="center"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Box
              p={{ base: 2, lg: 2 }}
              bgColor="whiskey"
              borderRadius={{ base: 'md', lg: 'md' }}
            >
              <Target size={isLg ? 32 : 20} color="#fbfbfb" />
            </Box>
            <Heading
              size={isLg ? 'sm' : '2xs'}
              text="Liberdade de ação"
              isHighlighted
              highlightedText="ação"
              highlightColor="whiskey"
              w={{ base: 24, lg: 'auto' }}
              textAlign={{ base: 'center', lg: 'center' }}
            />
          </Flex>

          <Flex
            gap={{ base: 2, lg: 4 }}
            alignItems="center"
            direction={{ base: 'column', lg: 'row' }}
          >
            <Box
              p={{ base: 2, lg: 2 }}
              bgColor="whiskey"
              borderRadius={{ base: 'md', lg: 'md' }}
            >
              <FlowerLotus size={isLg ? 32 : 20} color="#fbfbfb" />
            </Box>
            <Heading
              size={isLg ? 'sm' : '2xs'}
              text="Liberdade de ser"
              isHighlighted
              highlightedText="ser"
              highlightColor="whiskey"
              w={{ base: 24, lg: 'auto' }}
              textAlign={{ base: 'center', lg: 'center' }}
            />
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  )
}
