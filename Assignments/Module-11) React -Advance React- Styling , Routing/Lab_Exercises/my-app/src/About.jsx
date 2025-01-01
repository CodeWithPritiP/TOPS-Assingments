import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
      const navigate = useNavigate();
      const handleGoHome = () => navigate("/");
  return (
    <>
    <h1>This is about page</h1>
    <button onClick={handleGoHome}>Back to Home</button>
    </>
  )
}

export default About