import axios from 'axios';
import React from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AdminDashboard = ({navigation, route}) => {
  const dispatch: any = useDispatch();
  const logoutHandler = () => {
    dispatch(AuthRepositry.logout());
  };

  const list = [
    {
      title: 'Supervisors',
      icon: 'supervisor-account',
      route: 'supervisors',
    },
    {
      title: 'Events',
      icon: 'event',
    route:"userstack",
    },
    // {
    //   title: 'Attendence',
    //   icon: 'supervisor-account',
    // },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={logoutHandler}
            style={{
              backgroundColor: 'indianred',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        paddingVertical: 15,
        paddingHorizontal: 10,
      }}>
      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.route)}
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 3,
                elevation: 2,
                backgroundColor: 'white',
                marginVertical: 4,
                paddingHorizontal: 5,
                paddingVertical: 20,
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Icon name={item.icon} size={25} color="black" />
                <Text style={{color: 'black', fontSize: 20, marginLeft: 5}}>
                  {item.title}
                </Text>
              </View>
              <Icon name={'arrow-forward-ios'} size={20} color="black" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default AdminDashboard;
