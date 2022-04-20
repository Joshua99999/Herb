import axios from 'axios';
const axiosServices = axios.create();

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

axiosServices.interceptors.request.use(config => {
    const data = JSON.parse(localStorage.getItem('datta-account'));
    const user = JSON.parse(data.user);
    if (user && user.access_token) {
        const token = user.token_type + ' ' + user.access_token;
        config.headers.Authorization = token;
    }
    return config;
});

export default axiosServices;
