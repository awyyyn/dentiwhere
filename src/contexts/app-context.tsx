
import { User } from '@/types';
import { useAtom } from 'jotai';
import { createContext } from 'react'


type initialValues = {
    isLoggedIn: boolean;
    user: User;
    logout: () => void;
} | null


export const AppContext = createContext<initialValues>(null)

const AppContextProvider = () => {

    const [] = useAtom()


    return (
        <AppContext.Provider value={}>
        
        </AppContext.Provider>
    )
}

export default AppContextProvider
