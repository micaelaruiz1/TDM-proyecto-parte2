import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/home';
import NewPost from '../screens/newPost';
import Profile from '../screens/profile';
import Comments from '../screens/comments';

const Tab = createBottomTabNavigator();
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
function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="Nuevo Posteo"
        component={NewPost}
        options={{ tabBarIcon: () => <FontAwesome name="plus-circle" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
      />
    </Tab.Navigator>
  );
}


export default HomeMenu;