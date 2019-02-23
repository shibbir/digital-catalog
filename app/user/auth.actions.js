import axios from 'axios';
import Types from './auth.types';

export function getProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: 'get',
            url: 'api/profile'
        })
    };
}

export function login(formData) {
    return {
        type: Types.LOGIN,
        payload: axios({
            method: 'post',
            url: 'api/login',
            data: formData
        })
    };
}

export function register(formData) {
    return {
        type: Types.REGISTER,
        payload: axios({
            method: 'post',
            url: 'api/register',
            data: formData
        })
    };
}

export function changePassword(formData) {
    return {
        type: Types.CHANGE_PASSWORD,
        payload: axios({
            method: 'put',
            data: formData,
            url: '/api/profile/password'
        })
    };
}
