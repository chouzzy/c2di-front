import { Heading } from '@/components/Heading'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import {
  Envelope,
  InstagramLogo,
  MapPinLine,
  WhatsappLogo,
} from 'phosphor-react'

export function Main() {
  return (
    <Flex position="relative">
      <Flex gap={12} direction="column" pl={20} pr={16} mt={48}>
        <Box
          bgColor="olive"
          p={5}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
        >
          <InstagramLogo size={32} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={5}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
        >
          <WhatsappLogo size={32} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={5}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
        >
          <Envelope size={32} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="olive"
          p={5}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'bitter' }}
          cursor="pointer"
        >
          <MapPinLine size={32} color="#fbfbfb" />
        </Box>
      </Flex>
      <Image src="/assets/mainImg.png" alt="mainImg" h="700px" />
      <Box pr={20} pl={16} pt={20}>
        <Flex justifyContent="space-between">
          <Text
            fontSize="md"
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
            fontSize="md"
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
          <Heading size="xs" text="Sejam bem vindos!" color="siam" />
          <Heading
            size="lg"
            text="Me chamo Natasha Macedo,"
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
  )
}
