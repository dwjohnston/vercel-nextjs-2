"use client"; 
import { Box, Flex, Icon } from '@chakra-ui/react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { FaRegUser } from "react-icons/fa6";

export function UserBadge() {
    const [currentUser] = useCurrentUser(); 


    console.log(currentUser);

    if (!currentUser) {
        return null; 
    }

    return <Flex justifyContent="flex-end" alignItems={"center"} gap="0.5em" margin = "0.5em">
        <Box>
        <Icon as ={FaRegUser}/>
        </Box>
        <Box>
        <strong>{currentUser.name}</strong>
        <p>{currentUser.title}</p>
        </Box>
    </Flex>

}