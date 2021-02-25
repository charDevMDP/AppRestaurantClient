import {
  CONFIRMAR_ORDEN_PLATO,
  ELIMINAR_PRODUCTO,
  MOSTRAR_RESUMEN,
  PEDIDO_ORDENADO,
  SELECCIONAR_PRODUCTOS,
} from "../../types";

export default (state,action) => {
  console.log('en el reducer');
  console.log(action.payload)
  switch (action.type){
    case SELECCIONAR_PRODUCTOS:
      return {
        ...state,
        dish:action.payload
      }
    case CONFIRMAR_ORDEN_PLATO:
      return {
        ...state,
        order:[...state.order, action.payload]
      }
    case MOSTRAR_RESUMEN:
      return {
        ...state,
        total: action.payload
      }
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        order: state.order.filter(art => art.id !== action.payload)
      }
    case PEDIDO_ORDENADO:
      return {
        ...state,
        order:[],
        total: 0,
        idOrder: action.payload
      }
    default:
      return state;
  }
}