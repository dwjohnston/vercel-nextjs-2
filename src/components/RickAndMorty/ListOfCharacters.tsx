"use client";
import React from "react";
import {  useQuery } from "@apollo/client";
import {gql} from "../../__generated__/gql";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
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
import { Characters, GetAllCharactersQuery } from "../../__generated__/graphql";

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


export function ListOfCharacters() {
    return <ApolloProvider client={client}>
        <ListOfCharactersInner/>
    </ApolloProvider>
}

export function CharacterCard(props: {
    //eeeewwwww
    character: NonNullable<NonNullable<NonNullable<Required<GetAllCharactersQuery>['characters']>['results']>[number]>
}) {
    const character  = props.character;
    return <Card padding ="0.75em"  
    // Chakra's animation is a bit tedious
    _hover={{ boxShadow: "1px  1px  1px 1px rgba(0, 0, 0, 0.3)" }}
    transition={"box-shadow 0.3s ease"}
    >
            <Text fontSize="m" align={"center"} marginBottom="0.75em">{character.name}</Text>
            {character.image && <Image src={character.image} alt={character.name ?? "Unknown Character"} width={300} height={300} />}
    </Card>
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
            {data?.characters?.results?.map((v) => {

                if(!v || !v.id){
                    return null; 
                }
                return <Link key={v.id} href={pathname + '?' + createQueryString('selectedCharacter', v.id)} aria-label={`${v.name}`}
                >   
                  <CharacterCard character={v} key={v.id}/>
                </Link>
            })}
        </Flex>
    </>

}
