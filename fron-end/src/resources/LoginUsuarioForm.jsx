import {useImmer} from "use-immer";
import {ApiAxiosInstance, Methods} from "./AxiosRequest.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function LoginUsuarioForm() {
    const [form, setForm] = useImmer({
        email: '', password: '',
    });


    const navigate = useNavigate();

    function onChangeFieldsImmer(e) { // Atualizando o obj de maneira usando Immer
        setForm(obj => {
            obj[e.target.id] = e.target.value;
        });
    }

    async function handleLogin() {
        try {
            await ApiAxiosInstance[Methods['GET']]('/sanctum/csrf-cookie', {}).then(() => {
                ApiAxiosInstance[Methods['POST']]('/api/users/Login', form)
                    .then(function (response) {
                        if (response.status == 200) {
                            navigate('/EditarUsuarioForm')
                        } else {
                            navigate('/LoginUsuarioForm')
                        }
                        window.location.reload(true);
                    })
            });

        } catch (error) {
            window.alert(error.message);
            console.log(error);
        }
    }
    useEffect(() => {})


    return (
        <div className="rounded col-md-12 form-control">
            <div className="mb-4">
                <h5 className="mb-2">Login</h5>
            </div>
            <div className="row m-3 d-flex justify-content-center">
                <div className="col-md-4 p-1">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={onChangeFieldsImmer} id="email"
                           placeholder="name@example.com"/>
                </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
                <div className="col-md-4 p-1">
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" onChange={onChangeFieldsImmer} id="password" className="form-control"
                           aria-describedby="passwordHelpBlock"/>
                </div>
            </div>

            <div className="row m-3 d-flex justify-content-center">
                <div className="col-md-4 p-4 d-flex justify-content-end">
                    <button className="btn btn-outline-success my-2 my-sm-0 m-1" onClick={handleLogin}
                            id="btn_search">Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginUsuarioForm;