import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useEffect, useState} from "react";
// import 'use-bootstrap-select/dist/use-bootstrap-select.css';
// import UseBootstrapSelect from 'use-bootstrap-select';


function CategoriaForm() {
    const { categoria_id} = useParams();
    const navigate = useNavigate()
    const [form, setForm] = useImmer({
        name: ''
    });
    const [metodo, setMetodo] = useState('Insert')
    function onChangeFieldsImmer(e) { // Atualizando o obj de maneira usando Immer
        setForm(obj => {
            obj[e.target.id] = e.target.value;
        });
    }

    useEffect(() => {
        if (categoria_id) {
            setMetodo('Update/' + categoria_id)
            ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']](`/api/Categoria/Find/${categoria_id}`, {})
                    .then(function (response) {
                        if (response.status === 200) {
                            setForm(draft => {
                                draft.name = response.data.data.name;
                            });
                        } else {
                            console.log(response);
                        }
                    })
            });
        }
    }, [categoria_id]);

    async function handleSubmit() {
        try {
            await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']](`/api/Categoria/${metodo}`, form)
                    .then(function (response) {
                        if (response.status) {
                            alert(response.data[0].message);
                            navigate('/Categoria')
                        }
                    })
            });

        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <div className="rounded col-md-12 d-flex flex-column align-items-center form-control">
            <h4>Categoria</h4>
            <div className="row col-md-8 m-3">
                <div className="p-1">
                    <label className="form-label">Categoria</label>
                    <input type="text" onChange={onChangeFieldsImmer} className="form-control" value={form.name}
                           id="name" placeholder="..."/>
                </div>
                <div className="col-md-12 p-4 d-flex justify-content-end">
                    <button className="btn btn-outline-success my-2 my-sm-0 m-1" id="btn_search" onClick={handleSubmit}>Salvar</button>
                </div>

            </div>
        </div>
    )

}

export default CategoriaForm;