import { createStore } from 'redux';

// Initial state
const initialState = {  counter: 0, // We'll track a simple counter for now
};

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
     return state.counter > 0 
        ? { ...state, counter: state.counter - 1 } 
        : state; // Prevent decrementing below 0
    case 'RESET':
        return {...state, counter: 0};
    default:
      return state;
  }
};

// Create the store
const store = createStore(counterReducer);

export default store;
