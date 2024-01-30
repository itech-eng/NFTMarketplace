import {createContext, ReactNode, useContext, useState} from "react";
import PropTypes from "prop-types";

type Props = {
    children: ReactNode;
};

interface responseStateInterface{
    success : boolean | null,
    message : string | null
}

type responseContextType = {
    responseState: responseStateInterface;
    setResponse: (success: boolean | null,message:string | null) => void;
    getResponse: () => any;
    resetResponse: () => void;
};

const responseContextDefaultValues: responseContextType = {
    responseState: {
        success : null,
        message : null
    },
    setResponse: () => {},
    getResponse: () => {return null},
    resetResponse: () => {},
};


const ResponseContext = createContext<responseContextType>(responseContextDefaultValues);

const RouteGuardProvider = ({children} : Props)=>{
    const initialResponseState = {
        success : null,
        message: null
    };
    const [responseState , setResponseState] = useState<responseStateInterface>(initialResponseState);

    const setResponse = ({success,message}:any)=>{
        setResponseState({
            ...responseState,
            success: success,
            message: message
        });
    }

    const getResponse = ()=>{
        return responseState;
    }

    const resetResponse = ()=>{
        setResponseState({
            success: null,
            message: null
        });
    }
    return (
        <ResponseContext.Provider value={{ responseState, setResponse, getResponse, resetResponse }}>
            {children}
        </ResponseContext.Provider>
    );
}
RouteGuardProvider.propTypes = {
    children: PropTypes.object,
};

const useResponse = () => useContext(ResponseContext);
export { RouteGuardProvider as default, useResponse};