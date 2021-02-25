import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import OrderContext from "../context/order/orderContext";


const BtnSummary = () => {

  const nav = useNavigation();
  const { order, total, showSummary } = useContext(OrderContext)

  if(order.length === 0) return null

  return (
  <Button style={globalStyles.button} onPress={()=> nav.navigate('Summary')}>
    <Text style={globalStyles.btnText}>Ir a Pedido</Text>
  </Button>
  );
};

export default BtnSummary;
