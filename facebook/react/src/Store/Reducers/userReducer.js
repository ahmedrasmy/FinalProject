const INITIAL_VALUE = {
    direc: {},
}

export default function userReducerth(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "GET_USER":
            return {
                ...state,
                direc: action.payload,
            }
        default:
            return state;
    }
}
