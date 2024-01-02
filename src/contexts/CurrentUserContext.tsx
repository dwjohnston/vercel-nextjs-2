"use client";
import React, { useContext, useState } from "react";

 
type CurrentUser = {
    name: string; 
    title: string; 
}

export const CurrentUserContext = React.createContext<{
    currentUser: CurrentUser | null; 
    setCurrentUser: (user: CurrentUser) => void;
}>({
    currentUser: null, 
    setCurrentUser: () => {}
}); 

export function CurrentUserContextProvider(props: React.PropsWithChildren<{}>) {

    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    return <CurrentUserContext.Provider value={{
        currentUser, 
        setCurrentUser
    }}>
        {props.children}
    </CurrentUserContext.Provider>
}



/**
 * Function that determines, as well as allows the setting of the current user
 * 
 * For now this just in state, we can later put it in localstorage, or be inspecting a cookie etc.
 * @returns 
 */
export function useCurrentUser() : [currentUser: CurrentUser | null, setCurrentUser: (user: CurrentUser) => void] {

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    return [currentUser, setCurrentUser];
}