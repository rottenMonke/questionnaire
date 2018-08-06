import React from 'react';
import PropTypes from 'prop-types';

const OneOption = ({ data }) => {
    
  return (
    <div>
        {data.map((answer, index) => {
          return (
            <label className='question__option' key={'radio'+index}>
              {answer}
              <input type='radio'
                name='answer' value={answer} />
            </label>
          );
        })}
    </div>
  );
};

OneOption.propTypes = {
  data: PropTypes.array
};

export default OneOption;
