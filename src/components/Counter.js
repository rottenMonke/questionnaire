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
  currentQuestion: PropTypes.string,
  totalAmountOfQuestions: PropTypes.string,
};

export default Counter;
