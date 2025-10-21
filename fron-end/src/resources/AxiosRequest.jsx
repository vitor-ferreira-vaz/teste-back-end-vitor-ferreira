import axios from 'axios';

const csrf_token = document.head.querySelector('meta[name="csrf-token"]')?.content;
const auth_token = localStorage.getItem('auth_token');
export const ApiAxiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Substitua pela URL da sua API
    timeout: 10000,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
    Authorization: auth_token,
    id: '',
    headers: {
        'X-CSRF-TOKEN': csrf_token, // Captura o token CSRF do HTML
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
});
export const Methods = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
};


ApiAxiosInstance.interceptors.response.use(function (response) {
    if (response.config.url == "/api/users/Login") {
        // Inserir o o token no header
        // ApiAxiosInstance.defaults.headers.common['Authorization'] = response.headers.getAuthorization();
        // ApiAxiosInstance.defaults.headers.common['Authorization'] = response.data.token;
        // ApiAxiosInstance.defaults.headers.common['id'] = response.data.id;

        // Adicionar o token ao local storage para caso a pagina serja recarregada
        localStorage.setItem('token', response.data.token);
    }
    return response;
}, function (error) {
    // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
    // Faz alguma coisa com o erro da resposta
    return Promise.reject(error);
});


