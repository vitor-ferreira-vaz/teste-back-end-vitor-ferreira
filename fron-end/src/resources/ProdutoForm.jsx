import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useEffect, useState} from "react";

function ProdutoForm() {
    const { produto_id} = useParams();
    const navigate = useNavigate()
    const [form, setForm] = useImmer({
        name: '', price: '', description: '', image_url: '', categoria: 0,
    })
    const [categoria, setCategoria] = useImmer([{}])
    const [metodo, setMetodo] = useState('Insert')
    function onChangeFieldsImmer(e) { // Atualizando o obj de maneira usando Immer
        setForm(obj => {
            obj[e.target.id] = e.target.value;
        });
    }

    useEffect(() => {
        if (produto_id) {
            setMetodo('Update/' + produto_id)
            ApiAxiosInstance[Methods['POST']](`/api/Produto/Find/${produto_id}`, {})
                .then(function (response) {
                    if (response.status === 200) {
                        setForm(draft => {
                            draft.name = response.data.data.name;
                            draft.price = response.data.data.price;
                            draft.description = response.data.data.description;
                            draft.image_url = response.data.data.image_url;
                        });
                    } else {
                        console.log(response);
                    }
                })
        }
    }, [produto_id]);

    useEffect(() => {
        ApiAxiosInstance[Methods['POST']](`/api/Categoria/All`, {})
            .then(function (response) {
                if (response.status === 200) {
                    setCategoria(response.data);
                    setForm(draft => {
                        draft.categoria = response.data[0].id;
                    })
                } else {
                    console.log(response);
                }
            })

    }, []);

    async function handleSubmit() {
        try {
            await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']](`/api/Produto/${metodo}`, form)
                    .then(function (response) {
                        if (response.status) {
                            alert(response.data[0].message);
                            navigate('/')
                        }
                    })
            });

        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <div className="rounded col-md-12 d-flex flex-column align-items-center form-control">
            <h4>Produto</h4>
            <div className="row m-3">
                <div className="col-md-6 p-1">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" onChange={onChangeFieldsImmer} value={form.name} id="name" placeholder="..."/>
                </div>
                <div className="col-md-6 p-1">
                    <label className="form-label">Preço</label>
                    <input type="text" className="form-control" onChange={onChangeFieldsImmer} value={form.price} id="price" placeholder="..."/>
                </div>

                <div className="col-md-12 p-1">
                    <label className="form-label">Descrição</label>
                    <textarea className="form-control" placeholder="..." onChange={onChangeFieldsImmer} value={form.description} id="description"></textarea>
                </div>

                <div className="col-md-12 p-1">
                    <label className="form-label">Imagem (URL)</label>
                    <input type="text" className="form-control" onChange={onChangeFieldsImmer} value={form.image_url} id="image_url" placeholder="..."/>
                </div>


                <div className="col-md-12 p-1">
                    <label className="form-label">Imagem (URL)</label>
                    <select id="categoria" className="form-select" onChange={onChangeFieldsImmer}>
                        {categoria.map(item => (
                            <option key={item.name + "_comp"} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>


                <div className="col-md-12 p-4 d-flex justify-content-end">
                    <button className="btn btn-outline-success my-2 my-sm-0 m-1" id="btn_search" onClick={handleSubmit}>Salvar</button>
                </div>

            </div>
        </div>
    )
}

export default ProdutoForm;