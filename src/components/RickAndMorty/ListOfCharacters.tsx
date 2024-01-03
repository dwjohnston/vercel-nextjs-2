"use client";
import React from "react";
import {  useQuery } from "@apollo/client";
import {gql} from "../../__generated__/gql";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import Link from "next/link";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { SingleCharacter } from "./RickAndMortyCharacter";

import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});


const GET_CHARACTERS = gql(`
query GetAllCharacters {
  characters(page: 1) {

    results {
      id
      name
      image

    }
  }

}
`);


type CharacterPreview = {
    id: string; 
    name: string; 
    image: string; 
}

export function ListOfCharacters() {
    return <ApolloProvider client={client}>
        <ListOfCharactersInner/>
    </ApolloProvider>
}

export function ListOfCharactersInner() {

    const {isEditing} = useCurrentUser();
    const { loading, error, data } = useQuery(GET_CHARACTERS);

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const selectedCharacterId = searchParams.get('selectedCharacter')
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )


    if (isEditing){
        return null;
    }

    return <>

        {selectedCharacterId && <Modal  isOpen={true} onClose={() => {
          router.push(pathname)

        }}>
            <ModalOverlay />
            <ModalContent minHeight={300} data-testid="character-modal">
                <ModalCloseButton />
                <ModalBody>
                    <SingleCharacter characterId={selectedCharacterId}/>
                </ModalBody>

            </ModalContent>
        </Modal>}

        <Flex flexFlow={"row wrap"} gap="1em"  padding="2em" justifyContent={"center"}>
            {data?.characters.results.map((v: CharacterPreview) => {
                return <Link key={v.id} href={pathname + '?' + createQueryString('selectedCharacter', v.id)} aria-label={`${v.name}`}
                ><Box >
                        <Text fontSize="m">{v.name}</Text>
                        <Image src={v.image} alt={v.name} width={300} height={300} />
                    </Box>
                </Link>
            })}
        </Flex>
    </>

}
