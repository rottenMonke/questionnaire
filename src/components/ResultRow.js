import React from 'react';
import decodeHTML from '../utils/decodeHTML';


const ResultRow = ({element}) => {

        const formulateCorrectAnswer = (answer) => {
            let result;
            if(typeof answer === 'string') {
                result = answer;
            }else if(answer.length > 1) {
                result = answer.join(', ');    
            }else {
                result = answer[0];
            }
            return result;
        }

        const formulateMyAnswer = (answer) => {
            return answer.length > 1  ? answer.join(', ') : answer[0];
        }

        const formulateFinalString = (element, myAnswer, correctAnswer) => {
            let finalString = 'You answered ';    
            if(element.type === 'boolean' && typeof element.correct_answer === "string" ) {
                finalString+= 'that this is '+ myAnswer;
                finalString+=element.isAnswerCorrect ? ' and this is a correct answer' : ' but the correct answer is '+ correctAnswer;
            }else {
                finalString+= ' - '+myAnswer;
                finalString+= element.isAnswerCorrect ? ' and this is a correct answer' : ' but the correct answer is - '+ correctAnswer;
            }
            return finalString;
        }

        let myAnswer = formulateMyAnswer(element.myAnswer),
            correctAnswer = formulateCorrectAnswer(element.correct_answer),
            finalString = formulateFinalString(element, myAnswer, correctAnswer);
 
    return (
        <div className="result__item">
                <div className="result__item-difficulty">Difficulty : {element.difficulty}</div>
                <div className="result__item-question">{decodeHTML(element.question)}</div>
                <div data-isCorrect={element.isAnswerCorrect} className="result__item-answer">{finalString}</div>  
        </div>
    );
}

export default ResultRow;