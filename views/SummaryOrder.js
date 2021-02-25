import React, { useState, useContext, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Body,
  H1,
  Text,
  Card,
  CardItem,
  Footer,
  Left,
  FooterTab
} from 'native-base'
import globalStyles from "../styles/global";
import OrderContext from "../context/order/orderContext";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";

const SummaryOrder = () => {

  const { order, total, showSummary, deleteOrder, orderPlaced } = useContext(OrderContext)

  const nav = useNavigation();

  useEffect(()=>{
    calculateTotal()
    console.log(order)
  },[order])

  const calculateTotal = () => {
    let newTotal = 0
    newTotal = order.reduce((newTotal, articule)=> newTotal + articule.total,0)
    showSummary(newTotal)
  }

  const goToProgress = () => {
    Alert.alert(
      'Revisa tu orden',
      'Una vez confirmado no podrás cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress: async()=> {
            const orderObj = {
              timeDelivery: 0,
              complete: false,
              total: Number(total),
              order: order,
              create: Date.now()
            }

            try {
              const order = await firebase.db.collection('orders').add(orderObj);
              orderPlaced(order.id)
              nav.navigate('Progress')
            }catch (err){
              console.log(err)
            }

          }
        },
        { text: 'Revisar', style: 'cancel'}
      ]
    )
  }

  const confirmDelete = id => {
    Alert.alert(
      'Deseas eliminar el articulo?',
      'Una vez eliminado no podrás recuperarlo',
      [
        {
          text: 'Confirmar',
          onPress: ()=> deleteOrder(id)

        },
        { text: 'Cancelar', style: 'cancel'}
      ]
    )
  }


  return(
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>Resumen Pedido</H1>
        {order.map((dish,i) => {
          const { count, name, image, id, price} = dish
          return(
            <List key={id+i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{ uri: image }}/>
                </Left>
                <Body>
                  <Text>{name}</Text>
                  <Text>Cantidad: {count}</Text>
                  <Text>Precio: ${price}</Text>
                  <Button
                    onPress={()=> confirmDelete(id)}
                    full
                    danger
                    style={{ marginTop:20, marginRight: 10 }}
                  >
                    <Text style={[globalStyles.btnText,{color: '#FFF'}]}>Quitar</Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          )
        })}
  <Text style={globalStyles.count}>Total a pagar: $ {total}</Text>
        <Button
          onPress={()=> {nav.navigate('Menu')}}
          style={[globalStyles.button,{marginTop: 50, marginHorizontal:10}]}
          full
        >
          <Text style={globalStyles.btnText}>Seguir pidiendo</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            onPress={()=> goToProgress()}
            style={[globalStyles.button]}
            full
          >
            <Text style={globalStyles.btnText}>Ordenar pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default SummaryOrder;
