import React,{ useReducer } from 'react';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from "./firebaseContext";
import firebase from "../../firebase";

import { OBTENER_PRODUCTOS_OK } from "../../types";
import _ from 'lodash'

const FirebaseState = props => {

  // state inicial
  const initialState = {
    menu:[]
  }

  // useReducer con dispath para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer,initialState)

  // funcion que se ejecuta para trear los productors
  const getProducts = () => {

    // consultar firebase
    firebase.db
      .collection('products')
      .where('exists','==',true)
      .onSnapshot(handleSnapshot)

      function handleSnapshot(snap){
        let dishes = snap.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });

        // ordenar por categoria
        dishes = _.sortBy(dishes, 'category')

        console.log(dishes)

        dispatch({
          type: OBTENER_PRODUCTOS_OK,
          payload: dishes
        })

      }


  }

  return(
    <FirebaseContext.Provider value={{menu: state.menu, firebase ,getProducts}}>
      {props.children}
    </FirebaseContext.Provider>
  )

}

export  default FirebaseState;