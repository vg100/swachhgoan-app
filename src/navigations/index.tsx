

import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppStackScreen from './app-navigator';
import AuthStackScreen from './auth-navigator';

const Routes = () => {
  return (

    <NavigationContainer>
      {/* {true ? AppStackScreen() : AuthStackScreen()} */}
      <AuthStackScreen/>
    </NavigationContainer>
  );
};

export default Routes;