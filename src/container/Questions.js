import {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-redux';


class Questions extends Component {
   constructor() {
       super();
   } 
  const uncheckInputs = (form) => {
    let inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.checked = false;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let form = event.target;


    let data = new FormData(form);


    let result = [];

    data.forEach(function(value) {
      result.push(value);
    });

    if (result.length === 0) {
      alert('Choose your answer');
      return;
    }

    passResult(result);

    uncheckInputs(form);
  };

  const question = questionData.type === 'multiple' ? <MultipleOptions data={questionData.allAnswers} /> : <OneOption data={questionData.allAnswers} />;

  return (
        <div className='container'>
          <Question questionData={this.data.questions[this.props.currentQuestionId]} passResult={this.handleResponse}/>
          <Counter currentQuestion={this.props.currentQuestionId + 1} totalAmountOfQuestions={this.data.amountOfQuestions}/>
        </div>
  );
};




const mapStateToProps = (state) => (
    {
        questions: state.questions,
        currentQuestionId: state.currentQuestionId,
        amountOfQuestions: state.amountOfQuestions
    }
);

Questions = connect(mapStateToProps, null)(Questions);
export default Questions;
