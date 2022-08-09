const INITIAL_VALUE = {
    
    Posts: 0,
    
}

export default function postReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "GET_POSTS":
            return {
                ...state,
                Posts: state.Posts + 1,
            }
        
        default:
            return state;
    }
}
