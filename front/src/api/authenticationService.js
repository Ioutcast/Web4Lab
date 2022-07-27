import axios from 'axios';

const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios
        .post("http://localhost:8080/api/user",  authRequest)
}

