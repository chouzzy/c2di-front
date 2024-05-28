import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from '../Heading'
import { Bag, Signpost, Smiley, Wall } from 'phosphor-react'

export function About() {
  const isLg = useBreakpointValue({ lg: true })
  return (
    <Flex
      mt={{ base: 3, lg: 20 }}
      pb={{ base: 8, lg: 0 }}
      pl={{ base: 8, lg: 20 }}
      alignItems="start"
    >
      <Box>
        <Flex justifyContent="space-between">
          <Box my={{ base: 'auto', lg: 0 }}>
            <Heading
              text="O que é?"
              size={isLg ? 'md' : '2xs'}
              isHighlighted
              highlightColor="brass"
              highlightedText="é?"
            />
            <Text
              mt={{ base: 4, lg: 6 }}
              fontSize={{ base: 'sm', lg: 'lg' }}
              lineHeight={{ base: 'sm', lg: 'lg' }}
            >
              É um processo que ajuda a Escolher e/ou Desenvolver uma carreira
              rentável e prazerosa mesmo que você esteja confuso (a) ou não
              saiba por onde começar.
            </Text>
          </Box>
          {!isLg && (
            <Image
              src="/assets/about_career.png"
              alt="about_career"
              maxW={52}
              h="100%"
            />
          )}
        </Flex>
        <Box mt={{ base: 8, lg: 12 }} pr={{ base: 8, lg: 0 }}>
          <Heading
            text="Quais são os objetivos do programa?"
            size={isLg ? 'md' : 'xs'}
            isHighlighted
            highlightColor="brass"
            highlightedText="objetivos do programa?"
            textAlign={{ base: 'center', lg: 'start' }}
          />
          <Flex
            mt={6}
            direction="column"
            gap={{ base: 4, lg: 6 }}
            alignItems="start"
          >
            <Box>
              <Flex alignItems="center" gap={2}>
                <Signpost
                  size={isLg ? 32 : 18}
                  color="#B16E51"
                  weight="duotone"
                />
                <Heading
                  size={isLg ? 'xs' : '2xs'}
                  color="brass"
                  text="Clareza e Escolha"
                />
              </Flex>
              <Box
                h={0.5}
                bgColor="brass"
                w={{ base: 14, lg: 40 }}
                mt={{ base: 1, lg: 2 }}
              />
              <Text
                fontSize={{ base: 'sm', lg: 'lg' }}
                lineHeight={{ base: 'sm', lg: 'lg' }}
                mt={3}
              >
                Escolher um direcionamento de carreira, em base nas experiências
                de vida, interesses, personalidade, valores pessoais, sonhos e
                objetivos de vida.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Wall size={isLg ? 32 : 18} color="#B16E51" weight="duotone" />
                <Heading
                  size={isLg ? 'xs' : '2xs'}
                  color="brass"
                  text="Flexibilidade"
                />
              </Flex>
              <Box
                h={0.5}
                bgColor="brass"
                w={{ base: 14, lg: 40 }}
                mt={{ base: 1, lg: 2 }}
              />
              <Text
                fontSize={{ base: 'sm', lg: 'lg' }}
                lineHeight={{ base: 'sm', lg: 'lg' }}
                mt={3}
              >
                Superar barreiras que impedem ou dificultam a escolha, o
                posicionamento e o crescimento profissional.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Bag size={isLg ? 32 : 18} color="#B16E51" weight="duotone" />
                <Heading
                  size={isLg ? 'xs' : '2xs'}
                  color="brass"
                  text="Realização"
                />
              </Flex>
              <Box
                h={0.5}
                bgColor="brass"
                w={{ base: 14, lg: 40 }}
                mt={{ base: 1, lg: 2 }}
              />
              <Text
                fontSize={{ base: 'sm', lg: 'lg' }}
                lineHeight={{ base: 'sm', lg: 'lg' }}
                mt={3}
              >
                Ter uma vida profissional funcional, coerente e gratificante.
              </Text>
            </Box>
            <Box>
              <Flex alignItems="center" gap={2}>
                <Smiley
                  size={isLg ? 32 : 18}
                  color="#B16E51"
                  weight="duotone"
                />
                <Heading
                  size={isLg ? 'xs' : '2xs'}
                  color="brass"
                  text="Prosperidade"
                />
              </Flex>
              <Box
                h={0.5}
                bgColor="brass"
                w={{ base: 14, lg: 40 }}
                mt={{ base: 1, lg: 2 }}
              />
              <Text
                fontSize={{ base: 'sm', lg: 'lg' }}
                lineHeight={{ base: 'sm', lg: 'lg' }}
                mt={3}
              >
                Proporcionar prosperidade aliada ao prazer
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      {isLg && (
        <Image src="/assets/about_career.png" alt="about_career" h="100%" />
      )}
    </Flex>
  )
}
