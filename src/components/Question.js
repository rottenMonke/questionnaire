import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ questionData, passResult }) => {
  const answers = questionData.allAnswers;

  const question = questionData.question;

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


  return (
    <div className='question__body'>
      <form className='question__form' action=''
        onSubmit={handleSubmit}>
        <div className='question__header'>{question}</div>
        {answers.map((option, index) => {
          let inputType = questionData.type === 'multiple' ? 'checkbox' : 'radio';


          let answerName = inputType === 'radio' ? 'answer' : 'answer' + index;


          let answerNameId = answerName + 'id';


          let answer = option;
          return (
            <label className='question__option' id={answerNameId} key={answerNameId+'key'+index}>
              {answer}
              <input id={answerNameId} type={inputType}
                name={answerName} value={answer} />
            </label>
          );
        })}
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
