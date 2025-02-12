import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
    const counter = useSelector((state) => state.counter); // Access counter from the store
    const dispatch = useDispatch();

    const increment = () => {
        dispatch({ type: 'INCREMENT' }); // Send INCREMENT action
    };

    const decrement = () => {
        dispatch({ type: 'DECREMENT' }); // Send DECREMENT action
    };
    const reset = () => {
        dispatch({ type: 'RESET' })
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement} style={{ marginLeft: '10px' }}>Decrement</button>
            <button onClick={reset} style={{ marginLeft: '10px' }}>Reset</button>
        </div>
    );
};

export default Counter;
