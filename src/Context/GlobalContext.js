import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {

    
    const getCurrentClientFromLS = () => {
        const found = localStorage.getItem('myGuest_currentClient');
        if (found){
            return JSON.parse(found)
        }
        return {}
    }
    
    const [clients, setClients] = useState([])
    const [currentClient, setCurrentClient] = useState(getCurrentClientFromLS)
    
    const myvalues = {
        clients,
        setClients,
        currentClient,
        setCurrentClient
    }

  return (
    <GlobalContext.Provider value={myvalues}>
        {children}
    </GlobalContext.Provider>
  )
}
export default GlobalContextProvider