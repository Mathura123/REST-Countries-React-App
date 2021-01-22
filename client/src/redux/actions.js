import {FETCH_ALL, SEARCH, SORT_BY} from "./actionTypes";
import * as api from "../api";

export const storeCountryDetails=()=> async(dispatch) => {
    try{
        const { data } = await api.fetchCountry();
    dispatch({
        type: FETCH_ALL,
        payload:data,
        info : 'Stores Country Details',
    });
    } catch(error){
        console.log(error.message);
    }
}

export const doSearch = (string) =>{
    return{
        type: SEARCH,
        info: 'Does Searching',
        payload: string
    }
}

export const sortByColumn = (sortingType) =>{
    return{
        type: SORT_BY,
        info: 'Does Sorting',
        payload: sortingType
    }
}