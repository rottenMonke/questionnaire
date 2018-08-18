import React from 'react';
import PropTypes from 'prop-types';
import OneOption from './OneOption';
import MultipleOptions from './MultipleOptions';

const Question = ({ questionData, passResult }) => {
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
    <div className='question__body'>
      <form className='question__form' action=''
        onSubmit={handleSubmit}>
        <div className='question__header'>{questionData.question}</div>
        {question}
        <input className='question__submit' type='submit'
          value='Submit' />
      </form>
    </div>
  );
};

Question.propTypes = {
  questionData: PropTypes.object,
  passResult: PropTypes.func
};

export default Question;
