import LikeReducer from "../Reducers/LikeReducer";

export const postReducer = (payload) => {
    return {
        payload,
        type: "GET_POSTS"
    }
}
export const likeereducer = (payload) => {
    return {
        payload,
        type: "GET_LIKE"
    }
}
export const deletereducer = (payload) => {
    return {
        payload,
        type: "DELETE_LIKE"
    }
}
export const commentreducer = (payload) => {
    return {
        payload,
        type: "COMMENT"
    }
}
<<<<<<< HEAD

export const sharecommentreducer = (payload) => {
    return {
        payload,
        type: "SHARE_COMMENT"
    }
}
export const sharelikereducer = (payload) => {
    return {
        payload,
        type: "GET_LIKE_SHARE"
    }
}
export const deletelikereducer = (payload) => {
    return {
        payload,
        type: "DELETE_LIKE_SHARE"
    }
}

=======
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
export const sharereducer = (payload) => {
    return {
        payload,
        type: "SHARE"
    }
}