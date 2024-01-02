import Image from 'next/image'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'; 
import { WelcomeModal } from '@/src/components/WelcomeModal';
import { UserBadge } from '@/src/components/UserBadge';
import { CurrentUserContextProvider } from '@/src/contexts/CurrentUserContext';



export default function Home() {

  return (
    <ChakraProvider>
      <CurrentUserContextProvider>
        <Flex justifyContent={"flex-end"}> 
          <UserBadge/>
        </Flex>
        <WelcomeModal/>
      </CurrentUserContextProvider>
    </ChakraProvider>
  )
}
