import React, {  Component } from 'react';
import service from './service/service.js';
import Question from './components/Question';
import Counter from './components/Counter';
import Result from './components/Result';
import utils from './utils/utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataLoaded: false,
      currentQuestionId: 0
    };

    this.data = {
      questions: [],
      amountOfQuestions: 0,
      amountOfCorrectAnswers: 0
    };

    this.handleResponse = this.handleResponse.bind(this);
    this.checkCorrectness = this.checkCorrectness.bind(this);
  }

  componentDidMount() {
    service.getQuestions('https://opentdb.com/api.php?amount=3').then((response) => {
      this.data.questions = utils.formatData(response);
      this.data.amountOfQuestions = this.data.questions.length;

      this.setState({
        isDataLoaded: true
      });
    });
  }


  handleResponse(arrOfMyAnswers) {
    let currentQuestionId = this.state.currentQuestionId;


    let currentQuestion = this.data.questions[currentQuestionId];


    let correctAnswers = currentQuestion.correct_answer;


    let isAnswerCorrect = this.checkCorrectness(arrOfMyAnswers, correctAnswers);


    currentQuestion.myAnswer = arrOfMyAnswers;
    currentQuestion.isAnswerCorrect = isAnswerCorrect;

    if (isAnswerCorrect) {
      this.data.amountOfCorrectAnswers++;
    }

    this.setState((prevState)=>{
      return { currentQuestionId: prevState.currentQuestionId + 1 };
    });
  }


  checkCorrectness(arrOfMyAnswers, correctAnswers) {
    return arrOfMyAnswers.sort().join('') === correctAnswers.sort().join('');
  }


  render() {
    if (this.state.isDataLoaded && (this.state.currentQuestionId < this.data.amountOfQuestions)) {
      return (
        <div className='container'>
          <Question questionData={this.data.questions[this.state.currentQuestionId]} passResult={this.handleResponse}/>
          <Counter currentQuestion={this.state.currentQuestionId + 1} totalAmountOfQuestions={this.data.amountOfQuestions}/>
        </div>
      );
    } else if (this.state.isDataLoaded) {
      return <Result result={this.data} />;
    }

    return 'Loading...';
  }
}

export default App;
