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

const Profile = ({navigation, route}) => {
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const dispatch: any = useDispatch();
  const logoutHandler = () => {
    dispatch(AuthRepositry.logout());
  };
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
              marginRight: 10,
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

        paddingVertical: 20,
        justifyContent: 'center',
        // alignItems:'center'
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 6,
          marginHorizontal: 60,
          elevation: 2,
          height: 200,
          position: 'relative',
          paddingTop: 40,
        }}>
        <Text style={{fontSize: 20}}>Name:{user?.name}</Text>
        <Text style={{fontSize: 20, marginVertical: 5}}>
          Email:{user?.email}
        </Text>
        <Text style={{fontSize: 20}}>Phone No:+919555504027</Text>
      </View>

      <View
        style={{
          borderRadius: 100,
          height: 100,
          width: 100,
          backgroundColor: 'indianred',
          alignSelf: 'center',
          bottom: 260,
          borderWidth: 1,
        }}
      />
    </View>
  );
};
export default Profile;
