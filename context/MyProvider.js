import { useState } from 'react';
import { createContext } from 'react';

export const MyContext = createContext();

export function MyProvider({children}) {
    const [data, setData] = useState({
        "dataDocumentation":null,
        "modal":null,
        "minimize":false,
        "view":null,
        "auth":null,
        "chatDetail":null,
        "infoChat":null,
        'allChatList':null,
        "draftChatList":null,
        "chatFilter":null,
        "AllContact":[],
        "detailContact":null,
        "channelWhatsapp":null,
        "dataKnowledge":null,
        "menus": null,
        "structured":null,
        "dataFilesKnowledge":null,
        "integrationData": null
    })
    
    const addContext = (key, value) => {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const removeContext = (key) => {
        setData((prev) => {
            const updateContext = {...prev}
            delete updateContext[key]
            return updateContext
        })
    }

    return (
        <MyContext.Provider value={{ 
            ...data,
            setData,
            addContext,
            removeContext
        }}>
            {children}
        </MyContext.Provider>
    );
}