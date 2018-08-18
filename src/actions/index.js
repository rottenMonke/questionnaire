const actions = {
  nextQuestion: (newID) => {
    return { type: 'NEXT_QUESTION', payload: newID };
  },
  dataLoaded: () => {
    return { type: 'DATA_LOADED', payload: true };
  },
};

export default actions;
