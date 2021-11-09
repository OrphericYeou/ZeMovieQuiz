import { START_TIMER, RESTART_TIMER, ADD_SECOND, ADD_FILMS } from './types'
import * as API from '../http';

const TIMER_DURATION = 30

const initialState = {
    isPlaying:false,
    elapsedTime:0,
    timerDuration: TIMER_DURATION,
    films:[],
    point:0,
}


function applyStartTimer(state) {
    return{
        ...state,
        isPlaying: true,
    }
}

function applyRestartTimer(state) {
    return {
        ...state,
        isPlaying: false,
        elapsedTime:0,
        timerDuration:TIMER_DURATION
    }
}

function applyAddSecond(state) {
    if(state.elapsedTime < TIMER_DURATION){
        return{
            ...state,
            elapsedTime: state.elapsedTime + 1
        }
    }
    else{
        return{
            ...state,
            isPlaying:false
        }
    }
}


async function applyGetFilm(state) {
    let films =[]
    await API.getListFilm().then(async response => {
        if (response.success) {
            console.log(response.success)
        }
        else {
            //console.log(response.items)
            for(let i= 0; i < response.items.length; i++ ){
                //console.log(i)
                await API.getMovieDetails(response.items[i].id).then(async res => {
                    if (res.success) {
                        console.log(res.success)
                    }
                    else{
                        let film = {
                            id: response.items[i].id,
                            title: response.items[i].title,
                            name:res.cast[0].name
                        }
                        films.push(film)
                    }
                })
                
            }

        }
    })
    console.log(films)
    return {
        ...state,
        films:films,
    }
}



function reducer(state = initialState, action) {
    switch(action.type){
        case START_TIMER:
            return applyStartTimer(state);
        
        case RESTART_TIMER:
            return applyRestartTimer(state);

        case ADD_SECOND:
            return applyAddSecond(state);

        case ADD_FILMS:
            return applyGetFilm(state); 

        default:
            return state;
    }
}

export default reducer