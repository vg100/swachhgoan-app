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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingTitleTextInputField} from './floating_title_text_input_field';

const AddSupervisor = ({navigation, route}) => {
  const dispatch: any = useDispatch();
  const [selectedRole, setSelectedRole] = React.useState(0);
  const [selectedGender, setSelectedGender] = React.useState(0);

  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  function _updateMasterState(attrName: any, value: any) {
    console.log(attrName);
    setFormValues(preval => {
      return {
        ...preval,
        [attrName]: value,
      };
    });
  }

  const submitHandler = () => {
    dispatch(
      AuthRepositry.createUser({
        ...formValues,
        role: selectedRole === 0 ? 'USER' : 'ADMIN',
        gender: selectedGender === 0 ? 'male' : 'female',
      }),
    );
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <FloatingTitleTextInputField
        attrName="name"
        title="Name"
        value={formValues.name}
        updateMasterState={_updateMasterState}
      />
      <FloatingTitleTextInputField
        attrName="email"
        title="Email"
        value={formValues.email}
        updateMasterState={_updateMasterState}
      />

      <FloatingTitleTextInputField
        attrName="password"
        title="Password"
        value={formValues.password}
        updateMasterState={_updateMasterState}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={{marginRight: 10, fontSize: 16}}>Gender</Text>
        {['Male', 'Female'].map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedGender(index)}
                style={[
                  {
                    height: 22,
                    width: 22,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                {index === selectedGender ? (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: '#000',
                    }}
                  />
                ) : null}
              </TouchableOpacity>
              <Text style={{marginLeft: 5, fontSize: 16}}>{item}</Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={{marginRight: 10, fontSize: 18}}>Role </Text>
        {['Supervisor', 'Admin'].map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedRole(index)}
                style={[
                  {
                    height: 22,
                    width: 22,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                {index === selectedRole ? (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: '#0B7CCE',
                    }}
                  />
                ) : null}
              </TouchableOpacity>
              <Text style={{marginLeft: 5, fontSize: 20}}>{item}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={submitHandler}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B7CCE',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          marginVertical: 8,
        }}>
        <Text style={{color: 'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddSupervisor;
