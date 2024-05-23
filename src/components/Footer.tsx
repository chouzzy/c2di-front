import { Box, Flex, Highlight, Image, Text } from '@chakra-ui/react'
import {
  Envelope,
  InstagramLogo,
  MapPinLine,
  WhatsappLogo,
} from 'phosphor-react'

export function Footer() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      py={{ base: 8, sm: 8, lg: 20 }}
      px={{ base: 8, sm: 8, lg: 40 }}
      bgColor="siam"
    >
      <Image
        src="/assets/logo_light.png"
        alt="logo"
        maxH={{ base: 32, sm: 32, lg: 48 }}
      />
      <Text
        fontSize={{ base: 'sm', sm: 'sm', lg: 'lg' }}
        lineHeight={{ base: 'sm', sm: 'sm', lg: 'lg' }}
        color="alabaster"
        mt={{ base: -2, sm: -2, lg: -8 }}
        textAlign="center"
        maxW={{ base: 40, sm: 40, lg: 'fit-content' }}
      >
        Liberdade de escolha. Liberdade de ação. Liberdade de ser.
      </Text>
      <Box
        mt={{ base: 4, sm: 4, lg: 12 }}
        mb={{ base: 8, sm: 8, lg: 12 }}
        display="inline-block"
        width="100%"
        bg="linear-gradient(90deg, hsla(92, 8%, 41%, 1) 0%, hsla(85, 7%, 53%, 1) 50%, hsla(92, 8%, 41%, 1) 100%)"
        h={1}
      />
      <Flex gap={{ base: 6, sm: 6, lg: 12 }}>
        <Box
          bgColor="whiskey"
          p={3}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <InstagramLogo size={24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="whiskey"
          p={3}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <WhatsappLogo size={24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="whiskey"
          p={3}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <Envelope size={24} color="#fbfbfb" />
        </Box>
        <Box
          bgColor="whiskey"
          p={3}
          borderRadius="full"
          boxShadow="default"
          transition="all 0.3s ease"
          _hover={{ bgColor: 'brass' }}
          cursor="pointer"
        >
          <MapPinLine size={24} color="#fbfbfb" />
        </Box>
      </Flex>
      <Text fontSize="sm" lineHeight="sm" color="alabaster" mt={8}>
        <Highlight
          query="awer.co"
          styles={{ fontWeight: 'bold', color: 'alabaster' }}
        >
          feito com ♡ por awer.co
        </Highlight>
      </Text>
    </Flex>
  )
}
