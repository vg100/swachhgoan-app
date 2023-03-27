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
import Collapsiblee from '../components/collapse';
import {Alert} from 'react-native';

const Supervisor = ({navigation, route}: any) => {
  const dispatch: any = useDispatch();
  const {users, isRefresh} = useSelector((state: any) => state.allUsers);

  React.useEffect(() => {
    dispatch(AuthRepositry.getAllUser());
  }, [isRefresh]);

  const deleteHandler = (id: any) => {
    dispatch(AuthRepositry.deleteUser(id));
  };

  const deleteSupervisorHandler = (id: any) => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this Supervisor?',
      [
        {
          text: 'Yes',
          onPress: () => deleteHandler(id),
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const editHandler = (index: any) => {
    navigation.navigate('addsupervisor', {
      title: 'Edit Supervisor',
      item: users[index],
      mode: 'edit',
    });
  };

  const viewEventHandler = () => {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('addsupervisor')}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'indianred',
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Icon name={'person-add'} size={19} color="white" />
            <Text style={{color: 'white', marginLeft: 2, fontSize: 15}}>
              Add Supervisor
            </Text>
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
      }}>
      {
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            return (
              <Collapsiblee
                index={index}
                navigation={navigation}
                viewEventHandler={viewEventHandler}
                editHandler={(index: any) => editHandler(index)}
                deleteHandler={(id: any) => deleteSupervisorHandler(id)}
              />
            );
          }}
        />
      }
    </View>
  );
};
export default Supervisor;
