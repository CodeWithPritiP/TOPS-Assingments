import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListandKey = () => {

    const navigate = useNavigate();
    const handleGoHome = () => navigate("/");
    const Fruits = ['Apple','Banana','Custard Apple','Strawberry','Mango','Guava','Water Chestnut']; 

    const Users = [ {id:'1',name:'Priti',Surname:'Parmar'},
                    {id:'2',name:'Bhuyash',Surname:'Parmar'},
                    {id:'3', name:'Bhavika',Surname:'Panchal'}]
  return (
    <>
    {Fruits.map((result) => {
        return (
            <ul>
                <li>{result}</li>
            </ul>
        )
    })}
    <hr/><br/>
    {Users.map((res) => {
        return(
            <ul>
                <li>ID = {res.id}&nbsp;Name = {res.name}  {res.Surname}</li>
            </ul>
        )
    })}
    <button onClick={handleGoHome}>Back to Home</button>
    </>
  )
}

export default ListandKey