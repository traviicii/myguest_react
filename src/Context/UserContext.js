import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    
    const getUserFromLS = () => {
        const found = localStorage.getItem('myGuest_user');
        if (found){
            return JSON.parse(found)
        }
        return {}
    }

    const [user, setUser] = useState(getUserFromLS);

    const logMeOut = () => {
        setUser({})
        localStorage.removeItem('myGuest_user')
        // I forgot how I redirected to home page on logout... look out for where that's happening and make a note lol
      };

    const myValues = {
        user, 
        setUser,
        logMeOut,
    };
    
    return (
        <UserContext.Provider value={myValues}>
            { children }

        </UserContext.Provider>
    )
};
export default UserContextProvider