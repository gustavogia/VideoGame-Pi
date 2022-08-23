
import {
    GET_VIDEOGAMES,
    GETBYNAMEVIDEOGAME,
    GET_DETAILS,
    DELETE_DETAILS,
    ORDER_BY_NAME,
    GET_GENRES,
    FILTER_BY_GENRES,
    ORDER_BY_RATING,
    POST_VIDEOGAME,
    FILTER_CREATED,
    GET_PLATFORMS,
    DELETE_VIDEOGAME_BYID,
    UPDATE_VIDEOGAMES,
    FILTER_PLATFORMS,
    FILTER_RATING_CREATE,
    CLEAR_FILTER,
} from "../actions/index.js"



const initialState = {

    videogames: [],
    allvideogames: [], ///aca voy a poner todos los filtrados
    detail: [],
    genre: [],
    platforms: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allvideogames: action.payload
            }
        case GETBYNAMEVIDEOGAME:
            return {
                ...state,
                allvideogames: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case DELETE_DETAILS:
            return {
                ...state,
                detail: []
            }
        case ORDER_BY_NAME:
            // let sortedArr1 = action.payload === 'asc' ?
            //     state.allvideogames.sort(function (a, b) {
            //         if (a.name > b.name) {
            //             return 1;
            //         }
            //         if (b.name > a.name) {
            //             return -1;
            //         }
            //         return 0;
            //     }) :
            //     state.allvideogames.sort(function (a, b) {
            //         if (a.name > b.name) {
            //             return -1;
            //         }
            //         if (b.name > a.name) {
            //             return 1;
            //         }
            //         return 0;
            //     })
            const order = action.payload === 'A-Z' ?
                state.allvideogames.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return -1
                    return 0
                })
                :
                state.allvideogames.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return - 1
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1
                    return 0
                })
            return {
                ...state,
                allvideogames: order
            }

        case GET_GENRES:
            return {
                ...state,
                genre: action.payload
            }
        case FILTER_BY_GENRES:
            const allVideojuegos = state.videogames
            const genresFiltered = action.payload === 'All' ?
                allVideojuegos : allVideojuegos.filter(ch => ch.genres.includes(action.payload))
            return {
                ...state,
                allvideogames: genresFiltered
            }
        case ORDER_BY_RATING:
            let order2 = action.payload === 'Min-Max' ?
                state.allvideogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allvideogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                allvideogames: order2
            }
        case POST_VIDEOGAME:
            return {
                ...state
            }
        case FILTER_CREATED:
            const allvideojuegos = state.videogames
            const createdFilter = action.payload === 'created' ? allvideojuegos.filter(
                ch => ch.createdVideoGame) : allvideojuegos.filter(ch => !ch.createdVideoGame)
            return {
                ...state,
                allvideogames: action.payload === 'All' ? state.videogames : createdFilter

            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: [...action.payload]
            }
        case DELETE_VIDEOGAME_BYID:
            return {
                ...state,
            };
        case UPDATE_VIDEOGAMES:
            return {
                ...state,
            };
        case FILTER_PLATFORMS:
            const allplatforms = state.videogames
            const platformsFiltered = action.payload === 'All' ?
                allplatforms : allplatforms.filter(ch => ch.platforms.includes(action.payload))
            return {
                ...state,
                allvideogames: platformsFiltered
            }
        case FILTER_RATING_CREATE:
            // const dbrat = state.allvideogames.filter(e => e.createdVideoGame === true)
            // const ordenar=action.payload ==="Max-Min" ? dbrat.sort ((a,b)=>Number(b.rating) - Number(a.rating)):
            // dbrat.sort ((a,b)=>Number(a.rating) - Number(b.rating))
            // return {
            //     ...state,
            //     allvideogames: ordenar
            // }
            const dbrat = state.allvideogames.filter(e => e.createdVideoGame === true)
            let ordenar = action.payload === 'Min-Max' ?
                dbrat.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                dbrat.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                allvideogames: ordenar
            }
            case CLEAR_FILTER:
      return {
        ...state,
        allvideogames: [...state.videogames],
      };
        default:
            return state
    }

}
export default rootReducer;