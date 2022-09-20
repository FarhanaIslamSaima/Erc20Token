import React,{createContext,useState} from 'react';
export const TokenContext=createContext('')


const TokenProvider = ({children}) => {
    const [tokenNum,setTokenNum]=useState('')
    return (
     <TokenContext.Provider value={{
        tokenNum,
        setTokenNum

     }
      
     }>
{children}
     </TokenContext.Provider>
    );
};

export default TokenProvider;