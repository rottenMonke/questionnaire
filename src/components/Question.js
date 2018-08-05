import React from 'react';
import decodeHTML from '../utils/decodeHTML';


const Question = ({questionData, passResult}) => {

    const questions = [].concat(questionData['incorrect_answers'], questionData['correct_answer']),
          question = decodeHTML(questionData.question);

    const handleSubmit = (event) => {
        event.preventDefault();
        let form = event.target,
            data = new FormData(form),
            result = [];

        data.forEach(function(value){
            result.push(value)
        });
        
        if(result.length == 0) {
            alert('Choose your answer');
            return;
        }

        passResult(result);

        uncheckInputs(form);
    }

    const uncheckInputs = (form) => {
        let inputs = form.querySelectorAll('input');
        inputs.forEach((input) => {
            input.checked = false;
        });    
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <h1>{question}</h1>
                {questions.map((element,index) => {
                    let inputType = questionData.type === 'multiple' ? 'checkbox' : 'radio',
                        answerName = inputType === 'radio'? 'answer': 'answer'+index,
                        answerNameId = answerName+'id', 
                        answer = decodeHTML(element);
                    return (
                        <label id={answerNameId}>
                            {answer}
                            <input id={answerNameId} type={inputType} name={answerName} value={answer}></input>
                        </label>
                    );
                })}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Question;