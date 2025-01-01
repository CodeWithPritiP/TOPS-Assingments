import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stylehome.css'

const HandlingEvent = () => {

    const navigate = useNavigate();
    const handleGoHome = () => navigate("/");
    const [buttonText, setButtonText] = useState("Not Clicked");
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
      setButtonText("Clicked!");
    };

  return (
    <>
    <div>
      <h1>React Event Handling Example</h1>
      <p>{buttonText}</p> 
      <button onClick={handleClick}>Click Me</button> 
      </div>
      <div>
        <hr />
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <p>{inputValue}</p>
    </div>
    <button onClick={handleGoHome}>Back to Home</button>
    </>
  )
}

export default HandlingEvent