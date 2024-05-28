import { Heading } from '@/components/Heading'
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import {
  Envelope,
  InstagramLogo,
  MapPinLine,
  WhatsappLogo,
} from 'phosphor-react'

export function Main() {
  const isLg = useBreakpointValue({ lg: true })
  return isLg ? (
    <Flex position="relative">
      <Flex gap={12} direction="column" pl={20} pr={16} mt={48}>
        <Box
          bgColor="olive"
          p={{ base: 4, lg: 5 }}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
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
        >
          <MapPinLine size={isLg ? 32 : 24} color="#fbfbfb" />
        </Box>
      </Flex>
      <Image src="/assets/mainImg.png" alt="mainImg" h="700px" />
      <Box pr={20} pl={16} pt={20}>
        <Flex justifyContent="space-between">
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={4}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
          >
            PSICOTERAPIA
          </Text>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={4}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
          >
            ORIENTAÇÃO DE CARREIRA
          </Text>
        </Flex>
        <Box mt={12}>
          <Heading size="xs" text="Olá!" color="siam" />
          <Heading
            size="lg"
            text="Sou Natasha Macedo,"
            color="siam"
            isHighlighted
            highlightedText="Natasha Macedo,"
            highlightColor="brass"
          />
          <Text fontSize="lg" mt={6}>
            sou Psicóloga Clínica e Especialista em Desenvolvimento de Carreira,
            formada há 23 anos.
          </Text>
          <Text fontSize="lg" mt={4}>
            Minha atuação profissional é focada em aprofundar o autoconhecimento
            para que as pessoas se sintam mais livres para viver uma vida que
            faça sentido, seja na vida pessoal ou profissional.
          </Text>
        </Box>
      </Box>
      <Image
        src="/assets/logo.png"
        alt="logo"
        h={24}
        position="absolute"
        top={12}
        left={20}
      />
    </Flex>
  ) : (
    <>
      <Box
        bg="linear-gradient(180deg, hsla(0, 0%, 98%, 1) 20%, hsla(21, 50%, 59%, 1) 60%)"
        h="37rem"
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
          >
            <MapPinLine size={isLg ? 32 : 24} color="#fbfbfb" />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mt={4} px={8}>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={2}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
          >
            PSICOTERAPIA
          </Text>
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            py={2}
            px={2}
            borderRadius="full"
            border="1px solid"
            borderColor="brass"
            transition="all .2s ease"
            _hover={{ bgColor: 'brass', color: 'alabaster' }}
            cursor="pointer"
          >
            ORIENTAÇÃO DE CARREIRA
          </Text>
        </Flex>
        <Image
          src="/assets/natasha_main_mobile.png"
          alt="mainImg"
          w="calc(100vw - 4rem)"
          position="absolute"
          bottom={0}
          left="2rem"
        />
      </Box>
      <Box mx={8} mb={6}>
        <Heading size="2xs" text="Olá!" color="siam" />
        <Heading
          size="sm"
          text="Sou Natasha Macedo,"
          color="siam"
          isHighlighted
          highlightedText="Natasha Macedo,"
          highlightColor="brass"
        />
        <Text fontSize="sm" mt={3}>
          sou Psicóloga Clínica e Especialista em Desenvolvimento de Carreira,
          formada há 23 anos.
        </Text>
        <Text fontSize="sm" mt={2}>
          Minha atuação profissional é focada em aprofundar o autoconhecimento
          para que as pessoas se sintam mais livres para viver uma vida que faça
          sentido, seja na vida pessoal ou profissional.
        </Text>
      </Box>
    </>
  )
}
