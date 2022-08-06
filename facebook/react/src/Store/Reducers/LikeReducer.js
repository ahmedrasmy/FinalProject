const INITIAL_VALUE = {
    LIKES: 0,

    LIKES_SHARE: 0,

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

        default:
            return state;
    }
}
