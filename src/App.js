import React, {  Component } from 'react';
import getQuestions from './utils/makeRequest';
import Question from './components/Question';
import Result from './components/Result';
import decodeHTML from './utils/decodeHTML';

class App extends Component {

  
  constructor(props) {
    super(props);
    
    this.state = {
      shouldStart: false
    }

    this.data = {
      questions: [],
      amountOfQuestions : 0,
      amountOfCorrectAnswers: 0
    }

    this.handleResponse = this.handleResponse.bind(this);
    this.checkCorrectness = this.checkCorrectness.bind(this);
    this.transformDifficulty = this.transformDifficulty.bind(this);
  }

  componentDidMount() {
    
    getQuestions("https://opentdb.com/api.php?amount=5").then((response) => {

      this.data.questions = response.results;
      this.data.amountOfQuestions = response.results.length;

      this.setState({
        currentQuestionId: 0,
        shouldStart: true
      });

    });

  }


  handleResponse(arrOfMyAnswers) {
    let currentQuestionId = this.state.currentQuestionId,
        currentQuestion = this.data.questions[currentQuestionId],
        correctAnswer = currentQuestion.correct_answer,
        isAnswerCorrect = this.checkCorrectness(arrOfMyAnswers, correctAnswer);

      
        currentQuestion.myAnswer = arrOfMyAnswers;
        currentQuestion.isAnswerCorrect = isAnswerCorrect;
        currentQuestion.numericDifficulty = this.transformDifficulty(currentQuestion.difficulty);

        if(isAnswerCorrect) {
          this.data.amountOfCorrectAnswers++;
        }
        
        this.setState((prevState)=>{
          return {currentQuestionId: prevState.currentQuestionId + 1}
        });
    
  }
  

  checkCorrectness(arrOfMyAnswers, correctAnswer) {
    let arrOfCorrectAnswers = [];

        if(Array.isArray(correctAnswer)){
          arrOfCorrectAnswers = correctAnswer.map((item) => {
            return decodeHTML(item);
          });
        }else {
          arrOfCorrectAnswers.push(decodeHTML(correctAnswer));
        }
        
        return arrOfMyAnswers.sort().join('') === arrOfCorrectAnswers.sort().join('');
  }

  transformDifficulty (difficulty) {
    switch (difficulty) {
      case 'easy':
        return 1;
        break;
      case 'medium':
        return 2;
        break;
      case 'hard':
        return 3;
        break;
      default:
        return difficulty;
    }
  }


  render() {

    
      if (this.state.shouldStart && (this.state.currentQuestionId < this.data.amountOfQuestions)) {
        let currentQuestionIndex = this.state.currentQuestionId;    
        return <Question questionData={this.data.questions[currentQuestionIndex]} passResult={this.handleResponse}/>;
      }
      else if(this.state.shouldStart){
        return <Result result={this.data} />;
      }
       else {
        return "Wait PLS!!";
      }
  }
}

export default App;
