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
import {EventRepositry} from '../services/EventRepositry';

const UserDashboard = ({navigation, route}) => {
  const dispatch: any = useDispatch();
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const {slectedUserId} = useSelector((state: any) => state.selectUser);
  const {isRefresh} = useSelector((state: any) => state.event);
  const [data, setdata] = React.useState([
    {
      image: require('../assets/images/past_event.png'),
      title: 'New Event',
      routeName: 'addEvent',
    },
    {
      image: require('../assets/images/upcoming_event.png'),
      title: 'Event Done',
      routeName: 'event',
    },
    {
      image: require('../assets/images/new_event.png'),
      title: 'Ongoing Event',
      routeName: 'event',
    },
    {
      image: require('../assets/images/attendance.png'),
      title: 'Participant List',
      routeName: 'event',
    },

    // {
    //   image: require('../assets/images/past_event.png'),
    //   title: 'Past Event',
    //   routeName: 'event',
    // },
    // {
    //   image: require('../assets/images/attendance.png'),
    //   title: 'Attendance',
    //   routeName: 'attendancelist',
    // },
    // {
    //   image: require('../assets/images/upcoming_event.png'),
    //   title: 'Upcoming Event',
    //   routeName: 'event',
    // },
    // {
    //   image: require('../assets/images/new_event.png'),
    //   title: 'Ongoing Event',
    //   routeName: 'newEvent',
    // },
  ]);
  const logoutHandler = () => {
    dispatch(AuthRepositry.logout());
  };

  React.useEffect(() => {
    dispatch(EventRepositry.getEventList(slectedUserId));
    console.log(slectedUserId, 'slectedUserId');
  }, [isRefresh, slectedUserId]);

  React.useEffect(() => {
    if (isAdmin) {
      setdata(pre => pre.filter(d => d.title !== 'Attendance'));
    }
  }, []);

  console.log(data, 'dat');

  const selectCategoryHandler = (index: any) => {
    navigation.navigate(data[index].routeName, {title: data[index].title});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 10, textTransform: 'capitalize'}}>
            {user?.name}
          </Text>
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
        paddingVertical: 15,
        marginHorizontal: 10,
      }}>
      <FlatList
        style={{marginVertical: 20}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => selectCategoryHandler(index)}
              style={{
                flex: 1 / 2,
                elevation: 2,
                flexDirection: 'column',

                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#D9D0E3',
              }}>
              <View
                style={{
                  borderColor: '#D9D0E3',
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                  height: 150,
                }}>
                <Image source={item.image} style={{width: 80, height: 80}} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Cabin-Bold',
                    fontSize: 15,
                    color: 'black',
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default UserDashboard;
