import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AttendanceRepositry } from "../services/AttendanceRepositry"
import { AuthRepositry } from "../services/AuthRepositry"
import { FloatingTitleTextInputField } from './floating_title_text_input_field';
import DatePicker from 'react-native-datepicker';

const Attendance = ({ navigation, route }) => {
    const [selectedGender, setSelectedGender] = React.useState(0);
    const {user, loggedIn, loggingIn, isAdmin} = useSelector(
        (state: any) => state.userLogin,
      );
    const {eventname,_id}=route.params.item
const dispatch=useDispatch()
const [formValues, setFormValues] = React.useState({
   name:'',
   age:"",
   phone_no:"",
   gender:""
  });

  function _updateMasterState(attrName: any, value: any) {
 
    setFormValues(preval => {
      return {
        ...preval,
        [attrName]: value,
      };
    });
    // setState({ [attrName]: value });
  }

    const submitHandler = () => {
        dispatch(AttendanceRepositry.addAttendance(_id,{
           ...formValues,
           gender: selectedGender === 0 ? 'male' : 'female',
        }))
    }

    return (
        <View style={{
            flex: 1,
            margin: 20
        }}>

            <FloatingTitleTextInputField
                attrName='event'
                title={eventname}
                disableColor={{   backgroundColor: 'lightgray'}}
                editable={false}
               
            />
            <FloatingTitleTextInputField
                attrName='supervisor'
                title={user.name}
                disableColor={{   backgroundColor: 'lightgray'}}
                editable={false}
           
            />

            <View style={{ marginTop: 20 }}></View>


            <FloatingTitleTextInputField
                attrName='name'
                title='Name'
                value={formValues.name}
                updateMasterState={_updateMasterState}
            />
            <FloatingTitleTextInputField
                attrName='age'
                title='Age'
                value={formValues.age}
                updateMasterState={_updateMasterState}
            />

<FloatingTitleTextInputField
                attrName='phone_no'
                title='Contact Number'
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
                <Text style={{ marginRight: 10, fontSize: 18 }}>Gender </Text>
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
                            <Text style={{ marginLeft: 5, fontSize: 16 }}>{item}</Text>
                        </View>
                    );
                })}
            </View>
            {/* /> */}
         

            <TouchableOpacity
                onPress={submitHandler}
                style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginVertical: 8 }}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>

        </View>

    )

}


export default Attendance

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#A8E9CA'
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
      color : "#000"
    }
  });
