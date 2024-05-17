import {
  Button as ChakraButton,
  Text,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import { CaretRight } from 'phosphor-react'

interface ButtonProps extends ChakraButtonProps {
  variant: 'light' | 'dark'
  text: string
}

export function Button({ variant, text, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      bgColor={variant === 'light' ? 'whiskey' : 'bitter'}
      py={6}
      px={8}
      _hover={{ bgColor: variant === 'light' ? 'brass' : 'siam' }}
      display="flex"
      alignItems="center"
      gap={2}
      borderRadius="lg"
      borderBottomLeftRadius="sm"
      fontWeight="light"
      {...rest}
    >
      <Text size="lg" color="alabaster" lineHeight="lg">
        {text}
      </Text>
      <CaretRight size={18} color="#fbfbfb" weight="light" />
    </ChakraButton>
  )
}
