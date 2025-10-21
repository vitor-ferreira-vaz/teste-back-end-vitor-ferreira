import {createContext, useContext, useEffect, useState} from "react";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useNavigate} from "react-router-dom";

const Context = createContext();

function Provider({children}) {
    const [loading, setLoading] = useState(true);
    const [autenticated, setAutenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);
        if (token === 'undefined' || token === null || token === undefined) {
            ApiAxiosInstance.defaults.headers.common['Authorization'] = undefined;
            setAutenticated(false);
        } else {
            ApiAxiosInstance.defaults.headers.common['Authorization'] = token;
            setAutenticated(true);
        }

        setLoading(false);

    }, [ApiAxiosInstance.defaults.headers.common['Authorization']])
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Context value={{autenticated: autenticated}}>
            {children}
        </Context>
    )
}

export {Provider, Context}