import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deletevideogamebyid } from "../actions/index";
import "../Style/Detail.css"
import imgirando from "../assets/imgirando.gif"


export default function Detail(props) {
    const history = useHistory()
    const [carga, setCarga] = useState(true);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getDetail(props.match.params.id)).then(() => setCarga(false));
        // return () => {dispatch(deleteDetails())};
    }, [dispatch, props.match.params.id])

    const myVideogame = useSelector((state) => state.detail)
    
    const handleDelete = () => {
        dispatch(deletevideogamebyid (myVideogame.id));
        alert("El videogame esta siendo eliminado")
        history.push("/home");
      };
     
      
    var regex = /(<([^>]+)>)/gi;


    if (carga) {
        return (<div className="gif"><h2>Loading..</h2><img src={imgirando} alt="mario" className="mario" /></div>)
    }

    return (
        <Fragment>
            <div className="tail">

                <Link to='/home' className="linka">
                    <button>Back to Home</button>
                </Link>
            </div>
            <div className="delete">
            {typeof myVideogame.id === "string" && (
              <button onClick={handleDelete} >
                DELETE
              </button>
            )}
          </div>
          <div className="delete">
            {typeof myVideogame.id === "string" && (
              <Link to={/updatecard/ + myVideogame.id}>
              <button  >
                UPDATE
              </button>
              </Link>
            )}
          </div>
            
            <h1 className="detailh1">Videogame: {myVideogame.name}</h1>
            <div className="detail">

                <div>
                    <img src={myVideogame.image ? myVideogame.image : "not found"} alt={`${myVideogame.name}'s`} width="300px" height="150px" />
                    <div>
                        <h3>Description: </h3>
                        <textarea type="text" cols="78"
                                rows="20">{myVideogame.description?.replace(regex, '').replace('&#39', '')}</textarea>
                    </div>
                </div>
                <div >
                    <div>
                        <h3>Rating:</h3>
                        <h4>  {myVideogame.rating}</h4>
                    </div>
                    <div>
                        <h3>Lanzamiento:  </h3>
                        <h4>{myVideogame.released}</h4>
                    </div>
                    <div>
                        <h3>Genero: </h3>
                        <h4>{myVideogame.genres?.map(g => (g.name ? g.name : g)).join(', ')}</h4>
                    </div>
                    <div>
                        <h3>Plataformas: </h3>
                        <h4>  {myVideogame.platforms?.join(', ')}</h4>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
