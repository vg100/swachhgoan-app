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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingTitleTextInputField} from './floating_title_text_input_field';
import { Alert } from 'react-native';

const AddSupervisor = ({navigation, route}) => {
  const dispatch: any = useDispatch();
  const role=route.params?.mode==='edit'?route.params?.item?.role==="USER"?0:1:0
  const gender=route.params?.mode==='edit'?route.params?.item?.gender==="male"?0:1:0
  const [selectedRole, setSelectedRole] = React.useState(role);
  const [selectedGender, setSelectedGender] = React.useState(gender);
  const [formValues, setFormValues] = React.useState({
    name: route?.params?.item ? route?.params?.item?.name: '',
    email: route?.params?.item ? route.params?.item?.email: '',
    password: route?.params?.item ? route.params?.item?.passwordView: '',
    phone_no:  route?.params?.item ? route.params?.item?.phone_no?.toString():''
  });

  console.log(route.params?.item,'hh')

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

const updateHandler=()=>{

  dispatch(
  AuthRepositry.updateSupervisor(route?.params?.item?._id,{
    ...formValues,
    role: selectedRole === 0 ? 'USER' : 'ADMIN',
    gender: selectedGender === 0 ? 'male' : 'female',
  }),
  )
  navigation.goBack();
}


const updateSupervisorHandler = () => {
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to update this Supervisor?",
    [
      {
        text: "Yes",
        onPress:updateHandler,
      },
      {
        text: "No",
      },
    ]
  );
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
        isFieldActive={route.params?.mode==='edit' && formValues.name ?true:false}
        updateMasterState={_updateMasterState}
      />
      <FloatingTitleTextInputField
        attrName="email"
        title="Email"
        isFieldActive={route.params?.mode==='edit' && formValues.email ?true:false}
        value={formValues.email}
        updateMasterState={_updateMasterState}
      />

      <FloatingTitleTextInputField
        attrName="password"
        title="Password"
        isFieldActive={route.params?.mode==='edit' && formValues.password?true:false}
        value={formValues.password}
        updateMasterState={_updateMasterState}
      />

<FloatingTitleTextInputField
        attrName="phone_no"
        title="Phone No"
        isFieldActive={route.params?.mode==='edit' && formValues.phone_no?true:false}
        value={formValues.phone_no}
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
        <Text style={{marginRight: 10, fontSize: 16}}>Role </Text>
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
                {index === (selectedRole || 0) ? (
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
              <Text style={{marginLeft: 5, fontSize: 16}}>{item}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={route?.params?.mode==='edit'?updateSupervisorHandler:submitHandler}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B7CCE',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          marginVertical: 8,
        }}>
        <Text style={{color: 'white'}}>
          {route?.params?.mode==='edit'?"Update":"Submit"}
          </Text>
      </TouchableOpacity>
    </View>
  );
};
export default AddSupervisor;
