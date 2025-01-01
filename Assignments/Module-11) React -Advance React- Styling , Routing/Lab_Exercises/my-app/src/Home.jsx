import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Stylehome.css'
const Home = () => {
    const navigate = useNavigate();
    const openIntro = () => {
        navigate('/Intro');
      };
    const openJavascriptXML = () => {
        navigate('/JavascriptXML');
    }
    const openHandlingEvent = () =>{
        navigate('/HandlingEvent');
    }
    const openListandKey = () => {
        navigate('/ListandKey');
    }
    const openNavigationBar = () =>{
        navigate('/NavigationBar');
    }
  return (
    <>
    <h1>All Practical of React.js in here!!</h1>
    <h2>Click on follow Button to see</h2>

    <button onClick={openIntro}>Introduction to React.js</button>

    <button onClick={openJavascriptXML}>JSX (JavaScript XML)</button>
    
    <button onClick={openHandlingEvent}>Handling Events in React</button>

    <button onClick={openListandKey}>Lists and Keys</button>

    <button onClick={openNavigationBar}>Routing in React (React Router)</button>
    </>
  )
}

export default Home