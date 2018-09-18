
import service from '../service/';
import store from '../store/';
import utils from '../utils/utils';


export const  startLoadingData = () => {    
  return service.getQuestions()
      .then(
        response => {
          const data = JSON.parse(response);
          return {questions: utils.formatData(data.results), amountOfQuestions: data.results.length}
        },
        error => console.log('An error occurred.', error),
        ).then((payload) => {store.dispatch(dataIsLoaded(payload));});
};

export const nextQuestion = newID => ({
  type: 'NEXT_QUESTION',
  payload: newID 
});

export const dataIsLoaded = (payload) => {  
    return { 
      type: 'DATA_IS_LOADED',
      payload: payload 
    };
};

export const saveMyAnswer = (payload) => {  
    return { 
      type: 'SAVE_MY_ANSWER',
      payload: payload 
    };
};

export const incrementAmountOfCorrectAnswers = () => {  
    return { 
      type: 'INCREMENT_AMOUNT_OF_CORRECT_ANSWERS'
    };
};

export const showNextQuestion = () => {  
    return { 
      type: 'SHOW_NEXT_QUESTION'
    };
};


