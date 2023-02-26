import axios from 'axios';
import React from 'react';
import {ActivityIndicator, Alert, PermissionsAndroid} from 'react-native';
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
import {EventRepositry} from '../services/EventRepositry';
// var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {Utils} from '../utils/utils';
import {format} from 'date-fns';
import Moment from 'moment';
import {getEnvVariable} from '../environment';
import EventCollapsible from '../components/EventCollaps';
const Event = ({navigation, route}: any) => {
  const dispatch: any = useDispatch();
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const {filtedData, eventItems, loading, isRefresh} = useSelector(
    (state: any) => state.event,
  );

  React.useEffect(() => {
    if (route.params.title === 'Past Event') {
      dispatch(EventRepositry.getPastEvent());
    } else if (route.params.title === 'Ongoing Event') {
      dispatch(EventRepositry.getOngoingEvent());
    } else {
      dispatch(EventRepositry.getUpcomingEvent());
    }
  }, [route.params.title,isRefresh]);


  // React.useLayoutEffect(() => {
  //   if (!isAdmin) {
  //     if (route.params.title === 'Ongoing Event') {
  //       navigation.setOptions({
  //         headerRight: () => (
  //           <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate('addEvent', {title: 'Add Event'})
  //               }
  //               style={{
  //                 backgroundColor: 'indianred',
  //                 paddingVertical: 5,
  //                 paddingHorizontal: 10,
  //                 borderRadius: 5,
  //               }}>
  //               <Text style={{color: 'white'}}>Add Event</Text>
  //             </TouchableOpacity>
  //           </View>
  //         ),
  //       });
  //     }
  //   }
  // }, [navigation]);

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted: any = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          Utils.exportDataToExcel(
            route.params.title === 'Past Event' ? pastEvent : upcomingEvent,
          );
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        Utils.exportDataToExcel(
          route.params.title === 'Past Event' ? pastEvent : upcomingEvent,
        );
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  if (eventItems.length < 1) {
    return <Text>No data!</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={[...filtedData]}
        renderItem={({item}) => {
          console.log({
            uri: `${getEnvVariable()?.base_api_url}/${item.files[0]?.replace(
              /\\/,
              '/',
            )}`,
          });
          return (
            <EventCollapsible item={item} navigation={navigation}/>

   
          );
        }}
      />
      <TouchableOpacity
        onPress={handleClick}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0B7CCE',
          padding: 15,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Event;
