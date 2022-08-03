import axios from "axios";

export const User = () => (dispatch) => {
    return axios.get('http://127.0.0.1:8000/api/get/')
        .then((res) => {
            dispatch({
                type: "GET_USER",
                payload: res.data[0],
            })
        }
        ).catch((err) => console.log(err))
}