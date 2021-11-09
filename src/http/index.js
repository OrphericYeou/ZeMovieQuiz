import request from './request';
import {API_KEY} from "@env"

export const getListFilm = () => {
  return request({
    url: `3/list/1?api_key=${API_KEY}&language=en-US`,
    method: 'GET'
  });
};


export const getMovieDetails = (id) => {
  return request({
    url: `3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    method: 'GET'
  });
};


