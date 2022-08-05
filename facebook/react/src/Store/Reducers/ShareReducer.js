const INITIAL_VALUE = {
    Share: 0,
}

export default function sharereducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SHARE":
            return {
                ...state,
                Share: state.Share + 1,
            }
        default:
            return state;
    }
}
