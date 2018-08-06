import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ currentQuestion, totalAmountOfQuestions }) => {
  return (
    <div className='counter'>
      {currentQuestion} out of {totalAmountOfQuestions}
    </div>
  );
};

Counter.propTypes = {
  currentQuestion: PropTypes.number,
  totalAmountOfQuestions: PropTypes.number,
};

export default Counter;
