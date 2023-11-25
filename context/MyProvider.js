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
        "chatFilter":null,
        "AllContact":[],
        "detailContact":null,
        "channelWhatsapp":null,
        "dataKnowledge":null,
        "menus": null,
        "structured":null,
        "dataFilesKnowledge":null
    })

    return (
        <MyContext.Provider value={{ 
            ...data,
            setData
        }}>
            {children}
        </MyContext.Provider>
    );
}