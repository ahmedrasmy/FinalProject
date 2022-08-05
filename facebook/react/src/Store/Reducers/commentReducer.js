const INITIAL_VALUE = {
    Comment: 0,
}

export default function commentReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "COMMENT":
            return {
                ...state,
                Comment: state.Comment + 1,
            }

        default:
            return state;
    }
}
