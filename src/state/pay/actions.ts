import { postPayment } from '@/service/payment.service';
import * as types from './types'

export const fetchData = async (dispatch: any, payload: any) => {
    try {
        dispatch({ type: types.URL_PAY_START }); 
        const data = await postPayment(payload)
        dispatch({ type: types.URL_PAY_START_COMPLETED, payload: data });
    } catch (error) {
        dispatch({ type: types.URL_PAY_START_FAILED, payload: "Ha ocurrido un error" });
    }
  };