import { gql, useQuery } from "@apollo/client";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const GET_SINGLE_CHARACTER = gql`
query SingleCharacter($id: ID!) {
    character(id: $id) {
  
        name
        image
        status
        species
        id
          origin {
      name
    }
          location {
          name
        }
  
      
    }
  
  }
`;


export function SingleCharacter(props: {
    characterId: string
}) {

    const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {
        variables: {
            id: props.characterId
        }
    });

    console.log(data);


    const character = data?.character;

    return <Box>
        <Skeleton isLoaded={!!character}>
            <Heading fontSize={"2xl"} margin="1em 0">{character?.name}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!!character}>
            <Image src={character?.image} alt={character?.name} width={300} height={300} style={{ "margin": "0 auto 1em" }} />
        </Skeleton>
        <dl>
            <Skeleton isLoaded={!!character}>
                <dt>Status</dt>
                <dd>{character?.status}</dd>
            </Skeleton>
            <Skeleton isLoaded={!!character}>
                <dt>Species</dt>
                <dd>{character?.species}</dd>
            </Skeleton>
            <Skeleton isLoaded={!!character}>
                <dt>Origin</dt>
                <dd>{character?.origin.name}</dd>
            </Skeleton>
            <Skeleton isLoaded={!!character}>
                <dt>Last Known Location</dt>
                <dd>{character?.location.name}</dd>
            </Skeleton>
        </dl>
    </Box>
}