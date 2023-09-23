import axios from "axios"
import { DRF_API_URL } from "../constants"

export const get_course = async (course_id) =>{

    let URL = course_id !== '' ? `${DRF_API_URL}api/courses?id=${course_id}` : `${DRF_API_URL}api/courses`
    const res = await axios.get(URL)
    const data = await res?.data

    return data;

}


export const add_course = async (body, token) =>{
    console.log({token});
    const res = await axios.post(`${DRF_API_URL}api/create-course/`,body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        
    });
    const data = await res?.data

    return data
}




export const add_chapter = async (id, body, token) =>{

    const res = await axios.post(`${DRF_API_URL}api/add-chapter/${id}/`,body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        
    });
    const data = await res?.data

    return data

}


