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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          padding: 15,
          marginHorizontal: 60,
          elevation: 2,
          borderRadius: 20,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 40,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            textTransform: 'capitalize',
          }}>
          {user?.name}
        </Text>
        <Text style={{fontSize: 15, marginVertical: 5}}>
          <Ionicons name="mail" size={15} color="#3766E8" /> {user?.email}
        </Text>

        <Text style={{fontSize: 15}}>
          {' '}
          <FontAwesome name="phone" size={15} color="#3766E8" /> +91{' '}
          {user?.phone_no}
        </Text>
      </View>

      <View
        style={{
          borderRadius: 100,
          height: 100,
          width: 100,
          backgroundColor: 'white',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 260,
          borderWidth: 1,
        }}>
        <FontAwesome name="user" size={70} color="black" />
      </View>
    </View>
  );
};
export default Profile;
