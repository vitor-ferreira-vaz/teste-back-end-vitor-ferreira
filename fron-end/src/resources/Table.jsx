import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {Context} from "./AuthContext.jsx";


function Table({page, columns, list = [], rota}) {
    const [List, setList] = useState([]);
    const [SearchList, setSearchList] = useState([]);
    const [Columns, setColumns] = useState([]);
    const {autenticated, loading} = useContext(Context)
    async function handleClickDelete(e) {
        await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
            ApiAxiosInstance[Methods['POST']](`/api/${page}/Delete/${e.target.id}`, {})
                .then(function (response) {
                    if (response.data.success === true) {
                        setSearchList(SearchList.filter((item) => item.id != e.target.id));
                        setList(List.filter((item) => item.id != e.target.id));
                    }
                })
        });
    }

    function handleClickSearch(e) {

        // let produto = document.getElementById('search_name').value;

        Columns.map((col) => {
            const field = document.getElementById(`search_${col.name}`).value;
            console.log(document.getElementById(`search_${col.name}`).value);
            if (field) {
                // setSearchList(List.filter((item) =>
                //     // item.id == cod
                //     // || item.name == produto
                // ));
            }
        })
        // setSearchList(List.filter((item) =>
        //     // item.id == cod
        //     // || item.name == produto
        // ));
        // if (!cod && !produto) {
        //     setSearchList(List);
        // }
    }

    function handleClearFilter() {
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        setSearchList(List);
    }



    useEffect(() => {
        if (autenticated) {
            ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']](`/api/${page}/BuildList`, {})
                    .then(function (response) {
                        if (response.status === 200) {
                            setColumns(response.data.data.columns);
                            setSearchList(response.data.data.list);
                            setList(response.data.data.list);
                        } else {
                            console.log(response);
                        }
                    })
            });
        }
    }, [page]);

    return (
        <div className="rounded col-md-12" data-bs-spy="scroll" tabIndex="0">
            <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="m-1">{page}</h5>
                    <div className="m-1 d-flex align-items-center">
                        <Link to={"/" + rota} className="nav-link">
                            <button className="btn btn-outline-success my-2 my-0 m-4" id="btn_search">Criar
                            </button>
                        </Link>

                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pesquisa</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="m-2 p-2 d-flex flex-column">
                                <table className="table table">
                                    <tbody>
                                    {Columns.map(col => (
                                        <OptionSearch key={col.name + "_comp"} col={col}/>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end align-items-center">
                                    <button className="btn btn-outline-danger my-2 my-0 m-1" id="btn_search"
                                            onClick={handleClearFilter}>Limpar
                                    </button>
                                    <button className="btn btn-outline-success my-2 my-0 m-1" id="btn_search"
                                            onClick={handleClickSearch}>Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table">
                        <thead>
                        <tr>
                            {Columns.map(col => (
                                <th key={col.name} scope="col">{col.title}</th>
                            ))}
                            <th key={0} scope="col">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {List.map(row => (
                            <tr key={row.id + 1}>
                                {Columns.map(col => (
                                    <td key={col.name}>{row[col.name]}</td>
                                ))}
                                <td key={0}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Ações
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#" id={row.id}
                                           onClick={handleClickDelete}>Excluir</a>
                                        <Link to={`/${rota}/` + row.id} className="dropdown-item">Editar</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


function OptionSearch({col}) {
    return (
        <tr className="align-items-center" key={col.name + "_div"}>
            <td key={col.name + "_tit"}>{col.title}</td>
            <td key={col.name}>
                <input type={col.type} id={`search_${col.name}`} className="form-control"/>
            </td>
        </tr>
    )
}


export default Table;