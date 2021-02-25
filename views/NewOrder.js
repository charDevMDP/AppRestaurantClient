import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";


const NewOrder = () => {

  const nav = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.contents, styles.contents]}>
        <Button rounded block style={globalStyles.button} onPress={()=> nav.navigate('Menu')}>
          <Text style={globalStyles.btnText}>Crear nuevo pedido</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contents:{
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default NewOrder;
