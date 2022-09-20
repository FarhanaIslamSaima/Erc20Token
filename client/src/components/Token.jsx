import React,{useContext} from 'react';
import TokenContext from '../context/TokenProvider';

const Token = () => {
    const {tokenNum}=useContext(TokenContext)
   
    return (
        <div>
            
        </div>
    );
};

export default Token;