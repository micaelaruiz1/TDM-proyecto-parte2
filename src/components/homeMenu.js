import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Comments from '../screens/Comments';

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
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false ,tabBarStyle: { backgroundColor: '#e41717',borderTopColor: '#e41717'}}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="white" /> }}
      />
      <Tab.Screen
        name="Nuevo Posteo"
        component={NewPost}
        options={{ tabBarIcon: () => <FontAwesome name="plus-circle" size={24} color="white" /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="white" /> }}
      />
    </Tab.Navigator>
  );
}


export default HomeMenu;