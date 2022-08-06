const INITIAL_VALUE = {
    Comment: 0,
<<<<<<< HEAD

    Share:0,

=======
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
}

export default function commentReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "COMMENT":
            return {
                ...state,
                Comment: state.Comment + 1,
            }

<<<<<<< HEAD
        case "SHARE_COMMENT":
            return {
                ...state,
                Share: state.Share + 1,
            }


=======
>>>>>>> 396daafe6695eefafbe1b17d9014f72a37432860
        default:
            return state;
    }
}
