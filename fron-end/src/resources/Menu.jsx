import {Link, useNavigate} from "react-router-dom";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import {Context} from "./AuthContext.jsx";

const menuItems = [
    {
        path: '/',
        text: 'Produtos',
        guess: false,
        onClick: false
    },
    {
        path: '/categoria',
        text: 'Categorias',
        guess: false,
        onClick: false
    },
    {
        path: '/EditarUsuarioForm',
        text: 'Minha Conta',
        guess: false,
        onClick: false
    },
    {
        path: '/UsuarioForm',
        text: 'Cadastro',
        guess: true,
        onClick: false
    },
    {
        path: '/LoginUsuarioForm',
        text: 'Login',
        guess: true,
        onClick: false
    },
];

function Menu () {
    const auth = ApiAxiosInstance.defaults.headers.common['Authorization'];
    const autenticated = useContext(Context);
    // console.log(autenticated);
    let itens = menuItems.filter(item => item.guess === false && auth != null)
    const navigate = useNavigate()
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 rounded col-md-12">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item p-2 d-flex align-items-center">
                        <h4>LOGZZ</h4>
                    </li>
                    {
                        itens.map((item, index) => (
                            <li key={item.path + 'li'} className="nav-item">
                                <Link to={item.path} key={item.path + 'link'} className="nav-link link">
                                    {item.text} <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        ))
                    }
                    {
                        auth ?
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                            : ''
                    }

                </ul>
            </div>
        </nav>
    )
}




export default Menu;