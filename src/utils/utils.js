export default {
  getRidOfSpecialCharacters: function(text) {
    let txt = document.createElement('textarea');
    let result;
    txt.innerHTML = text;
    result = txt.value;
    txt = null;
    return result;
  },
  addNumericDifficulty: function(element) {
    switch (element.difficulty) {
      case 'easy':
        element.numericDifficulty = 1;
        break;
      case 'medium':
        element.numericDifficulty = 2;
        break;
      case 'hard':
        element.numericDifficulty = 3;
        break;
      default :
        element.numericDifficulty = element.difficulty;
        break;
    }
  },
  createListOfAllAnswers: function(element) {
    element.allAnswers = [].concat(element.incorrect_answers, element.correct_answer);
  },
  transformCorrectAnswersToArray: function(element) {
    if (!Array.isArray(element.correct_answer)) {
      element.correct_answer = [element.correct_answer];
    }
  },
  decodeQuestionAndAnswers: function(element) {
    element.question = this.getRidOfSpecialCharacters(element.question);
    element.correct_answer = element.correct_answer.map((answer) => {
      return this.getRidOfSpecialCharacters(answer);
    });
    element.incorrect_answers = element.incorrect_answers.map((answer) => {
      return this.getRidOfSpecialCharacters(answer);
    });
  },
  formatData: function(string) {
    let data = JSON.parse(string).results;


    data.forEach((element) => {
      this.addNumericDifficulty(element);
      this.transformCorrectAnswersToArray(element);
      this.decodeQuestionAndAnswers(element);
      this.createListOfAllAnswers(element);
    });
    return data;
  }
};
