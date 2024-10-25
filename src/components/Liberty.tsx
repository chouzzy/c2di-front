import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'
import { Freedom } from './Freedom'
import { FreedomCompact } from './FreedomCompact'

export function Liberty() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      mt={24}
      pr={{ base: 4, lg: 0 }}
      pl={{ base: 4, lg: 12 }}
      gap={{ base: 8, lg: 0 }}
      alignItems={{ base: 'center', lg: 'start' }}
      bgColor="siam"
      lineHeight={{ base: 'sm', lg: 'lg' }}
    >


      <Flex
        direction={{ base: 'column', lg: 'row' }}
        mb={{ base: 8, lg: 0 }}
        w='100%'
      >
        <Flex
          flexDir={'column'}
          py={{ base: 8, lg: 16 }}
          pr={{ base: 0, lg: 8 }}
          gap={4}
        >


          <Heading
            size={isLg ? 'lg' : 'sm'}
            text="Conceitos de liberdade"
            isHighlighted
            highlightedText="liberdade"
            highlightColor="whiskey"
            color="alabaster"
            textAlign={{ base: 'center', lg: 'start' }}
          />

          <FreedomCompact />

          <Box mt={{ base: 6, lg: 6 }}>
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              color="alabaster"
              mt={{ base: 4, lg: 6 }}
              textAlign={{ base: 'justify', lg: 'start' }}
            >
              Desfrutar dessa liberdade pode ser difícil por acontecimentos da vida que não
              temos controle e que podem causar traumas e dores profundas.
              O processo de conviver e até de superar um trauma ou um luto é muito difícil e
              afeta a nossa capacidade de escolha, de ação e de sermos a nós mesmos.
              <br></br>
              <br></br>
              Atravessar pela vida com a dor de um trauma ou luto de forma solitária pode ser
              complicado, podendo causar ainda mais dor pela falta de compreensão e apoio.
              <br></br>
              <br></br>
              A psicoterapia individual ou em grupo ajuda a organizar pensamentos, sentimentos
              e crenças relacionados às situações de trauma ou luto, a atravessar por todas as
              consequências decorrentes dos acontecimentos dolorosos e a planejar e viver a vida apesar dessas situações que causam dor.
              <br></br>
              <br></br>
              Trazer fluidez para a vida, reorganizar a forma de estar no mundo leva um tempo,
              mas traz alivio, segurança, compreensão, amadurecimento e crescimento. E é possível
              viver uma vida com significado apesar da dor.

            </Text>
          </Box>
          {/* <Box mt={{ base: 6, lg: 12 }}>
            <Heading
              size={isLg ? 'sm' : 'xs'}
              text="Programa de Orientação de Carreira"
              color="alabaster"
              textAlign={{ base: 'center', lg: 'start' }}
            />
            <Box
              h="2px"
              bgColor="whiskey"
              w={40}
              mx={{ base: 'auto', lg: 0 }}
              mt={{ base: 2, lg: 0 }}
            />
            <Text
              fontSize={{ base: 'sm', lg: 'lg' }}
              color="alabaster"
              mt={{ base: 4, lg: 6 }}
              textAlign={{ base: 'center', lg: 'start' }}
            >
              É um processo que ajuda a Escolher e/ou Desenvolver uma carreira
              rentável e prazerosa mesmo que você esteja confuso (a) ou não saiba
              por onde começar.
            </Text>
            <Box mt={6}>
              <Heading
                size={isLg ? 'xs' : '2xs'}
                color="alabaster"
                text="Qual a visão do programa?"
                isHighlighted
                highlightColor="whiskey"
                highlightedText="visão"
              />
              <Flex
                direction="column"
                gap={{ base: 4, lg: 2.5 }}
                alignItems="start"
                mt={6}
              >
                <Flex gap={2} alignItems="center">
                  <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                  <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                    Clareza para saber o que se quer na própria carreira
                  </Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                  <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                    Ajuda para decidir como construir a sua carreira
                  </Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                  <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                    Fazer as pazes com a sua carreira atual (se não for o caso de
                    mudar)
                  </Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                  <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                    Escolher a carreira ideal para o seu perfil (se for o caso de
                    mudar)
                  </Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Box h="1px" w={{ base: 3, lg: 6 }} bgColor="whiskey"></Box>
                  <Text fontSize={{ base: 'sm', lg: 'lg' }} color="alabaster">
                    Crescer e prosperar na vida profissional
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Box> */}
          <Button
            variant="light"
            text="Agende uma sessão"
            prevText="Olá, acessei o site Natasha Macedo e gostaria de agendar uma sessão"
            mt={{ base: 6, lg: 12 }}
            mx={{ base: 'auto', lg: 0 }}
          />
        </Flex>

        <Flex
          bgImage="/assets/new-images/liberty.jpg"
          bgPos='bottom left'
          bgSize={'cover'}
          w='100%'
          h={['256px', '256px', 'auto', 'auto']}
        />
      </Flex>


    </Flex>
  )
}
