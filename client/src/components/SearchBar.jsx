import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByNameVideogame } from "../actions";
import Style from "../Style/SearchBar.module.css"

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] = useState("");

//   const validate = (value) => {
//       let error = "";
//       let testLetter = /^[:digit:]$/; //validate letter
//       if(testLetter.test(value)){
//           error = 'Ingresar solo letras minusculas'
//       }
//       return error;
//   }

    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        // setError(validate(e.target.value))
        // //console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        if(!name) {
            alert('Por favor ingrese el nombre de un Videogame')
        }else if(!error){
            dispatch(getByNameVideogame(name));
            setCurrentPage(1)
            setName('')
            
        }else {
            alert(error)
        }
    }

    return (
        <div className= {Style.selecto}>
            <input
            type = "text"
            value={name}
            placeholder= "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            
            />
            
            <button type="submit" className={Style.btnCreate} onClick={e => handleSubmit(e)}>Buscar</button>
            
        </div>
    )
}