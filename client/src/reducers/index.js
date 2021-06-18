import { combineReducers } from 'redux';
import dietsReducer from "./dietsReducer";
import notificationRedudcer from './notificationReducer';
import recipesReducer from "./recipesReducer";

const rootReducer = combineReducers({
    diets: dietsReducer,
    recipes: recipesReducer,
    notification: notificationRedudcer
});


export default rootReducer;