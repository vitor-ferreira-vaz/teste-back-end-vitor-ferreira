import {createContext, useContext, useEffect, useState} from "react";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useNavigate} from "react-router-dom";

const Context = createContext();

function Provider({children}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [autenticated, setAutenticated] = useState(false);
    const [usuario_id, setUsuario_id] = useState('');

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
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

    async function handleLogout() {
        try {
            await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']]('/api/users/Logout')
                    .then(function () {
                        localStorage.setItem('token', undefined);
                        ApiAxiosInstance.defaults.headers.common['Authorization'] = undefined
                        navigate('/LoginUsuarioForm')
                    })
            });

        } catch (error) {
            window.alert(error.message);
            console.log(error);
        }
    }
    return (
        <Context value={{autenticated: autenticated, loading, handleLogout}}>
            {children}
        </Context>
    )
}

export {Provider, Context}