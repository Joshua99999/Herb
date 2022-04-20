import axios from "axios";
import qs from 'qs';

import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, LOGIN_API_URL } from "./LoginConfig";

class AuthService {

    login(username, password) {
        const data = qs.stringify({
            'username': username,
            'password': password,
            'client_id': CLIENT_ID,
            'grant_type': GRANT_TYPE,
            'client_secret': CLIENT_SECRET
        });
        console.log("##### data: "+data)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return axios.post(LOGIN_API_URL, data, config);
    }

}

export default new AuthService();