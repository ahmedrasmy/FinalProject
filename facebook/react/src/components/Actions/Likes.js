import axios from "axios";


export const addlike = postid => (dispatch) => {
    return axios.post("")
        .then((res) =>
            dispatch({
                type: "UPDATE_LIKE",
                payload: {postid,likes:res.data}
            })
        )
        .catch((err) => console.log(err))
}


export const removelike = postid => (dispatch) => {
    return axios.post("")
        .then((res) =>
            dispatch({
                type: "UPDATE_LIKE",
                payload: {postid,likes:res.data}
            })
        )
        .catch((err) => console.log(err))
}