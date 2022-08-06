import axios from "axios";

export const Likee = () => (dispatch) => {
    return axios.get('http://127.0.0.1:8000/api/get_likee/')
        .then((res) => {
            dispatch({
                type: "GET_LIKEE",
                payload: res.data,
            })
        }
        ).catch((err) => console.log(err))
}