const initState = 'popular';

const dashboardFilterReducer = (state = initState, action) => {
    switch(action.type){
        case 'POPULAR':
            return 'popular';
        case 'NEW':
            return 'new';
        case 'MOST_VIEWED':
            return 'most viewed';
        default : return state;
    }
}

export default dashboardFilterReducer