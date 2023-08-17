import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Asume que tienes un archivo reducers.js donde combinamos todos los reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
