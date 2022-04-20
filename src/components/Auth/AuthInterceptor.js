import axios from 'axios';

axios.interceptors.request.use(config => {
    const data = JSON.parse(localStorage.getItem('datta-account'));
    const user = JSON.parse(data.user);
    if (user && user.accessToken) {
        const token = user.token_type + ' ' + user.accessToken;
        config.headers.Authorization = token;
    }
    return config;
});