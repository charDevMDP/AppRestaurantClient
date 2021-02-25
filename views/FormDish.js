import React, { useState, useContext, useEffect } from "react";
import { View, Alert } from "react-native";
import {
  Container,
  Content,
  Form,
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
  FooterTab
} from 'native-base'
import globalStyles from "../styles/global";
import OrderContext from "../context/order/orderContext";
import { useNavigation } from "@react-navigation/native";

const FormDish = () => {



  // state para cantidad
  const [count,setCount] = useState(1)
  const [total,setTotal] = useState(0)
  const { dish, saveOrder } = useContext(OrderContext)
  const { price } = dish

  const navigation = useNavigation()
  // calcular cant a pagar
  useEffect(()=> {
    calculateTotal()
    if(count<1){setCount(1)}
  },[count])

  const calculateTotal = () => {
    const total = price*count;
    setTotal(total);
  }

  // confirma si la orden es correcta
  const okOrder = () => {
    Alert.alert('Deseas confirmar tu pedido?',
        'Una vez confirmado ya no se podrá modificar',
        [
          { text: 'Confirmar', onPress: ()=> {
              const order = {
                ...dish,
                count,
                total
              }
              saveOrder(order);
              navigation.navigate('Summary')
            } },
          { text: 'Cancelar'}]
      )
  }


  return (
<Container>
  <Content>
    <Form>
      <Text style={globalStyles.title}>Cantidad</Text>
      <Grid>
        <Col style={{ display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Button props style={{ backgroundColor: 'green'}} onPress={()=> setCount(count-1)}>
            <Icon name='remove' style={{ fontSize: 30, fontWeight: 'bold'}} />
          </Button>
        </Col>
        <Col>
          <Input
            style={{ textAlign:'center', fontSize: 25}}
            value={count.toString()}
            keyboardType='numeric'
            onChangeText={count => { if(count === ''){ setCount(1)}else{setCount(parseInt(count))} }}
          />
        </Col>

        <Col style={{ display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Button props style={{ backgroundColor: 'green'}} onPress={()=> setCount(count+1)}>
            <Icon name='add' style={{ fontSize: 30, fontWeight: 'bold'}}/>
          </Button>
        </Col>
      </Grid>
      <Text style={globalStyles.count}>TOTAL: ${total}</Text>
    </Form>
  </Content>
<Footer>
  <FooterTab>
    <Button style={globalStyles.button} onPress={()=> okOrder()}>
      <Text style={globalStyles.btnText}>Agregar al pedido</Text>
    </Button>
  </FooterTab>
</Footer>
</Container>
  );
};

export default FormDish;
