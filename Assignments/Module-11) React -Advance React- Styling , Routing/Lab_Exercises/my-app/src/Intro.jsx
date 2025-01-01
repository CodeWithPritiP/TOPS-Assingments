import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");
  return (
    <>
    <h1>Hello React!</h1>
    <button onClick={handleGoHome}>Back to Home</button>
    </>
  )
}

export default Intro