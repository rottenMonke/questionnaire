import React from 'react';
import PropTypes from 'prop-types';

const MultipleOptions = ({ data }) => {
  return (
    <div>
      {data.map((answer, index) => {
        return (
          <label className='question__option' key={'checkbox' + index}>
            {answer}
            <input type='checkbox'
              name={'answer' + index} value={answer} />
          </label>
        );
      })}
    </div>
  );
};

MultipleOptions.propTypes = {
  data: PropTypes.array
};

export default MultipleOptions;
