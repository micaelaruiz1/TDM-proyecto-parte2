import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPost}
        options={{ tabBarIcon: () => <FontAwesome name="plus-circle" size={24} color="black" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;