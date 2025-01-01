import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Intro from './Intro';
import JavascriptXML from './JavascriptXML';
import HandlingEvent from './HandlingEvent';
import ListandKey from './ListandKey';
import NavigationBar from './NavigationBar';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Intro" element={<Intro />} />
        <Route path="/JavascriptXML" element={<JavascriptXML />} />
        <Route path='/HandlingEvent' element={<HandlingEvent/>} />
        <Route path='/ListandKey' element={<ListandKey/>}/>
        <Route path='/NavigationBar' element={<NavigationBar/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;
