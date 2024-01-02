import { gql, useQuery } from "@apollo/client";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

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
     
    if(!character) {
        return null; 
    }


    return <Box>
        <Heading fontSize={"2xl"} margin="1em 0">{character.name}</Heading>
        <Image src={character.image} alt={character.name} width={300} height={300} style={{"margin": "0 auto 1em"}} />
        <dl>
            <dt>Status</dt>
            <dd>{character.status}</dd>

            <dt>Species</dt>
            <dd>{character.species}</dd>

            <dt>Origin</dt>
            <dd>{character.origin.name}</dd>
            <dt>Last Known Location</dt>
            <dd>{character.location.name}</dd>
        </dl>
    </Box>
}