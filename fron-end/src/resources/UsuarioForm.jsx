import {useImmer} from "use-immer";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

function UsuarioForm() {
    const usuario_id = localStorage.getItem('usuario_id')
    const [form, setForm] = useImmer({
        name: '', email: '', password: '', confirm_password: '',
    });

    function onChangeFieldsImmer(e) { // Atualizando o obj de maneira usando Immer
        setForm(obj => {
            obj[e.target.id] = e.target.value;
        });
    }

    const navigate = useNavigate();
    async function handleSubmit() {
        try {
            await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']]('/api/users/Insert', form)
                    .then(function (response) {
                        ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                            ApiAxiosInstance[Methods['POST']]('/api/users/Login', form)
                                .then(function () {
                                    navigate('/LoginUsuarioForm')
                                    window.location.reload(true);
                                })
                        });
                    })
            });

        } catch (error) {
            window.alert(error.message);
        }
    }

    useEffect(() => {
        if (usuario_id) {
            ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']](`/api/users/Find/${usuario_id}`, {})
                    .then(function (response) {
                        if (response.status === 200) {
                            setForm(draft => {
                                draft.name = response.data.data.name;
                                draft.email = response.data.data.email;
                            });
                        } else {
                            console.log(response);
                        }
                    })
            });
        }
    }, []);

    return (
        <div className="rounded col-md-12 d-flex flex-column align-items-center form-control">
            <h4>Usuário</h4>
            <div className="row m-3">
                <div className="col-md-6 p-1">
                    <label className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" onChange={onChangeFieldsImmer} value={form.name} id="name"
                           placeholder="nome..."/>
                </div>
                <div className="col-md-6 p-1">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={onChangeFieldsImmer} value={form.email} id="email"
                           placeholder="name@example.com"/>
                </div>

                <div className="col-md-6 p-1">
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" onChange={onChangeFieldsImmer} id="password" className="form-control"
                           aria-describedby="passwordHelpBlock"/>
                    <div id="passwordHelpBlock" className="form-text">
                        A senha deve ter no mínimo 8 caracteres.
                    </div>
                </div>

                <div className="col-md-6 p-1">
                    <label htmlFor="inputPassword5" className="form-label">Confirmar Password</label>
                    <input type="password" id="confirm_password" onChange={onChangeFieldsImmer} className="form-control"
                           aria-describedby="passwordHelpBlock"/>
                </div>

                <div className="col-md-12 p-4 d-flex justify-content-end">
                    <button className="btn btn-outline-success my-2 my-sm-0 m-1" id="btn_search"
                            onClick={handleSubmit}>Salvar
                    </button>
                </div>

            </div>
        </div>
    )
}


export default UsuarioForm;