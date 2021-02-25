import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import NewOrder from "./views/NewOrder";
import Menu from './views/Menu'
import DetailsDish from "./views/DetailsDish";
import FormDish from "./views/FormDish";
import SummaryOrder from "./views/SummaryOrder";
import ProgressOrder from "./views/ProgressOrder";

// state de context
import FirebaseState from './context/firebase/firebaseState';
import OrderState from "./context/order/orderState";
import BtnSummary from "./components/BtnSummary";


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <OrderState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle:{
                  backgroundColor: 'green'
                },
                headerTitleStyle:{
                  fontWeight: 'bold',
                  color: '#fff'
                },
                headerTintColor: '#fff'
              }}
            >
              <Stack.Screen name='NewOrder' component={NewOrder} options={{title: 'Nueva Orden'}} />
              <Stack.Screen name='Menu' component={Menu} options={{title: 'Menu', headerRight: props => <BtnSummary/>}} />
              <Stack.Screen name='DetailsDish' component={DetailsDish} options={{title: 'Detalle Plato'}} />
              <Stack.Screen name='FormDish' component={FormDish} options={{title: 'Formulario Plato'}} />
              <Stack.Screen name='Summary' component={SummaryOrder} options={{title: 'Resumen Orden'}} />
              <Stack.Screen name='Progress' component={ProgressOrder} options={{title: 'Progreso Orden'}} />

            </Stack.Navigator>
          </NavigationContainer>
        </OrderState>
      </FirebaseState>

    </>
  );
};

export default App;
