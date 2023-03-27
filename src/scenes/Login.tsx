import axios from 'axios';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';
import {FloatingTitleTextInputField} from './floating_title_text_input_field';

const Login = () => {
  const dispatch: any = useDispatch();
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const loginHandler = () => {
    // console.log(formValues.password)
    // if (formValues.password !== "" && formValues.email !== "") {
    //     dispatch(AuthRepositry.login({
    //         email: formValues.email,
    //         password: formValues.password,
    //     }))
    // } else {
    //     Alert.alert("All fields are required!")
    // }
    dispatch(
      AuthRepositry.login({
        email: formValues.email,
        password: formValues.password,
      }),
    );
  };

  const dismissHandler = () => {
    BackHandler.exitApp();
  };

  function _updateMasterState(attrName: any, value: any) {
    setFormValues(preval => {
      return {
        ...preval,
        [attrName]: value.trim(),
      };
    });
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Image
        source={require('../assets/images/image4.png')}
        style={{width: '100%'}}
      />
      <View
        style={{
          top: '30%',
          alignItems: 'center',
          backgroundColor: '#F6F5F5',
          zIndex: 1,
          position: 'absolute',
          height: '100%',
          width: '100%',
          borderRadius: 80,
          padding: 20,
        }}>
        {/* <View> */}

        <View
          style={{
            justifyContent: 'center',
            marginTop: 5,
            alignItems: 'center',
            backgroundColor: 'white',
            width: 80,
            height: 80,
            borderRadius: 50,
          }}>
          <Image
            source={require('../assets/images/union.png')}
            style={{width: 30, height: 30}}
          />
        </View>
        <Text style={{fontSize: 20, margin: 5, color: 'black'}}>Login</Text>

        <FloatingTitleTextInputField
          attrName="email"
          title="Email"
          value={formValues.email}
          updateMasterState={_updateMasterState}
        />

        <FloatingTitleTextInputField
          type="password"
          attrName="password"
          title="Password"
          value={formValues.password}
          secureTextEntry={true}
          updateMasterState={_updateMasterState}
        />

        <TouchableOpacity onPress={loginHandler} style={stylesSheet.button}>
          <Text style={stylesSheet.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={dismissHandler}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const stylesSheet = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  button: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '8%',
    paddingHorizontal: 5,
    backgroundColor: '#0B7CCE',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
});
