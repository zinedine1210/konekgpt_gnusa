import { useState } from 'react';
import { createContext } from 'react';

export const MyContext = createContext();

export function MyProvider({children}) {
    const [data, setData] = useState({
        "dataDocumentation":null,
        "modal":null,
        "minimize":false,
        "view":2,
        "chatDetail":null,
        "infoChat":null,
        'allChatList':[],
        "chatFilter":null
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