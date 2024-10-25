import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { Heading } from './Heading'
import { Button } from './Button'
import { motion } from 'framer-motion'
import { InView, useInView } from 'react-intersection-observer';
import { keyframes } from '@emotion/react'
import { useEffect, useRef } from 'react';
import { AnimatedButton } from './AnimatedButtons';

export function CanIHelp() {
  const isLg = useBreakpointValue({ lg: true })

  const animationKeyframes = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0px) }
`;

  const animation = `${animationKeyframes} 1s ease-in-out 2`;

  const { ref, inView } = useInView({
    threshold: 0.5, // Define o limite para considerar o elemento como visível (50% da altura)
  });

  return (
    <Flex
      flexDir={'column'}
      px={{ base: 1, lg: 12 }}
      py={{ base: 12, lg: 24 }}
      gap={{ base: 8, lg: 8 }}
      alignItems={{ base: 'center', lg: 'start' }}
      lineHeight={{ base: 'sm', lg: 'lg' }}
    >

      <Flex
        flexDir={'column'}
      >
        <Flex>
          <Heading
            size={isLg ? 'lg' : 'sm'}
            text="No que posso te ajudar?"
            isHighlighted
            highlightedText="ajudar"
            highlightColor="whiskey"
            color={'siam'}
            textAlign={{ base: 'center', lg: 'start' }}
          />
        </Flex>
      </Flex>

      <Flex
        direction={{ base: 'column', lg: 'column' }}
        mb={{ base: 8, lg: 0 }}
        w='100%'
      >

        <Flex
          ref={ref}
          w='100%'
          bgImage="/assets/new-images/canihelp.jpg"
          bgPos='top'
          bgSize={'cover'}
          boxShadow={'lg'}
        >
          <Flex
            w='100%'
            h={['360px', '360px', '512px', '720px']}
            alignItems={'end'}
          >
            <Flex
              w='100%'
              h={['80px', '80px', '256px', '256px']}
              pb={[4,4,0,0]}
              flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
              gap={[4, 4, 0, 0]}
            >
              <AnimatedButton
                inView={inView}
                animation={animation}
                title='Psicoterapia Individual'
                id="#psicotherapy-anchor"
              />
              <AnimatedButton
                inView={inView}
                animation={animation}
                title='Grupos Terapêuticos'
                id="#group-anchor"
              />

            </Flex>
          </Flex>
        </Flex>

      </Flex>


    </Flex>
  )
}


// {/* MODAL ACIONADO PELOS "Psicoterapia individual" ou "Grupos Terapêuticos" */ }

// <Drawer
//   isOpen={isOpen}
//   placement='bottom'
//   onClose={onClose}
// >
//   <DrawerOverlay />
//   <DrawerContent>


//     <DrawerBody>
//       <Flex
//         bgColor={'siam'}
//         flexDir={'column'}
//         py={{ base: 8, lg: 16 }}
//         pr={{ base: 0, lg: 8 }}
//         pl={{ base: 0, lg: 8 }}
//         gap={4}
//       >
//         <Flex
//           position={'absolute'}
//           top={4}
//           right={4}
//         >
//           <DrawerCloseButton fontWeight={'thin'} color={'alabaster'} _hover={{ color: 'whiskey', transition: "360ms" }} />
//         </Flex>

//         <Heading
//           size={isLg ? 'lg' : 'sm'}
//           text="Psicoterapia Individual (presencial ou online)"
//           isHighlighted
//           highlightedText="(presencial ou online)"
//           highlightColor="whiskey"
//           color='alabaster'
//           textAlign={{ base: 'center', lg: 'start' }}
//         />


//         <Box mt={{ base: 6, lg: 6 }}>
//           <Text
//             color='alabaster'
//             fontSize={{ base: 'sm', lg: 'lg' }}
//             mt={{ base: 4, lg: 6 }}
//             textAlign={{ base: 'justify', lg: 'start' }}
//           >
//             A Psicoterapia individual é um processo de aprendizagem de si mesmo, de autoconhecimento, no sentido
//             de promover a compreensão do próprio funcionamento de forma profunda e decidir o que é preciso mudar.
//             Neste processo de mudança existe o suporte para o desenvolvimento de novas habilidades.
//             Sempre respeitando a história de vida, o contexto e quem é essa pessoa hoje.
//             <br></br>
//             <br></br>
//             O processo parte da queixa, história de vida e entendimento sobre os comportamentos atuais
//             (sejam pensamentos, sentimentos ou atitudes), ou seja, a forma de lidar com o que acontece
//             na vida e o quanto isso incomoda ou ajuda a viver uma vida que se quer viver.
//             <br></br>
//             <br></br>
//             É preciso entender o funcionamento da pessoa em terapia dentro do contexto de vida dela: como foi a construção
//             da sua identidade, como é o conceito que tem de si, como enxerga o mundo em que vive e como ela se
//             comporta em diversos ambientes.
//             <br></br>
//             <br></br>
//             Psicoterapia pode ter também por objetivo trabalhar qualquer trauma, luto (perdas como divorcio, morte, doença, demissão ou outras), medos extremos, inseguranças, crises de ansiedade, ou para aprofundar o autoconhecimento, com foco no equilíbrio emocional, desenvolvimento de autoestima e melhorar a qualidade dos relacionamentos.

//           </Text>
//         </Box>

//         <Button
//           variant="light"
//           text="Agende uma sessão"
//           mt={{ base: 6, lg: 12 }}
//           mx={{ base: 'auto', lg: 0 }}
//         />
//       </Flex>
//     </DrawerBody>
//   </DrawerContent>
// </Drawer>