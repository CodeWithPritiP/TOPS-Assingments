import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");

  return (
    <>
    <h1>This is Contact Page</h1>
    <button onClick={handleGoHome}>Back to Home</button>
    </>
  )
}

export default Contact