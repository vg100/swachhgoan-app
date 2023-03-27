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
import SearchBar from 'react-native-dynamic-search-bar';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import EventCollapsible from '../components/EventCollaps';

const AttendanceList = ({navigation, route}) => {
  const {eventItems} = useSelector((state: any) => state.event);

  console.log(eventItems, 'ggg');
  const [date, setDate] = React.useState(new Date());

  const getFirstLetter = (item: string) => {
    if (item) {
      return item.substring(0, 1).toUpperCase();
    } else {
      return 'N/A';
    }
  };

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

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={eventItems}
        renderItem={({item}) => {
          return (
            item?.isDone && (
              <EventCollapsible
                data={item}
                // navigation={navigation}
                // selectedEvent={(event:any)=>setSelectedFile(event)}
                // handler={((id:any,index:any)=>deleteHandler(id,index))}
              />
            )
          );
        }}
      />
    </View>
  );
};
export default AttendanceList;
