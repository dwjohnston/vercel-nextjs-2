"use client";

import Image from 'next/image'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react'

import { WelcomeModal } from '@/src/components/WelcomeModal';
import { UserBadge } from '@/src/components/UserBadge';
import { CurrentUserContextProvider, useCurrentUser } from '@/src/contexts/CurrentUserContext';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { ListOfCharacters } from '@/src/components/RickAndMorty/ListOfCharacters';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});


export default function Home() {


  return (
    <ApolloProvider client={client}>
    <ChakraProvider>
      <CurrentUserContextProvider>
        <Flex justifyContent={"flex-end"}> 
          <UserBadge/>
        </Flex>
        <WelcomeModal/>

        <ListOfCharacters/>
      </CurrentUserContextProvider>
    </ChakraProvider>
  </ApolloProvider>
  )
}
