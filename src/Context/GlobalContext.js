import { createContext, useState } from "react";
import Message from "../Components/Message";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {


    const getCurrentClientFromLS = () => {
        const found = localStorage.getItem('myGuest_currentClient');
        if (found) {
            return JSON.parse(found)
        }
        return {}
    }

    const [clients, setClients] = useState([])
    const [currentClient, setCurrentClient] = useState(getCurrentClientFromLS)
    const [messages, setMessages] = useState([])

    const addMessage = (text, color = 'success') => {
        const newMessage = {
            text,
            color
        }
        setMessages([...messages, newMessage])
    };

    const removeMessage = (index) => {
        setTimeout(() => {
            const copy = [...messages]
            copy.splice(index, 1)
            setMessages(copy)
        }, 4000)
    }

    const showMessages = () => {
        return messages.map(({ text, color }, index) => <Message key={index} color={color} text={text} index={index} />)
    }

    const myvalues = {
        clients,
        setClients,
        currentClient,
        setCurrentClient,
        messages,
        addMessage,
        removeMessage,
        showMessages
    }

    return (
        <GlobalContext.Provider value={myvalues}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider