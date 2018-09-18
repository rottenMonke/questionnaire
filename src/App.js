import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import utils from './utils/utils';
import store from './store';
import { startLoadingData, saveMyAnswer, incrementAmountOfCorrectAnswers, showNextQuestion } from './actions';
import Question from './components/Question';
import Counter from './components/Counter';
import Result from './components/Result';

class App extends Component {
  constructor() {
    super();

    this.handleResult = this.handleResult.bind(this);
    this.checkCorrectness = this.checkCorrectness.bind(this);
  }

  componentDidMount() {
    store.dispatch(startLoadingData);
  }


  handleResult(answerData) {
    let currentQuestionId = this.props.currentQuestionId;


    let currentQuestion = this.props.questions[currentQuestionId];


    let correctAnswers = currentQuestion.correct_answer;


    let isAnswerCorrect = this.checkCorrectness(answerData, correctAnswers);

    let myAnswerData = {
      myAnswer: answerData,
      isAnswerCorrect: isAnswerCorrect,
      currentQuestionId: currentQuestionId
    }

    if (isAnswerCorrect) store.dispatch(incrementAmountOfCorrectAnswers);
    store.dispatch(saveMyAnswer(myAnswerData));
    store.dispatch(showNextQuestion());
  }


  checkCorrectness(answerData, correctAnswers) {
    return answerData.sort().join('') === correctAnswers.sort().join('');
  }


  render() {
    const { questions, isDataLoaded, currentQuestionId, amountOfQuestions } = this.props;

    const showQuestions = (isDataLoaded && (currentQuestionId < amountOfQuestions));

    const showResults =  currentQuestionId >= amountOfQuestions;

    if (showQuestions){
      return <Question questionData={questions[currentQuestionId]} handleResult={this.handleResult}/>;
    }else if (showResults) {
       return <Result result={questions} />;
    } else {
      return 'Loading ...'
    }
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(App);
