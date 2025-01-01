import React from 'react'
import { useNavigate } from 'react-router-dom';

const JavascriptXML = () => {

        const navigate = useNavigate();
        const handleGoHome = () => navigate("/");
        const feature = "dynamic data binding"; 
        const description =
          "JSX allows developers to write HTML-like syntax in JavaScript files.";
        const reactVersion = 18; 
        const currentYear = new Date().getFullYear(); 
      
  return (
    <>
    <h1>"Welcome to JSX"</h1>
    <p>
        <strong>{description}</strong> It supports <strong>{feature},</strong> which makes it easier to create
        interactive user interfaces. React version <strong>{reactVersion} </strong>provides an
        improved way to use JSX. As of <strong>{currentYear}, </strong>it remains one of the
        most popular libraries for building web applications.
      </p>
      <hr />
      <p>In above paragraph all strong text are done through dynamic variable</p>
      <hr />
      
      <button onClick={handleGoHome}>Back to Home</button>
  
    </>
  )
}

export default JavascriptXML