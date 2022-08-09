const INITIAL_VALUE = {
    Share: 0,
    GRO:0,
    GROUPC:0,
}

export default function sharereducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SHARE":
            return {
                ...state,
                Share: state.Share + 1,
            }
        case "POST_GROUP":
            return {
                ...state,
                GRO: state.GRO + 1,
            }
        case "GROUP_COMMENT":
                return {
                    ...state,
                    GROUPC: state.GROUPC + 1,
                }
        default:
            return state;
    }
}
