import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from './Heading'
import { MapPinLine } from 'phosphor-react'

export function Where() {
  const isLg = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
  })
  return (
    <Flex
      justifyContent="space-between"
      direction={{ base: 'column-reverse', lg: 'row' }}
      px={{ base: 0, sm: 0, lg: 20 }}
      pb={{ base: 8, lg: 20 }}
      gap={{ base: 6, lg: 20 }}
      id="address-anchor"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.124153604151!2d-48.55472138845028!3d-27.589680221730877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95273818ef455555%3A0x7725ad77008b53a3!2sAv.%20Prof.%20Othon%20Gama%20D&#39;E%C3%A7a%2C%20677%20-%20Sala%20904%20-%20Centro%2C%20Florian%C3%B3polis%20-%20SC%2C%2088015-240!5e0!3m2!1spt-BR!2sbr!4v1716239433864!5m2!1spt-BR!2sbr"
        width={isLg ? '752' : 'calc(100vw)'}
        height="384"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems={{ base: 'center', lg: 'end' }}
        flex="1"
        flexGrow={1}
        px={{ base: 8, lg: 0 }}
      >
        <Heading
          text="Onde você pode me encontrar"
          size={isLg ? 'lg' : 'sm'}
          isHighlighted
          highlightedText={['Onde', 'encontrar']}
          highlightColor="brass"
          textAlign={{ base: 'center', lg: 'end' }}
        />
        <Flex
          direction="column"
          alignItems={{ base: 'start', lg: 'end' }}
          mt={{ base: 6, lg: 0 }}
        >
          <Flex
            align={{ base: 'end', lg: 'center' }}
            gap={{ base: 1, lg: 2 }}
            mb={{ base: 1, lg: 2 }}
          >
            <Heading size={isLg ? 'xs' : '2xs'} text="Endereço" color="siam" />
            <MapPinLine weight="light" color="#67705F" size={isLg ? 28 : 20} />
          </Flex>
          <Box bgColor="brass" h={0.5} w={{ base: 20, lg: 32 }} />
          <Text
            fontSize={{ base: 'sm', lg: 'md' }}
            lineHeight={{ base: 'sm', lg: 'md' }}
            textAlign={{ base: 'start', lg: 'end' }}
            mt={3}
          >
            Avenida Professor Othon Gama Deça 677 sala 904 Centro-
            Florianópolis-SC
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
