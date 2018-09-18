let initialState =   {
  isDataLoaded: false,
  currentQuestionId: 0,
  amountOfCorrectAnswers: 0,
  questions: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATA_IS_LOADED':
      return {
        ...state,
        isDataLoaded: true,
        questions: action.payload.questions,
        amountOfQuestions: action.payload.amountOfQuestions
      }
    case 'SAVE_MY_ANSWER':
      const answeredQuestionId =  action.payload.currentQuestionId;
      const myAnswerData = { myAnswer: action.payload.myAnswer, isAnswerCorrect: action.payload.isAnswerCorrect };
      const updatedQuestions = state.questions.map((item, index) => {
        if(index === answeredQuestionId) {
          return Object.assign({}, item, myAnswerData);
        }
        return item;
      });

      return {
        ...state,
        questions: updatedQuestions
      }
    case 'INCREMENT_AMOUNT_OF_CORRECT_ANSWERS':
      return {
        ...state,
        amountOfCorrectAnswers: state.amountOfCorrectAnswers + 1
      }
    case 'SHOW_NEXT_QUESTION':
      return {
        ...state,
        currentQuestionId: state.currentQuestionId + 1
      }
    default:
      return state;
  }
};
export default rootReducer;
