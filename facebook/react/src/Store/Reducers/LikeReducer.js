const INITIAL_VALUE = {
    LIKES: 0,
<<<<<<< HEAD

    LIKES_SHARE: 0,

=======
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
}

export default function LikeReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "GET_LIKE":
            return {
                ...state,
                LIKES: state.LIKES + 1,
            }
        case "DELETE_LIKE":
            return {
                ...state,
                LIKES: state.LIKES - 1,
            }
<<<<<<< HEAD

        case "GET_LIKE_SHARE":
            return {
                ...state,
                LIKES_SHARE: state.LIKES_SHARE + 1,
            }
        case "DELETE_LIKE_SHARE":
            return {
                ...state,
                LIKES_SHARE: state.LIKES_SHARE - 1,
            }

=======
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
        default:
            return state;
    }
}
