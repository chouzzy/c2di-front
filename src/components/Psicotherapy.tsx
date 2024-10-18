import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'

export function Psicotherapy() {
  const isLg = useBreakpointValue({ lg: true })

  return (
    <Flex
      p={{ base: 8, lg: 12 }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'start', lg: 'end' }}
      gap={20}
      id="psicotherapy-anchor"
    >
      {/* {isLg && (
        <Image src="/assets/psicotherapy.png" alt="psicotherapy" h="100%" />
      )} */}
      <Flex
        gap={16}
      >

        {/* Side images */}
        {isLg && (
          <Flex flexDir={'column'}>
            <Flex flexDir='column' w='100%' maxW={'52vw'} gap={2} >

              <Image src="/assets/new-images/atendimento-1.jpg" alt="Imagem ilustrativa" />
              <Image src="/assets/new-images/atendimento-2.jpg" alt="Imagem ilustrativa"/>
              <Image src="/assets/new-images/whatsapp-image.jpg" alt="Imagem ilustrativa"/>

            </Flex>
          </Flex>
        )}

        {/* Psicoterapia individual */}
        <Flex flexDir={'column'} w='100%' justifyContent={'space-between'}>

          <Flex direction="column" alignItems="center" justifyContent="center">

            <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" />
            <Heading
              textAlign={'center'}
              size={isLg ? 'lg' : 'md'}
              text={`Psicoterapia individual`}
              color="brass"
            />
            <Heading
              textAlign={'center'}
              size={isLg ? 'lg' : 'md'}
              text={`presencial ou online`}
              color="brass"
            />

          </Flex>
          <Box
            mt={5}
            h={1}
            display="inline-block"
            width="100%"
            bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
          />
          {/* 
          {!isLg && (
            <Image
              src="/assets/therapy_mobile.png"
              alt="curriculum"
              w="calc(100vw - 4rem)"
              mt={-7}
            />
          )} */}

          {/* Textos sobre psicoterapia */}
          <Flex
            mt={{ base: 12, lg: 6 }}
            textAlign="justify"
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: 'md', lg: 'lg' }}
            flexDir={'column'}
          >

            <Text>
              A Psicoterapia individual é um processo de aprendizagem de si mesmo, de autoconhecimento, no sentido
              de promover a compreensão do próprio funcionamento de forma profunda e decidir o que é preciso mudar.
              Neste processo de mudança existe o suporte para o desenvolvimento de novas habilidades.
              Sempre respeitando a história de vida, o contexto e quem é essa pessoa hoje.
            </Text>
            <br></br>
            
            {!isLg && (
              <Image src="/assets/new-images/atendimento-1.jpg" alt="Imagem ilustrativa" py={4} />
            )}

            <br></br>
            <Text>
              O processo parte da queixa, história de vida e entendimento sobre os comportamentos atuais
              (sejam pensamentos, sentimentos ou atitudes), ou seja, a forma de lidar com o que acontece na vida
              e o quanto isso incomoda ou ajuda a viver uma vida que se quer viver.
            </Text>
            <br></br>

            <Text>
              É preciso entender o funcionamento da pessoa em terapia dentro do contexto de vida dela: como foi
              a construção da sua identidade, como é o conceito que tem de si, como enxerga o mundo em que vive
              e como ela se comporta em diversos ambientes.
            </Text>
            <br></br>

            {!isLg && (
              <Image src="/assets/new-images/atendimento-2.jpg" alt="Imagem ilustrativa" py={4} />
            )}

            <br></br>

            <Text>
              Psicoterapia pode ter também por objetivo trabalhar qualquer trauma, luto (perdas como divorcio, morte,
              doença, demissão ou outras), medos extremos, inseguranças, crises de ansiedade, ou para aprofundar
              o autoconhecimento, com foco no equilíbrio emocional, desenvolvimento de autoestima e melhorar a qualidade dos relacionamentos.
            </Text>

            {!isLg && (
              <Image src="/assets/new-images/whatsapp-image.jpg" alt="Imagem ilustrativa" py={4} />
            )}

          </Flex>

          {/* Botão whatsapp */}
          <Button
            mt={{ base: 0, lg: 12 }}
            text="Quero fazer psicoterapia individual"
            variant="dark"
            w="100%"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
