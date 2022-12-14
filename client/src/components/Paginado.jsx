import React from "react";
import "../Style/Paginado.css"
import {useSelector} from "react-redux"

export default function Paginado({ videogamesPerPage, allvideogames, paginado, currentPage }) {
    const pageNumbers = []



    for (let i = 1; i <= Math.ceil(allvideogames / videogamesPerPage) ; i++) {
        pageNumbers.push(i);
    }

    
    return (
        <div className="crumbs">
          <nav className="guiliano">
              {currentPage > 1 ? (
                <li onClick={() => paginado(currentPage - 1)}>
                  <button className="crumb">Prev</button>
                </li>
              ) : null}
            
              <nav className="crumbs">
               {
                    pageNumbers&&
                    pageNumbers.map(number => {
                        if(number < currentPage + 2 && number > currentPage - 2){
                            return (
                                <button  key={number} onClick={()=> paginado(number)}>{number}</button>
                            )
                        }}
                        
                    )   }
                    </nav>     
            {currentPage < allvideogames / videogamesPerPage ? (
                <li onClick={() => paginado(currentPage + 1)}>
                  <button className="crumb">Next</button>
                </li>
              ) : null}
          </nav>
        </div>
      );
    }