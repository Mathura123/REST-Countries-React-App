import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { countriesReducer,searchingReducer,sortingReducer } from "./reducers";

const rootReducer = combineReducers({
    countiesDetails: countriesReducer,
    search: searchingReducer,
    sortingType: sortingReducer
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));