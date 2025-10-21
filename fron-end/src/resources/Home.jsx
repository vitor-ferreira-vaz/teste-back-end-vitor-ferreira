import Menu from "./Menu.jsx";
import Table from "./Table.jsx";
import ProdutoForm from "./ProdutoForm.jsx";
import CategoriaForm from "./CategoriaForm.jsx";
import LoginUsuarioForm from "./LoginUsuarioForm.jsx";
import UsuarioForm from "./UsuarioForm.jsx";
import {useContext} from "react";
import {Context, Provider} from "./AuthContext";

const DashboardPages = {
    ProdutoForm: <ProdutoForm/>,
    CategoriaForm: <CategoriaForm/>,
    UsuarioForm: <UsuarioForm/>,
    EditarUsuarioForm: <UsuarioForm/>,
    LoginUsuarioForm: <LoginUsuarioForm/>,
};

function Home({pageName, rota = ''}) {
    return (
        <Provider>
            <div className="d-flex flex-column align-items-center">
                <div className="row col-md-10 m-3">
                    <Menu/>
                </div>

                <div className="row col-md-10">
                    {DashboardPages[pageName] ? DashboardPages[pageName] : <Table page={pageName} rota={rota}/>}
                </div>

            </div>
        </Provider>
    )
}


export default Home;