import React, { useContext } from "react";
import { View, Image } from "react-native";
import OrderContext from "../context/order/orderContext";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  H1,
  Text,
  Card,
  CardItem
} from 'native-base'
import globalStyles from "../styles/global";
import { useNavigation } from '@react-navigation/native'

const DetailsDish = () => {

  // orden context
  const { dish } =  useContext(OrderContext);
  const { name, image, description, exists, price} = dish

  const nav = useNavigation();

  return (
  <Container style={globalStyles.container}>
    <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
      <Card>
        <CardItem>
          <Body>
            <Image source={{ uri: image}} style={globalStyles.imgDetails}/>
            <Text style={{ marginTop:20 }}>{description}</Text>
            <Text style={globalStyles.price}>Precio: ${price}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
    <Footer>
      <FooterTab>
        <Button style={globalStyles.button} onPress={()=> nav.navigate('FormDish')}>
          <Text style={globalStyles.btnText}>Ordenar</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
  );
};

export default DetailsDish;

