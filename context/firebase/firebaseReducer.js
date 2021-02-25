import { OBTENER_PRODUCTOS_OK } from "../../types";


export default (state,action) => {
  switch (action.type){
    case OBTENER_PRODUCTOS_OK:
      return {
        ...state,
        menu: action.payload
      }
    default:
      return state;
  }
}