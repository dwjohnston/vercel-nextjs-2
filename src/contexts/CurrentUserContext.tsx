"use client";
import React, { useCallback, useContext, useState } from "react";

 
type CurrentUser = {
    name: string; 
    title: string; 
}

type CurrentUserContextType = {
    currentUser: CurrentUser | null; 
    setCurrentUser: (user: CurrentUser) => void;
    requestEdit: () => void;
    isEditing: boolean; 
}; 

export const CurrentUserContext = React.createContext<CurrentUserContextType>({
    currentUser: null, 
    setCurrentUser: () => {}, 
    requestEdit: () => {},
    isEditing: true, 
}); 

export function CurrentUserContextProvider(props: React.PropsWithChildren<{}>) {

    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, stateSetCurrentUser] = useState<CurrentUser | null>(() => {
        const currentValue = window.localStorage.getItem("user"); 
        try {
            const user = JSON.parse(currentValue ?? ""); 
            return user; 
        }catch(err){
            setIsEditing(true); 
            return null;
        }
    });

    const setCurrentUser = useCallback((user: CurrentUser) => {
       window.localStorage.setItem("user", JSON.stringify(user)); 
       stateSetCurrentUser(user);
    }, []);     


    return <CurrentUserContext.Provider value={{
        currentUser, 
        setCurrentUser : (user) => {
            setCurrentUser(user); 
            setIsEditing(false);
        }, 
        isEditing, 
        requestEdit: () => {
            setIsEditing(true)
        },
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
export function useCurrentUser() : CurrentUserContextType {
    return useContext(CurrentUserContext);
}