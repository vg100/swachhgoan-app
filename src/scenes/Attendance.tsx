import axios from 'axios';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AttendanceRepositry} from '../services/AttendanceRepositry';
import {AuthRepositry} from '../services/AuthRepositry';
import {FloatingTitleTextInputField} from './floating_title_text_input_field';
// import DatePicker from 'react-native-datepicker';
// import { launchImageLibrary } from "react-native-image-picker"
import {Utils} from '../utils/utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';


const Attendance = ({navigation, route}: any) => {
  const [selectedGender, setSelectedGender] = React.useState<any>(0);
  const [images, setImages] = React.useState<any>([]);
  const [video, setVideo] = React.useState<any>([]);
  const [attendance, setAttendance] = React.useState<any>([]);
  const [modal, setModal] = React.useState(false);
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const {eventname, _id} = route.params.item;
  const dispatch: any = useDispatch();
  const [formValues, setFormValues] = React.useState({
    name: '',
    village: '',
    deignation: '',
    phone_no: '',
    gender: '',
  });

  function _updateMasterState(attrName: any, value: any) {
    setFormValues(preval => {
      return {
        ...preval,
        [attrName]: value,
      };
    });
  }

  const submitHandler = () => {
    dispatch(
      AttendanceRepositry.addAttendance(_id, {
        ...formValues,
        gender: selectedGender === 0 ? 'male' : 'female',
      }),
    );
    setFormValues({
      name: '',
      village: '',
      deignation: '',
      phone_no: '',
      gender: '',
    });
  };

  // const selectHandler = async (type: any) => {
  //   const data: any = await Utils.uploadFile(type);
  //   if (type === 'image') {
  //     setImages([...data, ...images]);
  //   }
  //   if (type === 'video') {
  //     setVideo([...data, ...video]);
  //   }
  //   setModal(false);
  // };

  const attendanceHandler = async () => {
    const data: any = await Utils.uploadFile("image");
     setAttendance([...data, ...attendance]);
  };

  const imageHandler = async () => {
    const data: any = await Utils.uploadFile("image");
        setImages([...data, ...images]);
  };

  const videoHandler = async () => {
    const data: any = await Utils.uploadFile("video");
    setVideo([...data, ...video]);
  };

  const finalsubmitHandler = () => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to final submit?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(
              AttendanceRepositry.finalSubmit(
                route.params.item?._id,
                [...attendance,...images, ...video],
                {
                  isDone: true,
                },
              ),
            );

            setAttendance([])
            setImages([])
            setVideo([])
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  return (
   
        <ScrollView >
          <View style={{margin:16}}>
      <FloatingTitleTextInputField
        attrName="event"
        title={eventname}
        disableColor={{backgroundColor: 'lightgray'}}
        editable={false}
      />
      <FloatingTitleTextInputField
        attrName="supervisor"
        title={user.name}
        disableColor={{backgroundColor: 'lightgray'}}
        editable={false}
      />

      <FloatingTitleTextInputField
        attrName="name"
        title="Name"
        value={formValues.name}
        updateMasterState={_updateMasterState}
      />
      <FloatingTitleTextInputField
        attrName="village"
        title="Village"
        value={formValues.village}
        updateMasterState={_updateMasterState}
      />
      <FloatingTitleTextInputField
        attrName="deignation"
        title="Deignation"
        value={formValues.deignation}
        updateMasterState={_updateMasterState}
      />

      <FloatingTitleTextInputField
        attrName="phone_no"
        title="Contact Number"
        keyboardType="numeric"
        value={formValues.phone_no}
        updateMasterState={_updateMasterState}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={{marginRight: 10, fontSize: 18}}>Gender </Text>
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
      {/* /> */}

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
        <Text style={{color: 'white'}}>Add Participant</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 5,
          marginVertical: 15,
          elevation: 1,
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            borderWidth: 2,
            paddingVertical: 10,
            borderStyle: 'dashed',
            flexDirection:'row'
          }}>
            <View style={{justifyContent:"center",alignItems:'center'}}>
            <TouchableOpacity onPress={attendanceHandler}>
            <Image
              source={require('../assets/images/atten.png')}
              style={{width: 55, height: 50}}
            />
             
          </TouchableOpacity>
          {
            attendance.length < 1? (
            <>
              <Text style={{fontSize:12,fontWeight:'bold'}}>Add</Text>
              <Text style={{fontSize:12,fontWeight:'bold'}}>Attendance</Text>
            </>
    
            ):(
 <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 5,
                  fontFamily: 'Cabin-Bold',
                  color: 'black',
                }}>
                {attendance.length + ' Selected'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setAttendance([]);
                }}>
                <FontAwesome name="window-close" size={16} color={'black'} />
              </TouchableOpacity>
            </View>
            )
          }
           
       
            </View>
         
<View style={{   borderStyle: 'dashed',borderLeftWidth: 2,height:65}}/>
<View style={{justifyContent:"center",alignItems:'center'}}>
            <TouchableOpacity onPress={imageHandler}>
            <Image
              source={require('../assets/images/upload.png')}
              style={{width: 50, height: 50}}
            />
             
          </TouchableOpacity>

          {
            images.length < 1? (
            <>
                <Text style={{fontSize:12,fontWeight:'bold'}}>Add</Text>
            <Text style={{fontSize:12,fontWeight:'bold'}}>Training image</Text>
            </>
    
            ):(
 <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 5,
                  fontFamily: 'Cabin-Bold',
                  color: 'black',
                }}>
                {images.length + ' Selected'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setImages([]);
                }}>
                <FontAwesome name="window-close" size={16} color={'black'} />
              </TouchableOpacity>
            </View>
            )
          }


        
       
            </View>
          <View style={{   borderStyle: 'dashed',borderLeftWidth: 2,height:65}}/>
          <View style={{justifyContent:"center",alignItems:'center'}}>
            <TouchableOpacity onPress={videoHandler}>
            <Image
              source={require('../assets/images/video_upload.png')}
              style={{width: 45, height: 50}}
            />
             
          </TouchableOpacity>


          {
            video.length < 1? (
            <>
                 <Text style={{fontSize:12,fontWeight:'bold'}}>Add</Text>
            <Text style={{fontSize:12,fontWeight:'bold'}}>Training video</Text>
            </>
    
            ):(
 <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 5,
                  fontFamily: 'Cabin-Bold',
                  color: 'black',
                }}>
                {video.length + ' Selected'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVideo([]);
                }}>
                <FontAwesome name="window-close" size={16} color={'black'} />
              </TouchableOpacity>
            </View>
            )
          }
            </View>

        </View>
      </View>

      <TouchableOpacity
        onPress={finalsubmitHandler}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B7CCE',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          marginVertical: 8,
        }}>
        <Text style={{color: 'white'}}>Final Submit</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
   
   
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A8E9CA',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color: '#000',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    paddingHorizontal: 25,
    paddingVertical: 35,
    backgroundColor: '#A8E9CA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});
