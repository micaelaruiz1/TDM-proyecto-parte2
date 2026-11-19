import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

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