import axios from "axios"

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const ADD_VIDEOGAME = 'ADD_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GENRES_FILTER = 'GENRES_FILTER';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const VIDEOGAMES_ORIGIN = 'VIDEOGAMES_ORIGIN';
export const SORT_VGAMES = 'SORT_VGAMES';
export const GET_VGAMES_BY_NAME = 'GET_VGAMES_BY_NAME';
export const POST_VGAME = 'POST_VGAME';
export const GET_VGAME_BY_ID = 'GET_VGAME_BY_ID';
export const DELETE_VGAME = 'DELETE_VGAME';

export function getvgames() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: result.data
        })
    }
}

export function getvgbyname(name) {
    return async function (dispatch) {
        try {
            var result = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: GET_VGAMES_BY_NAME,
                payload: result.data
            })
        } catch (error) {
            console.log('Error in Action GET_VGAMES_BY_NAME: ', error)
        }
    }
}


export function getvgamebyid(id) {
    return async function (dispatch) {
        try {
            var result = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_VGAME_BY_ID,
                payload: result.data
            })
        } catch (error) {
            console.log('Error in Action GET_VGAMES_BY_ID: ', error)
        }
    }
}

export function getgenres() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3001/genres');


        return dispatch({
            type: GET_GENRES,
            payload: result.data
        })
    }
}

export function genrefilter(payload) {
    return {
        type: GENRES_FILTER,
        payload
    }
}

export function postvgame(payload) {
    return async function () {
        console.log("mi payload", payload)
        var result = await axios.post('http://localhost:3001/videogames', payload);
        return result
    }
}

export function sortvgames(payload) {
    return {
        type: SORT_VGAMES,
        payload
    }
}

export function vgorigin(payload) {
    return {
        type: VIDEOGAMES_ORIGIN,
        payload
    }
}

export function getplatforms() {
    return {
        type: GET_PLATFORMS
    }
}