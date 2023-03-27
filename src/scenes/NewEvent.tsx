import axios from 'axios';
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';
import styles from './../styles/style';
import {FloatingTitleTextInputField} from './floating_title_text_input_field';
import {subWeeks, addWeeks, format, subDays} from 'date-fns';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Animated, { useSharedValue } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import {EventRepositry} from '../services/EventRepositry';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
// const myIcon = <Icon name="rocket" size={30} color="#900" />;

const today = new Date();
const start = subWeeks(today, 1);
const end = addWeeks(today, 2);

const NewEvent = ({navigation, route}: any) => {
  console.log(route, 'routeroute');

  // const route = useRoute()
  const {filtedData, eventItems, loading, isRefresh} = useSelector(
    (state: any) => state.event,
  );
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const dispatch: any = useDispatch();
  const [images, setImages] = React.useState([]);
  const [video, setVideo] = React.useState([]);
  const [mediaType, setMediaType] = React.useState('image');
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date());
  const [currentTime, setCurrentTime] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [currentStartDate, setCurrentStartDate] = useState(today);
  const [currentEndDate, setCurrentEndDate] = useState(today);
  const [isVisible, setIsVisible] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const [formValues, setFormValues] = React.useState({
    eventname: route?.params?.item ? route?.params?.item?.eventname : '',
    district: route?.params?.item ? route?.params?.item?.district : '',
    block: route?.params?.item ? route?.params?.item?.block : '',
    gp: route?.params?.item ? route?.params?.item?.gp : '',
    venue: route?.params?.item ? route?.params?.item?.venue : '',
    no_participant: route?.params?.item
      ? route?.params?.item?.no_of_participant?.toString()
      : '',
    startDate: route?.params?.item ? route?.params?.item?.startDate : '',
    endDate: route?.params?.item ? route?.params?.item?.endDate : '',
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
    if (
      formValues.eventname != '' &&
      formValues.district != '' &&
      formValues.block != '' &&
      formValues.gp != '' &&
      formValues.venue != '' &&
      formValues.no_participant != ''
    ) {
      dispatch(
        EventRepositry.addNewEvent({
          ...formValues,
          startDate: currentStartDate.toISOString(),
          endDate: currentEndDate.toISOString(),
        }),
      );

      setFormValues({
        eventname: '',
        district: '',
        block: '',
        gp: '',
        venue: '',
        no_participant: '',
        startDate: '',
        endDate: '',
      });

      setIsVisible(false);
      navigation.goBack();
    } else {
      showMessage({
        message: 'All filed Required',
        type: 'danger',
      });
    }
  };

  const showDatePicker = () => {
    const today = new Date();
    MaterialDatetimePickerAndroid.show({
      value: currentDate,
      titleText: 'Select duration of event',
      mode: AndroidPickerMode.DATE,
      minimumDate: subDays(currentDate, 1),
      maximumDate: addWeeks(today, 4),
      startDate: currentStartDate,
      endDate: currentEndDate,
      positiveButtonText: 'OK',
      negativeButtonText: 'Nah',
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.RANGE,
      onConfirmDateRange: (startDate, endDate) => {
        setIsVisible(true);
        setCurrentStartDate(startDate);
        setCurrentEndDate(endDate);
      },
    });
  };

  const cancelHandler = () => {
    setIsVisible(false);
    setCurrentStartDate(today);
    setCurrentEndDate(today);
  };

  const updateEventHandler = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to update this Event?',
      [
        {
          text: 'Yes',
          onPress: updateHandler,
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const updateHandler = () => {
    dispatch(
      EventRepositry.updateEvent(
        route?.params?.item?._id,
        [...images, ...video],
        {
          ...formValues,
        },
      ),
    );
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <FloatingTitleTextInputField
          attrName="eventname"
          title="Name of Event/Training"
          isRequired={true}
          value={formValues.eventname}
          updateMasterState={_updateMasterState}
        />

        {/* <FloatingTitleTextInputField
              attrName="training_type"
              title="Type of Training"
              isRequired={true}
              value={formValues.training_type}
              updateMasterState={_updateMasterState}
            /> */}

        <FloatingTitleTextInputField
          attrName="district"
          title="District"
          isRequired={true}
          value={formValues.district}
          updateMasterState={_updateMasterState}
        />
        <FloatingTitleTextInputField
          attrName="block"
          title="Block"
          isRequired={true}
          value={formValues.block}
          updateMasterState={_updateMasterState}
        />
        <FloatingTitleTextInputField
          attrName="gp"
          title="GP"
          isRequired={true}
          value={formValues.gp}
          updateMasterState={_updateMasterState}
        />
        <FloatingTitleTextInputField
          attrName="venue"
          title="Venue"
          isRequired={true}
          value={formValues.venue}
          updateMasterState={_updateMasterState}
        />
        <FloatingTitleTextInputField
          attrName="trainer"
          title="Name of Trainer/Supervisor"
          keyboardType="numeric"
          editable={false}
          value={user.name}
          disableColor={{backgroundColor: 'lightgray'}}
          isFieldActive={user.name ? true : false}
          // updateMasterState={_updateMasterState}
        />
        <FloatingTitleTextInputField
          attrName="no_participant"
          title="Number of participant"
          keyboardType="numeric"
          value={formValues.no_participant}
          updateMasterState={_updateMasterState}
        />

        {/* <FloatingTitleTextInputField
              attrName="male"
              title="Male"
              keyboardType="numeric"
              value={formValues.male}
              updateMasterState={_updateMasterState}
            />

            <FloatingTitleTextInputField
              attrName="female"
              title="Female"
              keyboardType="numeric"
              value={formValues.female}
              updateMasterState={_updateMasterState}
            /> */}
        <View
          style={{
            width: '100%',
            borderRadius: 8,
            borderBottomWidth: 1,
            borderColor: 'gray',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginVertical: 6,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={showDatePicker}>
            {isVisible ? (
              <Text style={{color: 'black'}}>
                From {format(currentStartDate, 'PP')} To{' '}
                {format(currentEndDate, 'PP')}
              </Text>
            ) : (
              <Text style={{color: 'black'}}>
                Select Duration <Text style={{color: 'red'}}>*</Text>
              </Text>
            )}
          </TouchableOpacity>
          {isVisible && (
            <TouchableOpacity
              onPress={cancelHandler}
              style={{
                marginRight: 10,
              }}>
              <FontAwesome name="window-close" size={18} />
            </TouchableOpacity>
          )}
        </View>
        {/* <FloatingTitleTextInputField
              attrName="report"
              title="Report"
              style={{height:100}}
              value={formValues.report}
              updateMasterState={_updateMasterState}
            /> */}

        {/* <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginVertical: 5,
              }}>
              <TouchableOpacity onPress={imageHandler}>
                <Image
                  source={require('../assets/images/upload.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text style={{fontFamily: 'Cabin-Bold', color: 'black'}}>
                  Capture Image
                </Text>
                {images.length > 0 && (
                  <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <Text
                      style={{
                        marginRight: 5,
                        fontFamily: 'Cabin-Bold',
                        color: 'black',
                      }}>
                      {images.length + ' Selected'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setImages([])}
                      style={{
                        // backgroundColor: 'black',
                        // borderRadius: 50,
                        // paddingHorizontal: 5,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                      }}>
                       <FontAwesome name="window-close" size={16} color={'black'} />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={videoHandler}>
                <Image
                  source={require('../assets/images/video_upload.png')}
                  style={{width: 40, height: 40, alignSelf: 'center'}}
                />
                <Text style={{fontFamily: 'Cabin-Bold', color: 'black'}}>
                  Upload Video
                </Text>
                {video.length > 0 && (
                  <View style={{flexDirection: 'row',alignItems:'center'}}>
                    <Text
                      style={{
                        marginRight: 5,
                        fontFamily: 'Cabin-Bold',
                        color: 'black',
                      }}>
                      {video.length + ' Selected'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setVideo([])}>
                       <FontAwesome name="window-close" size={16} color={'black'} />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View> */}

        <TouchableOpacity
          onPress={
            route?.params?.title === 'Update Event'
              ? updateEventHandler
              : submitHandler
          }
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'blue',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            marginVertical: 8,
          }}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const stylesSheet = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
export default NewEvent;
