import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GETBYNAMEVIDEOGAME = "GETBYNAMEVIDEOGAME";
export const GET_DETAILS = "GET_DETAILS";
export const DELETE_DETAILS = "DELETE_DETAILS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_GENRES= "GET_GENRES";
export const FILTER_BY_GENRES= "FILTER_BY_GENRES";
export const ORDER_BY_RATING= "ORDER_BY_RATING";
export const POST_VIDEOGAME= "POST_VIDEOGAME";
export const FILTER_CREATED="FILTER_CREATED";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const DELETE_VIDEOGAME_BYID = "DELETE_VIDEOGAME_BYID";
export const UPDATE_VIDEOGAMES = "UPDATE_VIDEOGAMES";
export const FILTER_RATING_CREATE ="FILTER_RATING_CREATE";
export const FILTER_PLATFORMS = "FILTER_PLATFORMS";
export const CLEAR_FILTER ="CLEAR_FILTER";


export function getvideogames(){
    return async function (dispatch) {
        var json = await axios.get('/videogames')
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: json.data
        })
    }
}
export function getByNameVideogame(name){
    return async function (dispatch){
        try {
            var json = await axios.get('/videogames?name=' + name);
            return dispatch ({
                type: GETBYNAMEVIDEOGAME,
                payload: json.data
            })
        } catch (error) {
           alert("El Videogame no existe")
        }
    }
   }

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('/videogame/' + id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}
export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: DELETE_DETAILS
    })
}
}

export function getGenres(){
    return async function (dispatch){
        var info = await axios.get('/genres')
        return dispatch({
            type: GET_GENRES,
            payload: info.data
        })
    }
}
export function postVideogame(payload) {
    return async function (dispatch) {
      const json = await axios.post("/videogame", payload);
      return json.data
    };
  }
  export const getPlatforms = () => {
    return async (dispatch) => {
        const url = await axios.get('/platforms')
        //console.log(url)
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: url.data
        })
    }
  };
  
///FILTROS Y ORDENAMIENTOS
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function filterVideoGamesByGenres(payload) {
    return {
      type: FILTER_BY_GENRES,
      payload,
    };
  }
  export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}
export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}
//// RUTA PARA BORRAR POR ID

export function deletevideogamebyid(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        return dispatch({ type: DELETE_VIDEOGAME_BYID });
      } catch (error) {
        console.log(error);
      }
    };
  }
  export const updatevideogame = (gameUpdate, id) => {
    return async function (dispatch) {
      await axios.put(`/updatecard/${id}`, gameUpdate);
      return dispatch({
        type: UPDATE_VIDEOGAMES,
      });
    };
  };
  export function filterRatingCreate(payload) {
    return {
        type:FILTER_RATING_CREATE,
        payload
    }
}

export function filterPlatforms(payload) {
    return {
        type:FILTER_PLATFORMS,
        payload
    }
}
export const clearfilter = () => {
    return {
      type: "CLEAR_FILTER",
    };
  };
