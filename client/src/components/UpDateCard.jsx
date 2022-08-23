
import React, { useState } from 'react'
import { updatevideogame} from '../actions'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import "../Style/UpDateCard.css"



const UpdateGame = () => {
    const history = useHistory()
    const dispatch = useDispatch()
      const oldGame = useSelector(state => state.detail);
    const { id } = useParams()

    let [videogame, setVideogame] = useState({

        name: oldGame.name,
        image: oldGame.image,
        description: oldGame.description,
        released: oldGame.released,
        rating: oldGame.rating,
        platforms: oldGame.platforms,
       

    })

    const validaciones = () => {
        if (videogame.name.length === 0) {
            setVideogame({
                ...videogame,
                name: oldGame.name
            })
        }
        if (videogame.rating.length === 0) {
            setVideogame({
                ...videogame,
                rating: oldGame.rating
            })
        }
        if (videogame.released.length === 0) {
            setVideogame({
                ...videogame,
                released: oldGame.released
            })
        }
       
        if (videogame.description.length === 0) {
            setVideogame({
                ...videogame,
                description: oldGame.description
            })
        }

        return true
    }

    const plataformas = useSelector(state => state.platforms).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    )

    function handlePlatforms(e) {
        if (e.target.value === "All") return videogame
        if (!videogame.platforms.includes(e.target.value))
            setVideogame({
                ...videogame,
                platforms: [...videogame.platforms, e.target.value]
            })
        
        }
        function handleDeleteP(e) {
            setVideogame({
                ...videogame,
                platforms: videogame.platforms.filter((plat) => plat !== e)
            });
        }

    const previewObjc = (e) => {
        e.preventDefault();
       
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (validaciones()) {
            dispatch(updatevideogame(videogame, id))
            history.push('/home');
        }

    }



    return (
        <div>
            <Link to='/home'>
                <button className="btn">Volver a Home</button>
            </Link>
                      
                        <div className="cardComp">
                <h1 className="crumbs" >Actualiza tu Videogame</h1>
                <br />
                <div >
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="crumbs">
                            <h4 className="gust">Nombre: </h4>
                            <input
                                placeholder="Nombre del videogame"
                                type='text'
                                value={videogame.name}
                                name='name'
                                onChange={(e) => previewObjc(e)}
                            />
                            
                        </div>
                        <div className="crumbs">
                            <h4 className="gust">Descripcion :</h4>
                            <textarea
                                type="text"
                                placeholder="Descripcion del juego"
                                name="description"
                                value={videogame.description}
                                onChange={previewObjc}
                                cols="80"
                                rows="15"
                                className="textarea"
                            />
                            
                        </div>
                        <div className="crumbs">
                            <h4 className="gust">Imagen: </h4>
                            <input
                                placeholder="Utilice su imagen o la que hay por default"
                                type='text'
                                value={videogame.image}
                                name='image'
                                onChange={previewObjc} />
                        </div>
                        <div className="crumbs">
                            <h4 className="gust" >Lanzamiento: </h4>
                            <input
                                type='date'
                                value={videogame.released}
                                name='released'
                                onChange={previewObjc}
                            />
                         </div>
                        <div className="crumbs">
                            <h4 className="gust">Rating: </h4>
                            <input
                                className="input-formulario"
                                type="number"
                                placeholder="Puntuacion del juego"
                                name="rating"
                                value={videogame.rating}
                                onChange={previewObjc}
                            />
                            
                        </div>
                        <div className="crumbs">
                            <h4 className="gust" >Plataformas:</h4>

                            <select id="platforms" defaultValue="" onChange={(e) => handlePlatforms(e)}>
                                <option value="All">All</option>
                                {plataformas?.map(p => {
                                    return (
                                        <option value={p} key={p}>{p}</option>
                                    );
                                })}
                            </select>
                        </div>

                        {videogame.platforms.map((p) => (
                            <div className="selecciona">
                                <div><span className="a">{p}</span> </div>
                                <button onClick={() => handleDeleteP(p)} key={p} value={p}>X</button>
                            </div>
                        ))}
                        <div >
                        <input   className='btn' type='submit' value= "ACTUALIZAR"/>
                        </div>

                    </form>

                </div>
            </div>

        </div>
        
    )
}

export default UpdateGame