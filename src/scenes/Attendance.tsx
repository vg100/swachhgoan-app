import axios from 'axios';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';

const Attendance = ({navigation, route}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Sorry! Under Development</Text>
    </View>
  );
};
export default Attendance;
