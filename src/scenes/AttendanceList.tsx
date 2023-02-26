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
import {useDispatch, useSelector} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';

const AttendanceList = ({navigation, route}) => {
  // const {user, loggedIn, loggingIn, isAdmin} = useSelector(
  //   (state: any) => state.userLogin,
  // );
  const dispatch: any = useDispatch();
  const {filtedData, eventItems, loading, isRefresh} = useSelector(
    (state: any) => state.event,
  );

  return (
    <View
      style={{
        flex: 1,

        paddingVertical: 20,
        justifyContent: 'center',
       
      }}>
    <FlatList 
    data={eventItems}
    renderItem={({item})=>{
      return(
        <>
        <Text>{item.supervisor}</Text>
        <FlatList data={item.attendances}
        
        renderItem={({item})=>{
          return (
            <Text> attendance {item.name}</Text>
          )
        }}
        />
        </>
        // <Text>{JSON.stringify(item)}</Text>
      )
    }}
    
    />

   
    </View>
  );
};
export default AttendanceList;
