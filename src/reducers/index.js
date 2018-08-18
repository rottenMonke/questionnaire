let initialState =   {
  isDataLoaded: false,
  currentQuestionId: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return Object.assign({}, state, { currentQuestionId: action.payload });
    case 'DATA_LOADED':
      return Object.assign({}, state, { isDataLoaded: true });
    default:
      return state;
  }
};
export default rootReducer;
