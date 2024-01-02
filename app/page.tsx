"use client";

import Image from 'next/image'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'

import { WelcomeModal } from '@/src/components/WelcomeModal';
import { UserBadge } from '@/src/components/UserBadge';
import { CurrentUserContextProvider, useCurrentUser } from '@/src/contexts/CurrentUserContext';



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
