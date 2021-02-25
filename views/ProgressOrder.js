import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Container,H1,H3, Text } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import OrderContext from "../context/order/orderContext";
import firebase from "../firebase";
import Countdown from 'react-countdown'


const ProgressOrder = () => {

  const { idOrder } = useContext(OrderContext);
  const [time,setTime] = useState(0)
  const [complete,setComplete] = useState(false)

  const nav = useNavigation();

  useEffect(()=> {
    const getProducts = () => {
      firebase.db
        .collection('orders')
        .doc(idOrder)
        .onSnapshot(function(doc){
            setTime(doc.data().timeDelivery)
            setComplete(doc.data().complete)
        })
    }
    getProducts()
  },[])

  const render = ({minutes,seconds}) => {
    console.log(minutes)
  return(
    <Text  style={styles.time}>{minutes}:{seconds}</Text>
  )
  }

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content,{ marginTop: 50}]}>
        {time === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Hemos recibido tu orden</Text>
            <Text style={{textAlign: 'center'}}>Estamos calculando el tiempo de entrego</Text>
          </>
        )}
        { !complete && time > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Su orden estara lista en</Text>
            <Text>
              <Countdown
                date={Date.now() + time * 60000}
                renderer={render}
              />
            </Text>
          </>
        )}

        {complete && (
          <>
            <H1 style={styles.textComplete}>Orden Lista</H1>
            <H3 style={styles.textComplete}>Pase a retirar su pedido.</H3>

            <Button
              style={[globalStyles.button,{marginTop: 100, marginHorizontal: 20}]}
              rounded
              block
              onPress={()=> nav.navigate('NewOrder')}
            >
              <Text>Comenzar un orden nueva</Text>
            </Button>
          </>
        )

        }
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  time:{
    marginBottom:20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30
  },
  textComplete:{
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20
  }
})

export default ProgressOrder;
