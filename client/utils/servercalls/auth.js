import axios from 'axios'
import { DRF_API_URL } from '../constants'

export const register = async (body) => {



        const res = await axios.post(DRF_API_URL + 'auth/register/', body);
        const data = await res.data;

        return data;


}



export const login = async (body) => {


        const res = await axios.post(DRF_API_URL + 'auth/api-token-auth/', body);
        const data = await res.data;

        return data;


}



export const verify_author = async (course_id, token) => {
        const res = await axios.get(DRF_API_URL + `api/check-author/${course_id}`, {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                }
        },);
        const data = await res.data
        return data;
}