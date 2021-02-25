import React, { useContext, useEffect, Fragment} from "react";
import { StyleSheet} from "react-native";
import FirebaseContext from "../context/firebase/firebaseContext";
import {
  Container,
  Separator,
  List,
  Content,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body
} from 'native-base'
import globalStyles from "../styles/global";
import OrderContext from "../context/order/orderContext";
import { useNavigation } from '@react-navigation/native'

const Menu = () => {

  // context firebase
  const { menu, getProducts } = useContext(FirebaseContext);
  // context pedido
  const { selectDish } = useContext(OrderContext)

  useEffect(()=>{
    getProducts()
  },[])

  const showHeading = (category,i) => {
    let categoryBefore = i>0 ? menu[i-1].category : 0;
      if(categoryBefore !== category){
          return(
        <Separator style={styles.separator}>
          <Text style={styles.separatorText}>{category}</Text>
        </Separator>
        )
      }
  }

  // hook para redirrecionar
  const nav = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <Content style={{ backgroundColor: '#fff'}}>
        <List>
          {menu.map((dish,i) => {
            const { image, price, name, description, category, id } = dish
            return(
              <Fragment key={id}>
                {showHeading(category,i)}
                <ListItem
                  onPress={(()=> {
                    // si queremos sacar algo del objeto
                    //const { exists, ...dish2 } = dish //y se pasa dish2
                    selectDish(dish)
                    nav.navigate('DetailsDish')
                  })}
                >
                  <Thumbnail large square source={{ uri: image}}/>
                <Body>
                  <Text>{name}</Text>
                  <Text note nombreOflines={2}>{description}</Text>
                  <Text>Precio: $ {price}</Text>
                </Body>
                </ListItem>
              </Fragment>
            )
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separator:{
    backgroundColor: '#ccc'
  },
  separatorText:{
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

export default Menu;
