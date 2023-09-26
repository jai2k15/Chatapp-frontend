import { useState } from 'react';
import TokenContext from './tokenContext';

const TokenState = (props)=>{
    const [token, setToken] = useState();
    return(
        <TokenContext.Provider value={{token, setToken}}>
            {props.children}
        </TokenContext.Provider>
    )
}
export default TokenState;