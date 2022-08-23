import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getvideogames,
  orderByName,
  filterVideoGamesByGenres,
  getGenres,
  orderByRating,
  filterCreated,
  filterRatingCreate,
  filterPlatforms,
  getPlatforms,
  clearfilter
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import "../Style/Home.css";
import imgirando from "../assets/imgirando.gif";
import ken from "../assets/ken.gif"


export default function Home() {

  const dispatch = useDispatch()
  const allvideogames = useSelector((state) => state.allvideogames)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(15)
  const indexOfLastVideogame = currentPage * videogamesPerPage // 15//3
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // 0
  const currentVideogames = allvideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
  //pag 1--0----15
  //pag 2--15----30
  //pag 3---30---45

  const [carga, setCarga] = useState(true);
  const genres = useSelector(state => state.genre)
  const platforms = useSelector(state => state.platforms)

  const ordenamiento = genres.map((el) => el.name).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    })
  const nuevorden = [...new Set(ordenamiento)]

  const ordenamiento1 = platforms.sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    })
  const nuevorden1 = [...new Set(ordenamiento1)]


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getPlatforms())
    dispatch(getvideogames()).then(() => setCarga(false));
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getvideogames());
  }
  function handleFilterGenres(e) {
    if (e.target.value === "select") return e.preventDefault()
    e.preventDefault();
    dispatch(filterVideoGamesByGenres(e.target.value));
    setCurrentPage(1)

  }
  function handleSort(e) {
    if (e.target.value === "select") return e.preventDefault()
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleSortRating(e) {
    if (e.target.value === "select") return e.preventDefault()
    dispatch(orderByRating(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleSortRatingCreate(e) {
    if (e.target.value === "select") return e.preventDefault()
    dispatch(filterRatingCreate(e.target.value));
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleFilterPlatforms(e) {
    if (e.target.value === "select") return e.preventDefault()
    e.preventDefault();
    dispatch(filterPlatforms(e.target.value));
    setCurrentPage(1)

  }
  function handleClickfilter(e) {
    e.preventDefault();
    dispatch(clearfilter());
    setCurrentPage(1);
    document.getElementById("genreselect").value = "select";
    document.getElementById("existenciaselect").value = "All";
    document.getElementById("plateselect").value = "select";
    document.getElementById("ratingselect").value = "select";
    document.getElementById("orderselect").value = "select";
    document.getElementById("ratingcreateselect").value = "select";

  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1)
  }
  if (carga) {
    return (<div className="gif"><h2>Loading..</h2><img src={imgirando} alt="mario" className="mario" /></div>)
  }

  return (
    <div >
      <div>
        <h1 className="titles">Starting...</h1>
        <h1 className="titles">VIDEO GAME API</h1>
      </div>
      <SearchBar setCurrentPage={setCurrentPage} />
      < div className="selectconteiner">
        <button className="limpiar" onClick={e => { handleClick(e) }}>
          Refresh
        </button>
        <Link to='/videogame' >
          <button className="btnCreatedi">Crear Videogame</button>
        </Link>

        <button className="limpiar"
          onClick={(e) => {
            handleClickfilter(e);
          }}>
          Limpiar Filtros
        </button>

      </div>
      <div className="home">

        <div className="selectconteiner">
          <div className="select">
            <span className="span">Order by Name</span>
            <select id="orderselect" className="span" onChange={e => handleSort(e)}>
              <option value="select">Seleccionar..</option>
              <option value='A-Z'>De A-Z</option>
              <option value='Z-A'>De Z-A</option>
            </select>
          </div>
          <div className="select">
            <span className="span">Order by Rating</span>
            <select id="ratingselect" className="span" onChange={e => handleSortRating(e)}>
              <option value="select">Seleccionar..</option>
              <option value='Max-Min'>Max-Min</option>
              <option value='Min-Max'>Min-Max</option>
            </select>
          </div>
          <div className="select">
            <span className="span">Filter by Genero: </span>
            <select id="genreselect" className="span" onChange={(e) => handleFilterGenres(e)}>
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
          <div className="select">
            <span className="span">Filter by Existence</span>
            <select id="existenciaselect" className="span" onChange={e => handleFilterCreated(e)}>
              <option value='All'>Todos</option>
              <option value='created'>Creados</option>
              <option value='api'>Existente</option>
            </select>
          </div>
        </div>
        <div className="selectconteiner">
          <div className="select">
            <span className="span">Order by Rating Create</span>
            <select id="ratingcreateselect" className="span" onChange={e => handleSortRatingCreate(e)}>
              <option value="select">Seleccionar..</option>
              <option value='Max-Min'>Max-Min</option>
              <option value='Min-Max'>Min-Max</option>
            </select>
          </div>
          <div className="select">
            <span className="span">Filter by Platforms: </span>
            <select id="plateselect" className="span" onChange={(e) => handleFilterPlatforms(e)}>
              <option value="select">Seleccionar..</option>
              {nuevorden1.map((ordenamiento1) => {
                return ordenamiento1 ? (
                  <option
                    value={ordenamiento1}
                    key={ordenamiento1}>
                    {ordenamiento1}
                  </option>
                ) : ("")
              })}
            </select>
          </div>
        </div>
        <div className="paginate">
          <Paginado
            videogamesPerPage={videogamesPerPage}
            allvideogames={allvideogames.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
        <div className="cards">
          {!currentVideogames.length ? <div className="mensaje" ><span >"NO hay videojuegos Creados para mostrar"</span><br /><img src={ken} /></div>
            : currentVideogames?.map((ch) => (
              <div key={ch.id}>
                <Link to={'/home/' + ch.id} className="linkCard">
                  <Card name={ch.name}
                    background_image={ch.image}
                    genres={ch.genres}
                    rating={ch.rating}
                  />
                </Link>
              </div>
            ))}
        </div>
        <div className="paginate">
          <Paginado
            videogamesPerPage={videogamesPerPage}
            allvideogames={allvideogames.length}
            paginado={paginado}
          />
        </div>
      </div>
    </div>
  );
}



