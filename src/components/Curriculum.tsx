import { Box, Flex, FlexProps, Grid, Image, Text } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

interface TopicProps extends FlexProps {
  title: string
  text: string
}

function Topic({ title, text, ...rest }: TopicProps) {
  return (
    <Flex alignItems="center" gap={4} {...rest}>
      <Box h={8} w="px" bgColor="olive"></Box>
      <Box>
        <Heading size="xs" color="siam" text={title} />
        <Text fontSize="lg" lineHeight="lg" color="bitter">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}

export function Curriculum() {
  return (
    <Flex p={20} alignItems="end" justifyContent="space-between" gap={20}>
      <Image src="/assets/curriculum.png" alt="curriculum" h="100%" />
      <Box>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" />
          <Heading size="lg" text="Currículo" color="brass" />
        </Flex>
        <Box
          mt={5}
          h={1}
          display="inline-block"
          width="100%"
          bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
        ></Box>
        <Box mt={12} mx="auto">
          <Grid gridTemplateColumns="1fr 1fr" gap={20} rowGap={6}>
            <Topic title="Psicóloga" text="CRP 12/03015" />
            <Topic title="Analista" text="PDA e Disc" />
            <Topic title="Psicoterapeuta" text="Adultos" />
            <Topic title="Psicoterapeuta" text="Orientadora de Carreira" />
            <Topic
              title="Análise Comportamental Clínica"
              text="Pós-graduação - IBAC/Brasília"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
            <Topic
              title="Avaliação Psicológica"
              text="Pós-graduação - IPOG"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
            <Topic
              title="Life, Executive e Master Coach"
              text="Sociedade Latino Americana de Coaching"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
            <Topic
              title="Life Coach"
              text="Sociedade Brasileira de Coaching"
              gridColumnStart={1}
              gridColumnEnd={3}
            />
          </Grid>
        </Box>
        <Button
          mt={12}
          text="Quero fazer psicoterapia individual"
          variant="dark"
          w="100%"
        />
      </Box>
    </Flex>
  )
}
