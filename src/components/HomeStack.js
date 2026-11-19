import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Comments from '../screens/Comments';


const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Home}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          title: 'Comentarios',
          headerStyle: { backgroundColor: '#141414' }, 
          headerTintColor: 'white', 
          //le pregunte a la IA como pintar el header, flecha y titulo. 
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;