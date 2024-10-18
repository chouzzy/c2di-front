import { Heading } from '@/components/Heading'
import {
  Box,
  Flex,
  Highlight,
  Image,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Envelope,
  InstagramLogo,
  MapPinLine,
  WhatsappLogo,
} from 'phosphor-react'

export function Main() {

  const isLg = useBreakpointValue({ lg: true })

  return isLg ? (

    <Flex position="relative" pb={4}>

      <Flex gap={12} direction="column" pl={12} pr={8} mt={48}>
        <Box
          bgColor="olive"
          p={{ base: 4, lg: 5 }}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          as={Link}
          href="https://www.instagram.com/natashamacedopsi/"
          target="_blank"
        >
          <InstagramLogo size={isLg ? 32 : 24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={{ base: 4, lg: 5 }}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          as={Link}
          href="https://wa.me/4899985535"
          target="_blank"
        >
          <WhatsappLogo size={isLg ? 32 : 24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={{ base: 4, lg: 5 }}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          as={Link}
          href="mailto:contato@natashamacedopsicologia.com.br"
          target="_blank"
        >
          <Envelope size={isLg ? 32 : 24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={{ base: 4, lg: 5 }}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
          as={Link}
          href="#address-anchor"
        >
          <MapPinLine size={isLg ? 32 : 24} color="#fbfbfb" />
        </Box>
      </Flex>
      <Image src="/assets/new-images/bem-vindos-desktop.png" alt="mainImg" h="700px" maxW='560px' objectFit={'cover'} borderBottomRadius={'48%'} />
      <Box pr={20} pl={24} pt={12}>
        <Flex justifyContent="space-between" gap={12}>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={4}
            textAlign={'center'}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
            as={Link}
            href="#psicotherapy-anchor"
          >
            PSICOTERAPIA INDIVIDUAL
          </Text>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={4}
            textAlign={'center'}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
            as={Link}
            href="#career-anchor"
          >
            GRUPOS TERAPÊUTICOS
          </Text>
        </Flex>
        <Box mt={12}>
          <Heading size="xs" text="Olá!" color="siam" />
          <Heading
            size="lg"
            text="Meu nome é Natasha Macedo,"
            color="siam"
            isHighlighted
            highlightedText="Natasha Macedo,"
            highlightColor="brass"
          />
          <Text fontSize="lg" mt={6}>
            <Highlight
              query={['Psicóloga Clínica', 'Pós Graduada em Avaliação Psicológica', 'Análise Comportamental Clinica']}
              styles={{ fontWeight: 'semibold', color: 'siam' }}
            >
              Sou Psicóloga Clínica e Pós Graduada em Avaliação Psicológica e Análise Comportamental Clinica.
            </Highlight>
          </Text>
          <Text fontSize="1.125rem" mt={4}>
            <Highlight
              query={['FAP']}
              styles={{ fontWeight: 'medium', color: 'siam' }}
            >
              Sou Analista do Comportamento, com foco em trauma e luto, além de atuar com as terapias contextuais:

              FAP (Psicoterapia Análitica Funcional) e
            </Highlight>
            <br></br>
            <Highlight
              query={['ACT']}
              styles={{ fontWeight: 'medium', color: 'siam' }}
            >
              ACT (Terapia de Aceitação e Compromisso).
            </Highlight>
            <br></br>
          </Text>
          <Text fontSize="1.125rem" mt={4}>
          Minha atuação profissional é focada em aprofundar o autoconhecimento 
          para que as pessoas possam se sentir mais livres para viver uma vida com significado.
          </Text> 
        </Box>
      </Box>
      <Image
        src="/assets/logo.png"
        alt="logo"
        h={24}
        position="absolute"
        top={12}
        left={12}
      />
    </Flex>
  ) : (
    <>
      <Flex
        bg="linear-gradient(180deg, hsla(0, 0%, 98%, 1) 20%, hsla(41, 50%, 79%, 1) 60%)"
        flexDir={'column'}
        mb={4}
        borderBottomRadius="full"
        overflow="hidden"
        position="relative"
      >
        <Image src="/assets/logo.png" alt="logo" h={14} mx="auto" mt={2} />
        <Flex gap={6} px={8} mt={4} justifyContent="center">
          <Box
            bgColor="olive"
            p={3}
            borderRadius="full"
            boxShadow="default"
            transition="all 0.3s ease"
            _hover={{ bgColor: 'bitter' }}
            cursor="pointer"
            as={Link}
            href="https://www.instagram.com/natashamacedopsi/"
            target="_blank"
          >
            <InstagramLogo size={isLg ? 32 : 24} color="#fbfbfb" />
          </Box>
          <Box
            bgColor="olive"
            p={3}
            borderRadius="full"
            boxShadow="default"
            transition="all 0.3s ease"
            _hover={{ bgColor: 'bitter' }}
            cursor="pointer"
            as={Link}
            href="https://wa.me/4899985535"
            target="_blank"
          >
            <WhatsappLogo size={isLg ? 32 : 24} color="#fbfbfb" />
          </Box>
          <Box
            bgColor="olive"
            p={3}
            borderRadius="full"
            boxShadow="default"
            transition="all 0.3s ease"
            _hover={{ bgColor: 'bitter' }}
            cursor="pointer"
            as={Link}
            href="mailto:contato@natashamacedopsicologia.com.br"
            target="_blank"
          >
            <Envelope size={isLg ? 32 : 24} color="#fbfbfb" />
          </Box>
          <Box
            bgColor="olive"
            p={3}
            borderRadius="full"
            boxShadow="default"
            transition="all 0.3s ease"
            _hover={{ bgColor: 'bitter' }}
            cursor="pointer"
            as={Link}
            href="#address-anchor"
          >
            <MapPinLine size={isLg ? 32 : 24} color="#fbfbfb" />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mt={4} px={8} gap={12}>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={2}
            textAlign={'center'}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
            as={Link}
            href="#psicotherapy-anchor"
          >
            PSICOTERAPIA INDIVIDUAL
          </Text>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={2}
            textAlign={'center'}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
            as={Link}
            href="#career-anchor"
          >
            GRUPOS TERAPÊUTICOS
          </Text>
        </Flex>
        <Image
          src="/assets/new-images/bem-vindos-desktop.png"
          alt="mainImg"
          mx='auto'
          mt={4}
          w="calc(100vw - 2rem)"
          // position="absolute"
          bottom={0}
          borderTopRadius={'full'}
        />
      </Flex>
      <Box mx={8} mb={6} pt={4}>
        <Heading  textAlign={'center'}size="xs" text="Olá!" color="siam" />
        <Heading
        textAlign={'center'}
          size="sm"
          text="Meu nome é Natasha Macedo,"
          color="siam"
          isHighlighted
          highlightedText="Natasha Macedo,"
          highlightColor="brass"
        />
        <Text fontSize="md" mt={3} textAlign={'center'} pt={2}>
          <Highlight
            query={['Psicóloga Clínica', 'Pós Graduada em Avaliação Psicológica', 'Análise Comportamental Clinica']}
            styles={{ fontWeight: 'semibold', color: 'siam' }}
          >
            Sou Psicóloga Clínica e Pós Graduada em Avaliação Psicológica e Análise Comportamental Clinica.
          </Highlight>
        </Text>
        <Text fontSize="0.875rem" textAlign={'justify'} mt={4}>
            <Highlight
              query={['FAP']}
              styles={{ fontWeight: 'medium', color: 'siam' }}
            >
              Sou Analista do Comportamento, com foco em trauma e luto, além de atuar com as terapias contextuais:

              FAP (Psicoterapia Análitica Funcional) e
            </Highlight>
            <br></br>
            <Highlight
              query={['ACT']}
              styles={{ fontWeight: 'medium', color: 'siam' }}
            >
              ACT (Terapia de Aceitação e Compromisso).
            </Highlight>
            <br></br>
          </Text>
          <Text fontSize="0.875rem" textAlign={'justify'} mt={4}>
          Minha atuação profissional é focada em aprofundar o autoconhecimento 
          para que as pessoas possam se sentir mais livres para viver uma vida com significado.
          </Text> 
      </Box>
    </>
  )
}
