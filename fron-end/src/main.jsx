import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom"
import Home from "./resources/Home.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import ProdutoForm from "./resources/ProdutoForm.jsx";
import {Anchor} from "react-bootstrap";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Home pageName={"Produto"} rota={'ProdutoForm'}/>
        },
        {
            path: '/categoria',
            element: <Home pageName={"Categoria"} rota={'CategoriaForm'}/>
        },
        {
            path: '/UsuarioForm',
            element: <Home pageName={'UsuarioForm'}/>
        },
        {
            path: '/EditarUsuarioForm',
            element: <Home pageName={'EditarUsuarioForm'}/>
        },
        {
            path: '/LoginUsuarioForm',
            element: <Home pageName={'LoginUsuarioForm'}/>
        },
        {
            path: '/CategoriaForm/:categoria_id?',
            element: <Home pageName={'CategoriaForm'}/>
        },
        {
            path: '/ProdutoForm/:produto_id?',
            element: <Home pageName={'ProdutoForm'}/>
        },
    ]
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
