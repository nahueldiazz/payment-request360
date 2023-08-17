import { combineReducers } from "redux";

// Importa tus diferentes reducers aquí
import payReducer from "./pay";

// Combina los reducers utilizando combineReducers
const rootReducer = combineReducers({
  pay: payReducer
  // Puedes agregar más reducers aquí si los necesitas
});

export default rootReducer;
