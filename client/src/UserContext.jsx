import { createContext, useState } from "react";

export const UserContext = createContext({})

 export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState(null)
    const [darkMode, setDarkMode] = useState(true)

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, darkMode, setDarkMode,}}>
            {children}
        </UserContext.Provider>
    )
}