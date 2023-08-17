import * as types from './types'

const initialState = {
    pay: null,
    loading: false,
    error: null
  };
  
  const payReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case types.URL_PAY_START:
        return { ...state, loading: true, error: null };
      case types.URL_PAY_START_COMPLETED:
        return { ...state, pay: action.payload, loading: false };
      case types.URL_PAY_START_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default payReducer;