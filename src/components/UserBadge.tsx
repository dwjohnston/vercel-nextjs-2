"use client"; 
import React from "react";
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { FaRegUser } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";

export function UserBadge() {
    const {currentUser, requestEdit} = useCurrentUser(); 
    if (!currentUser) {
        return null; 
    }

    return <Flex justifyContent="flex-end" alignItems={"center"} gap="0.5em" margin = "0.5em" data-testid="user-badge">
        <Box>
        <Icon as ={FaRegUser}/>
        </Box>
        <Box>
        <strong>{currentUser.name}</strong>
        <p>{currentUser.title}</p>
        </Box>

        <Box>
            <IconButton variant="ghost" icon={<FaPencil/>} aria-label='Edit' onClick={requestEdit}/>
        </Box>
    </Flex>

}