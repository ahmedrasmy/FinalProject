const INITIAL_VALUE = {
    LIKES: 0,
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
        default:
            return state;
    }
}
