import React from 'react';
import PropTypes from 'prop-types';

const ResultRow = ({ question }) => {
  const formulateCorrectAnswer = (answer) => {
    let result;
    if (answer.length > 1) {
      result = answer.join(', ');
    } else {
      result = answer[0];
    }
    return result;
  };

  const formulateMyAnswer = (answer) => {
    return answer.length > 1  ? answer.join(', ') : answer[0];
  };

  const formulateFinalString = (data, myAnswer, correctAnswer) => {
    let finalString = 'You answered ';
    if (data.type === 'boolean' &&  data.correct_answer.length === 1) {
      finalString += 'that this is ' + myAnswer;
    } else {
      finalString += myAnswer;
    }
    finalString += data.isAnswerCorrect ? ' and this is a correct answer' : ' but the correct answer is ' + correctAnswer;
    return finalString;
  };

  let myAnswer = formulateMyAnswer(question.myAnswer);


  let correctAnswer = formulateCorrectAnswer(question.correct_answer);


  let finalString = formulateFinalString(question, myAnswer, correctAnswer);

  return (
    <div className='result__item'>
      <div className='result__item-difficulty'>Difficulty : {question.difficulty}</div>
      <div className='result__item-question'>{question.question}</div>
      <div data-isCorrect={question.isAnswerCorrect} className='result__item-answer'>{finalString}</div>
    </div>
  );
};

ResultRow.propTypes = {
  question: PropTypes.object
};

export default ResultRow;
