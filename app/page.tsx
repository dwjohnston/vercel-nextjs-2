

import {  ChakraProvider, Flex } from '@chakra-ui/react'

import { WelcomeModal } from '@/src/components/WelcomeModal';
import { UserBadge } from '@/src/components/UserBadge';
import { CurrentUserContextProvider } from '@/src/contexts/CurrentUserContext';
import { ListOfCharacters } from '@/src/components/RickAndMorty/ListOfCharacters';



export default function Home() {
  return (
    <ChakraProvider>
      <CurrentUserContextProvider>
        <Flex justifyContent={"flex-end"}> 
          <UserBadge/>
        </Flex>
        <WelcomeModal/>
        <ListOfCharacters/>
      </CurrentUserContextProvider>
    </ChakraProvider>
  )
}
