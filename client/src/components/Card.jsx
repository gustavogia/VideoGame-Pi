import React from "react";
import "../Style/Card.css"


export default function Card({ name, background_image, genres, rating}) {
   
  return (
    <div className="centrar">
        <div className="cardComp">
            <h3 >{name}</h3>
            <img   src={background_image} alt='img not found' width='200px' height='250px' />
            <div><h3>Rating: </h3><h5>{rating}</h5></div>
            
            <div >
                <h3>Genero :</h3>{genres ? (
                  <h5 >
                    {genres.map((e) => `${e} `).join(', ')}
                  </h5>
                ) : (
                  undefined
                )} 
                
              </div>
          
        </div>
        </div>
        
    );
}