import axios from "axios"
import React,{useState} from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image, ScrollView, StyleSheet, Platform } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import styles from "./../styles/style"
import { FloatingTitleTextInputField } from './floating_title_text_input_field';
import { subWeeks, addWeeks, format, subDays } from 'date-fns';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
// import Animated, { useSharedValue } from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from "react-native"
import { EventRepositry } from "../services/EventRepositry"
import {  AndroidDateInputMode,
    AndroidPickerMode,
    AndroidTimeInputMode,
    MaterialDatetimePickerAndroid,
    AndroidDatePickerType, } from 'react-native-material-datetime-picker';
// const myIcon = <Icon name="rocket" size={30} color="#900" />;

const today = new Date();
const start = subWeeks(today, 1);
const end = addWeeks(today, 2);

const NewEvent = ({ navigation, route }: any) => {
    const {filtedData, eventItems, loading, isRefresh, } = useSelector((state: any) => state.event)
    const dispatch: any = useDispatch()
    const [images, setImages] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const [mediaType, setMediaType] = React.useState('image')
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
        supervisor: '',
        training_type: '',
        location: '',
        no_participant: '',
        male: '',
        female: '',
        startDate:'',
        endDate:'',
        report: ''
    });
    function _updateMasterState(attrName: any, value: any) {

        console.log(attrName)
        setFormValues((preval) => {

            return {
                ...preval,
                [attrName]: value
            };
        });
        // setState({ [attrName]: value });
    }

    const submitHandler = () => {
        dispatch(EventRepositry.addNewEvent([...images, ...video], {
            ...formValues,
            startDate:currentStartDate.toISOString(),
            endDate:currentEndDate.toISOString()
        }))
        navigation.goBack()
    }

    const imageHandler = async () => {
        // let options:any = {
        //     selectionLimit:5,
        //     mediaType:"photo"
        //   };
        const options: any = {
            title: 'Video Picker',
            mediaType: 'photo',
            selectionLimit: 5,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        await launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let results: any = [];
                response && response?.assets?.forEach((imageInfo: any) => results.push({
                    name: imageInfo.fileName,
                    type: imageInfo.type,
                    uri: imageInfo.uri,
                }));
                if (response && response?.assets?.length > 1) {
                    setImages([...results, ...images]); // a list
                } else {
                    //image only 1  **it works!**
                    setImages(results); // a list 
                }
            }
        });



    }


    const videoHandler = async () => {
        const options: any = {
            title: 'Video Picker',
            mediaType: 'video',
            selectionLimit: 5,
            storageOptions: {
                skipBackup: true,
                path: 'videos'
            }
        };
        await launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let results: any = [];
                response && response?.assets?.forEach((imageInfo: any) => results.push({
                    name: imageInfo.fileName,
                    type: imageInfo.type,
                    uri: imageInfo.uri,
                }));
                if (response && response?.assets?.length > 1) {
                    setVideo([...results, ...video]); // a list
                } else {
                    //image only 1  **it works!**
                    setVideo(results); // a list 
                }
            }
        });
    }

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
                setIsVisible(true)
              setCurrentStartDate(startDate);
              setCurrentEndDate(endDate);
            },
          });
      };

      const cancelHandler=()=>{
        setIsVisible(false)
        setCurrentStartDate(today);
        setCurrentEndDate(today);
      }
    return (
        <View style={{
            flex: 1,

            paddingVertical: 20
        }}>



            <View style={{
                flex: 1,
                paddingHorizontal: 20
            }}>
                <View style={{ paddingHorizontal: 5, justifyContent: 'center' }}>
                    <ScrollView >

                        <FloatingTitleTextInputField
                            attrName='supervisor'
                            title='Supervisor'
                            value={formValues.supervisor}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='training_type'
                            title='Type of Training'
                            value={formValues.training_type}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='location'
                            title='Location'
                            value={formValues.location}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='no_participant'
                            title='Number of participant'
                            keyboardType='numeric'
                            value={formValues.no_participant}
                            updateMasterState={_updateMasterState}
                        />


                        <FloatingTitleTextInputField
                            attrName='male'
                            title='Male'
                            keyboardType='numeric'
                            value={formValues.male}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='female'
                            title='Female'
                            keyboardType='numeric'
                            value={formValues.female}
                            updateMasterState={_updateMasterState}
                        />
<View

style={{ width: '100%',
    borderRadius: 8,
    borderBottomWidth:1,
    borderColor: 'gray',
    height: 50,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:5,
    marginVertical: 6,
    backgroundColor: 'white'}}>
        <TouchableOpacity onPress={showDatePicker}>
{
    isVisible?<Text style={{color:'black'}}>From {format(currentStartDate, 'PP')} To {format(currentEndDate, 'PP')}</Text>:<Text style={{color:'black'}}>Select Duration</Text>
}
</TouchableOpacity>
{
      isVisible && (
        <TouchableOpacity
        onPress={cancelHandler}
        style={{backgroundColor:'black',borderRadius:50,height:15,width:15,marginRight:10,justifyContent:'center',alignItems:'center'}}>
<Text style={{color:'white'}}>x</Text>
</TouchableOpacity>
      )
}


    
</View>
                        <FloatingTitleTextInputField
                            attrName='report'
                            title='Report'
                            value={formValues.report}
                            updateMasterState={_updateMasterState}
                        />

                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginVertical: 5 }}>
                            <TouchableOpacity onPress={imageHandler}>
                                <Image source={require('../assets/images/upload.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'Cabin-Bold', color: 'black' }}>Capture Image</Text>
                                {images.length > 0 && (<View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginRight: 5, fontFamily: 'Cabin-Bold', color: 'black' }}>{images.length + " Selected"}</Text>
                                    <TouchableOpacity
                                        onPress={() => setImages([])}
                                        style={{ backgroundColor: 'black', borderRadius: 50, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                )}

                            </TouchableOpacity>
                            <TouchableOpacity onPress={videoHandler}>
                                <Image source={require('../assets/images/video_upload.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'Cabin-Bold', color: 'black' }}>Upload Video</Text>
                                {video.length > 0 && (<View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginRight: 5, fontFamily: 'Cabin-Bold', color: 'black' }}>{video.length + " Selected"}</Text>
                                    <TouchableOpacity
                                        onPress={() => setVideo([])}
                                        style={{ backgroundColor: 'black', borderRadius: 50, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                )}
                            </TouchableOpacity>

                        </View>
            
                        <TouchableOpacity
                            onPress={submitHandler}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginVertical: 8 }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </ScrollView >
                </View>
            </View>
        </View>

    )
}

const stylesSheet = StyleSheet.create({
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
    },
});
export default NewEvent