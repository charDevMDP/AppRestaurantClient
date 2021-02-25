import React,{ useReducer } from 'react';

import OrderReducer from './orderReducer';
import OrderContext from "./orderContext";
import {
  CONFIRMAR_ORDEN_PLATO,
  SELECCIONAR_PRODUCTOS,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from "../../types";


const OrderState = props => {

  // state inicial
  const initialState = {
    order:[],
    dish: null,
    total: 0,
    idOrder: ''
  }

  // useReducer con dispath para ejecutar las funciones
  const [state, dispatch] = useReducer(OrderReducer,initialState)

  // seleccionar el producto
  const selectDish = dish => {
      dispatch({
        type: SELECCIONAR_PRODUCTOS,
        payload: dish
      })
  }

  // cuando se confirma un platillo
  const saveOrder = order => {
    dispatch({
      type: CONFIRMAR_ORDEN_PLATO,
      payload: order
    })
  }

  // total a pagar
  const showSummary = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total
    })
  }

  // eliminar orden
  const deleteOrder = id => {
    console.log('en el state');
    console.log(id);
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id
    })
  }

  // pedido realizado
  const orderPlaced = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id
    })
  }
  return(
    <OrderContext.Provider
      value={{
        order: state.order,
        dish: state.dish,
        total: state.total,
        idOrder: state.idOrder,
        selectDish,
        saveOrder,
        showSummary,
        deleteOrder,
        orderPlaced
      }}
    >
      {props.children}
    </OrderContext.Provider>
  )

}

export  default OrderState;