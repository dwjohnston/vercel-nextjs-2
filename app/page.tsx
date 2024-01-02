import Image from 'next/image'
import { ChakraProvider } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
        <Button colorScheme='blue'>Button</Button>
    </ChakraProvider>
  )
}
