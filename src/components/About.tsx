import {
  Box,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckCircle } from "phosphor-react";
import { Heading } from "./Heading";
import { Button } from "./Button";

export function About() {
  const isLg = useBreakpointValue({ lg: true });

  return (
    <Flex
    id='group-anchor'
      my={{ base: 3, lg: 12 }}
      px={[4, 4, 8, 8]}
      gap={{ base: 8, lg: 10 }}
      align="start"
      direction="column"
    >

      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent={{ base: "center" }}
        my={{ base: 8, lg: 8 }}
        pb={{ base: 10, lg: 0 }}
        gap={16}
      >

        <Flex flexDir={'column'} w={{ base: "100%", lg: "100%" }} gap={8}>

          <Flex flexDir={'column'} gap={8}>

            {/* Copiei o title de Psicoterapia individual e troquei por Grupos terapêuticos só pra ficar igual um com o outro, o jeito que vc havia feito está correto tbm.  */}
            <Flex direction="column" alignItems="center" justifyContent="center">

              <Image src="/assets/icon_logo_light.svg" alt="icon" h="100%" />
              <Heading
                textAlign={'center'}
                size={isLg ? 'lg' : 'md'}
                text={`Grupos terapêuticos`}
                color="brass"
              />

              <Box
                mt={5}
                h={1}
                display="inline-block"
                width="100%"
                bg="linear-gradient(90deg, hsla(0, 0%, 98%, 1) 0%, hsla(21, 50%, 59%, 1) 50%, hsla(0, 0%, 98%, 1) 100%)"
              />

            </Flex>

            <Text
              textAlign={{ base: "justify", lg: "start" }}
              fontSize={{ base: "md", lg: "lg" }}
              lineHeight={{ base: "md", lg: "lg" }}
            >
              Todas as pessoas que sofrem alguma dor por acontecimentos
              relacionados à Trauma e/ou Luto sentem a sua dor de forma
              diferente, mesmo tendo passado pela mesma situação. A forma como
              nós sofremos vai depender da relação entre o evento em si (o que
              aconteceu e qual a rede de apoio e confiança no momento do trauma)
              + nossa história + nossa personalidade.
            </Text>

          </Flex>

          {isLg ?
            ''
            :
            <Image
              display={isLg ? "inline" : "block"}
              src="/assets/new-images/window.jpg"
              objectFit={'cover'}
              alt="therapeutic_group"
            />
          }

          <Flex flexDir={'column'} gap={8}>
            <Heading
              text="Trabalhar psicoterapia em grupo relacionada a um luto compartilhado pode ajudar em diversos aspectos:"
              size={isLg ? "xs" : "xs"}
              isHighlighted
              fontWeight={'500'}
              highlightColor="brass"
              highlightedText={"psicoterapia em grupo"}
              textAlign={{ base: "start", lg: "start" }}
              mt={[2, 2, 8, 8]}
            />

            {/* O problema aqui é que quando utilizamos Flex, a tag Text sempre esticará de acordo com a quantidade de texto dentro dela, então o ideal é criar uma tag Flex dentro para limitar esse "esticar" do texto "Passar pela mesma perda em conjunto ajuda a não se perceber tão
            solitário na própria dor", por exemplo.
            
            Nesses casos aqui o ideal é fazer uma Flex pai e duas Flex filhos, onde dentro de uma você coloca um Icon e na outra você coloca a tag Text e definir um maxWidth na tag Flex que contém o Icon. Por exemplo:

            <Flex>
              <Flex maxWidth={isLg ? 32 : 18}>
                <CheckCircle size={isLg ? 32 : 18} color="#B16E51" />
              </Flex>
              <Flex>
                <Text>
                  Passar pela mesma perda em conjunto ajuda a não se perceber tão
                  solitário na própria dor
                </Text>
              </Flex>
            </Flex>
          */}
            <Flex gap={[1, 1, 4, 4]}>
              <Flex alignItems={'start'} pt={1}>
                <CheckCircle size={isLg ? 32 : 18} color="#B16E51" />
              </Flex>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                lineHeight={{ base: "md", lg: "lg" }}
              >
                Passar pela mesma perda em conjunto ajuda a não se perceber tão
                solitário na própria dor
              </Text>
            </Flex>

            <Flex gap={[1, 1, 4, 4]}>
              <Flex alignItems={'start'} pt={1}>
                <CheckCircle size={isLg ? 32 : 18} color="#B16E51" />
              </Flex>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                lineHeight={{ base: "md", lg: "lg" }}
              >
                A troca pode ser valorosa também porque apesar de passarem pelo
                mesmo acontecimento a forma de expressar, sentir e enfrentar a dor
                é diferente.
              </Text>
            </Flex>

            <Flex gap={[1, 1, 4, 4]}>
              <Flex alignItems={'start'} pt={1}>
                <CheckCircle size={isLg ? 32 : 18} color="#B16E51" />
              </Flex>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                lineHeight={{ base: "md", lg: "lg" }}
              >
                Mesmo respeitando a sua forma de enfrentar a própria dor (o
                acontecimento em si, a sua personalidade, história de vida), pode
                ser valioso integrar a forma de outros lidarem e encontrar novos
                recursos para atravessar pelo luto.
              </Text>
            </Flex>
            <Flex gap={[1, 1, 4, 4]}>
              <Flex alignItems={'start'} pt={1}>
                <CheckCircle size={isLg ? 32 : 18} color="#B16E51" />
              </Flex>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                lineHeight={{ base: "md", lg: "lg" }}
              >
                Mesmo respeitando a sua forma de enfrentar a própria dor (o
                acontecimento em si, a sua personalidade, história de vida), pode
                ser valioso integrar a forma de outros lidarem e encontrar novos
                recursos para atravessar pelo luto.
              </Text>
            </Flex>
          </Flex>

          {/* Aqui eu coloquei um botão pra dar a sensação de "final da seção" */}
          <Flex>
            {/* Botão whatsapp */}
            <Button
              text="Quero fazer parte!"
              prevText="Olá, acessei o site Natasha Macedo e gostaria de fazer parte de grupos terapêuticos."
              variant="light"
              w="100%"
            />
          </Flex>
        </Flex>

        {/* Aqui eu defini duas fotos porque a qualidade da imagem ficou muito baixa pro tamanho desejado no desktop (ficou mt esticada), mas do jeito que você fez é correto também, só preferi manter duas pra seguir o padrão do container "pscoterapia individual" que tem 3 fotinhas em coluna  */}
        
        {/* Ah, da uma reparadinha na propriedade "objectFit e objectPosition", elas são fundamentais pra não ter que ficar editando imagem no canva pra colocar no site */}
        {isLg ?
          <Flex w={{ base: "100%" }} maxW={'32vw'} flexDir={'column'} gap={2} >
            <Image
              display={isLg ? "inline" : "block"}
              src="/assets/new-images/support.jpg"
              objectFit={'cover'}
              objectPosition={'right'}
              alt="therapeutic_group"
              h="100%"
            />
            <Image
              display={isLg ? "inline" : "block"}
              src="/assets/new-images/window.jpg"
              objectFit={'cover'}
              objectPosition={-42}
              alt="therapeutic_group"
              h="100%"
            />
          </Flex>
          :
          ''
        }
      </Flex>
    </Flex>
  );
}
