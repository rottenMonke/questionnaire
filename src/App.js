import React, {  Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import service from './service/service.js';
import utils from './utils/utils';
import store from './store';
import actions from './actions';
import Question from './components/Question';
import Counter from './components/Counter';
import Result from './components/Result';

class App extends Component {
  constructor() {
    super();

    this.data = {
      questions: [],
      amountOfQuestions: 0,
      amountOfCorrectAnswers: 0
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.checkCorrectness = this.checkCorrectness.bind(this);
  }

  componentDidMount() {
    service.getQuestions().then((response) => {
      this.data.questions = utils.formatData(response);
      this.data.amountOfQuestions = this.data.questions.length;

      store.dispatch(actions.dataLoaded());
    });
  }


  handleResponse(arrOfMyAnswers) {
    let currentQuestionId = this.props.currentQuestionId;


    let currentQuestion = this.data.questions[currentQuestionId];


    let correctAnswers = currentQuestion.correct_answer;


    let isAnswerCorrect = this.checkCorrectness(arrOfMyAnswers, correctAnswers);


    currentQuestion.myAnswer = arrOfMyAnswers;
    currentQuestion.isAnswerCorrect = isAnswerCorrect;

    if (isAnswerCorrect) {
      this.data.amountOfCorrectAnswers++;
    }

    store.dispatch(actions.nextQuestion(++currentQuestionId));
  }


  checkCorrectness(arrOfMyAnswers, correctAnswers) {
    return arrOfMyAnswers.sort().join('') === correctAnswers.sort().join('');
  }


  render() {
    if (this.props.isDataLoaded && (this.props.currentQuestionId < this.data.amountOfQuestions)) {
      return (
        <div className='container'>
          <Question questionData={this.data.questions[this.props.currentQuestionId]} passResult={this.handleResponse}/>
          <Counter currentQuestion={this.props.currentQuestionId + 1} totalAmountOfQuestions={this.data.amountOfQuestions}/>
        </div>
      );
    } else if (this.props.isDataLoaded) {
      return <Result result={this.data} />;
    }

    return 'Loading...';
  }
}


App.propTypes = {
  currentQuestionId: PropTypes.number,
  isDataLoaded: PropTypes.bool,
};

const mapStateToProps = state => {
  return { currentQuestionId: state.currentQuestionId,
    isDataLoaded: state.isDataLoaded };
};

export default connect(mapStateToProps)(App);
