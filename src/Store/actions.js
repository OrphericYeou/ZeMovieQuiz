import {START_TIMER, RESTART_TIMER,ADD_SECOND, ADD_FILMS} from './types'

function startTimer() {
    return{
        type:START_TIMER
    }
}

function restartTimer() {
    return {
        type: RESTART_TIMER
    }
}

function addSecond() {
    return {
        type: ADD_SECOND
    }
}

function getFilms() {
    return {
        type: ADD_FILMS
    }
}

const actionCreators = {
    startTimer,
    restartTimer,
    addSecond,
    getFilms
}

export {actionCreators}
