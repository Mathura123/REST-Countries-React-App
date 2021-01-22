import {FETCH_ALL, SEARCH, SORT_BY} from "./actionTypes";

const initialCountryDetails = {
    countries: []
}

const initialSearchValue = {
    searchString: ""
}

const initialSortingType = {
    sortType: "1_A"
}

export const countriesReducer = (state=initialCountryDetails, action) => {
    switch(action.type){
        case FETCH_ALL:
            return {
                ...state,
                countries: action.payload
            }
        default :
            return state
    }
}

export const searchingReducer = (state=initialSearchValue, action) => {
    switch(action.type){
        case SEARCH:
            return {
                ...state,
                searchString: action.payload
            }
        default :
            return state
    }
}

export const sortingReducer = (state=initialSortingType, action) => {
    switch(action.type){
        case SORT_BY:
            return {
                ...state,
                sortType: action.payload
            }
        default :
            return state
    }
}