import {
  Box,
  Flex,
  FlexProps,
  Grid,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

interface TopicProps extends FlexProps {
  title: string
  text: string
}

function Topic({ title, text, ...rest }: TopicProps) {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex alignItems="center" gap={{ base: 2, lg: 4 }} {...rest}>
      <Box h={{ base: 4, lg: 8 }} w="px" bgColor="olive"></Box>
      <Box>
        <Heading size={isLg ? 'xs' : '2xs'} color="siam" text={title} />
        <Text
          fontSize={{ base: 'sm', lg: 'lg' }}
          lineHeight={{ base: 'sm', lg: 'lg' }}
          color="bitter"
        >
          {text}
        </Text>
      </Box>
    </Flex>
  )
}

export function Curriculum() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      p={{ base: 8, lg: 20 }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'start', lg: 'end' }}
      justifyContent="space-between"
      gap={20}
    >
      {isLg && <Image src="/assets/curriculum.png" alt="curriculum" h="100%" />}
      <Box w="100%">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%"/>
          <Heading size={isLg ? 'lg' : 'sm'} text="Currículo" color="brass" />
        </Flex>
        <Box
          mt={5}
          h={1}
          display="inline-block"
          width="100%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>

        {!isLg && (
          <Image
            src="/assets/resume_img_mobile.png"
            alt="curriculum"
            w="calc(100vw - 4rem)"
            mt={-8}
          />
        )}

        <Box mt={{ base: 6, lg: 12 }} mx={{ base: 0, lg: 'auto' }}>
          <Grid
            gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 0, lg: 20 }}
            rowGap={{ base: 4, lg: 6 }}
          >
            <Topic title="Psicoterapeuta" text="Adultos" />
            <Topic title="Avaliação Psicológica" text="Pós-graduação - IPOG" />
            <Topic
              title="Orientadora de Carreira"
              text="Psicóloga - CRP 12/03015"
              gridColumnStart={1}
              gridColumnEnd={{ base: 1, lg: 3 }}
            />
            <Topic
              title="Análise Comportamental Clínica"
              text="Pós-graduação - IBAC/Brasília"
              gridColumnStart={1}
              gridColumnEnd={{ base: 1, lg: 3 }}
            />
            <Topic
              title="Life, Executive e Master Coach"
              text="Sociedade Latino Americana de Coaching"
              gridColumnStart={1}
              gridColumnEnd={{ base: 1, lg: 3 }}
            />
            <Topic
              title="Life Coach"
              text="Sociedade Brasileira de Coaching"
              gridColumnStart={1}
              gridColumnEnd={{ base: 1, lg: 3 }}
            />
          </Grid>
        </Box>
        {isLg && (
          <Button
            mt={12}
            text="Agende uma conversa gratuita"
            variant="dark"
            w="100%"
          />
        )}
      </Box>
    </Flex>
  )
}
