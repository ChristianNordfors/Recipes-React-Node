import axios from 'axios';
import { GET_DIETS } from './types';


export function getDiets() {
    return function (dispatch) {
        return axios.get("http://localhost:3001/diets/types")
            .then(({ data }) => {
                dispatch({ type: GET_DIETS, payload: data.diets });
            });
    }
}