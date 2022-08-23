import React from "react";
import { Link } from "react-router-dom";
import "../Style/LandingPage.css"


export default function LandingPage() {
    return (
        <div classname="background1"> 
        <div className="overlay"></div>
                < div className="titulo">
                  
        <h1  className = "title">Welcome to ...</h1>
        <h1  className = "title">VideoGame API</h1>
     
            <Link to='/home'>
                <button className ="btn">START</button>
            </Link>
        </div>
            
        </div>
    );
}