import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogame, getPlatforms} from '../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import "../Style/CreateVideogame.css"
import "../Style/button.css"



export default function CreateVideogame() {
    const allvideogames = useSelector(state => state.allvideogames)
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const db = allvideogames.filter(e => e.createdVideoGame === true)

    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = `Debe colocar un nombre`;
        }
        if (/^\s/.test(input.name)) {
            errors.name = 'El título no puede comenzar con espacios en blanco'
        };
        if (input.name.length > 40) {
            errors.name = 'El título no puede tener más de 40 caracteres'
        };
        if (!input.name.length) {
            errors.name = `Debe colocar un nombre`};
      ;
        // else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
        //     errors.name = 'Solo se aceptan letras, numeros, guiones medios y parentesis'
        // }

        let search = db.find(e => e.name.toLowerCase() === input.name.toLowerCase())
        if (search) {
            errors.name = "El Nombre del Videojuego ya existe"
            return errors
        }
        if (!input.rating) { errors.rating = "Debe ingresar un puntaje " }
        if (input.rating < 0) { errors.rating = "Debe ingresar un valor positivo" }
        if (input.rating > 5) { errors.rating = "Debe ingresar un valor menor a 6" }


        if (!input.description) {
            errors.description = "Debe colocar una Descripcion"
        }
        // if(input.description.length>255){errors.description= "Debe ingresar menos de 255 caracteres"}
        // ;
        if (!input.released) {
            errors.released = ("Debe colocar una Fecha de lanzamiento ")
        };

        if (!input.genres.length) {
            errors.genres = 'Debe seleccionar Al menos un Genero'
        }

        if (!input.platforms.length) {
            errors.platforms = 'Debe seleccionar Al menos una Plataforma'
        }

        return errors;
    }
    //------------------------------------------------------------------
    const plataformas = useSelector(state => state.platforms).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    )
    //-------------------------------------------------------------------
    const genres = useSelector(state => state.genre)


    const ordenamiento = genres.map((el) => el.name).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        })
    const nuevorden = [...new Set(ordenamiento)]
//--------------------------------------------------------------------------

    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })
//------------------------------------------------------------
    function handleChange(e) {
        e.preventDefault()
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
//---------------------------------------------------------------
    function handleSelect(e) {
        if (e.target.value === "select") return input
        if (!input.genres.includes(e.target.value))
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        setErrors(
            validate({
                ...input,
                genres: [...input.genres, e.target.value],
            })
        );
    }

    function handleDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(oc => oc !== el)
        })
    }
//-----------------------------------------------------------------
    function handlePlatforms(e) {
        if (e.target.value === "All") return input
        if (!input.platforms.includes(e.target.value))
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        setErrors(
            validate({
                ...input,
                platforms: [...input.platforms, e.target.platforms],
            })
        );

    }
    function handleDeleteP(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((plat) => plat !== e)
        });
    }
//--------------------------------------------------------------------------------
    async function handleSubmit(e) {

        e.preventDefault();
        if (!input.name || !input.description || !input.platforms || !input.rating || !input.released) {
            alert("Complete todos los campos para poder continuar")
        }
        
        let existe = await dispatch(postVideogame(input))
        if (existe === "El videojuego ya existe") { return alert("El videojuego ya existe") }
        else {
            setInput({
                name: "",
                image: "",
                description: "",
                released: "",
                rating: "",
                genres: [],
                platforms: []
            })
        }
        alert("Juego creado exitosamente")
        history.push("/home")
    }

//-------------------------------------------------------

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
       

    }, []);

    return (
        <div >
            <Link to='/home'>
                <button className="btn">Volver a Home</button>
            </Link>
            <div className="cardComp">
                <h1 className="crumbs" >Crea tu Videogame</h1>
                <br />
                <div >
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="crumbs">
                            <h4 className="gust">Nombre: </h4>
                            <input
                                placeholder="Nombre del videogame"
                                type='text'
                                value={input.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />
                            <div className="errors">
                                <span>{errors.name}</span>
                            </div>
                        </div>
                        <div className="crumbs">
                            <h4 className="gust">Descripcion :</h4>
                            <textarea
                                type="text"
                                placeholder="Descripcion del juego"
                                name="description"
                                value={input.description}
                                onChange={handleChange}
                                cols="80"
                                rows="15"
                                className="textarea"
                            />
                            <div className="errors">
                                <span>{errors.description}</span>
                            </div>
                        </div>
                        <div className="crumbs">
                            <h4 className="gust">Imagen: </h4>
                            <input
                                placeholder="Utilice su imagen o la que hay por default"
                                type='text'
                                value={input.image}
                                name='image'
                                onChange={handleChange} />
                        </div>
                        <div className="crumbs">
                            <h4 className="gust" >Lanzamiento: </h4>
                            <input
                                type='date'
                                value={input.released}
                                name='released'
                                onChange={handleChange}
                            />
                            <div className="errors"><span>{errors.released}</span></div>
                        </div>
                        <div className="crumbs">
                            <h4 className="gust">Rating: </h4>
                            <input
                                className="input-formulario"
                                type="number"
                                placeholder="Puntuacion del juego"
                                name="rating"
                                value={input.rating}
                                onChange={handleChange}
                            />
                            <div className="errors">
                                <span>{errors.rating}</span>
                            </div>
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

                        {input.platforms.map((p) => (
                            <div className="selecciona">
                                <div><span className="a">{p}</span> </div>
                                <button onClick={() => handleDeleteP(p)} key={p} value={p}>X</button>
                            </div>
                        ))}
                        <span className="errors">
                            {errors.platforms && <span>{errors.platforms}</span>}
                        </span>
                        <div className="crumbs">
                            <h4 className="gust">Genero: </h4>

                            <select onChange={(e) => handleSelect(e)}>
                                <option value="select">Seleccionar..</option>
                                {nuevorden.map((ordenamiento) => {
                                    return ordenamiento ? (
                                        <option
                                            value={ordenamiento}
                                            key={ordenamiento}>
                                            {ordenamiento}
                                        </option>
                                    ) : ("")
                                })}
                            </select>
                        </div>
                        {input.genres.map((d) => (
                            <div className="selecciona">
                                <div><span className="a">{d}</span> </div>
                                <button onClick={() => handleDelete(d)} key={d} value={d}>x</button>
                            </div>
                        ))}

                        <span className="errors">
                            {errors.genres &&
                                <span>  {errors.genres}</span>}
                        </span>
                        <div >
                            <input className="btn" type="submit" value="Crear VideoGame" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}