import { createContext, useState } from "react";


export const UserContext = createContext({})

 const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches
 export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState(null)
    const [darkMode, setDarkMode] = useState(isDark)

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, darkMode, setDarkMode,}}>
            {children}
        </UserContext.Provider>
    )
}