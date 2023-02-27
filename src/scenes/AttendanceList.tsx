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
import { useDispatch, useSelector } from 'react-redux';
import { AuthRepositry } from '../services/AuthRepositry';
import SearchBar from "react-native-dynamic-search-bar";
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';

const AttendanceList = ({ navigation, route }) => {
  // const {user, loggedIn, loggingIn, isAdmin} = useSelector(
  //   (state: any) => state.userLogin,
  // );
  const [date, setDate] = React.useState(new Date());

  const getFirstLetter = (item: string) => {
    if (item) {
      return item.substring(0, 1).toUpperCase();
    }
    else {
      return 'N/A';
    }
  }

  const showDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Select date',
      mode: AndroidPickerMode.DATE,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.DEFAULT,
      onChange: date => {
        setDate(date);
      },
    });
  };

  const dispatch: any = useDispatch();
  const { filtedData, eventItems, loading, isRefresh } = useSelector(
    (state: any) => state.event,
  );

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',

      }}>
      <View style= {{padding: 10}}>
        {/* <SearchBar
          placeholder="Select Event"
          onPress={() => { }}
          onChangeText={(text) => console.log(text)}
        /> */}
        {/* <TouchableOpacity
          onPress={showDatePicker}
          style={{
          
          }}>
          <Text style={{ color: 'white' }}>Select Date</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={eventItems}
        renderItem={({ item }) => {
          return (
            <>
              {/* <Text>{item.supervisor}</Text> */}
              <FlatList data={item.attendances}
                renderItem={({ item }) => {
                  return (
                    <View style={{     backgroundColor: 'white',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    width: '100%',
                    marginHorizontal: 60,
                    marginVertical: 10,   shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,justifyContent: 'space-between' }}>
                      <Text style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 16 }}> {item.name}</Text>
                      <Text> {getFirstLetter(item.gender)} | {item.age} </Text>
                    </View>
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
