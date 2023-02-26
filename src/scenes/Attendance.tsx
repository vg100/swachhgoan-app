import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import { FloatingTitleTextInputField } from './floating_title_text_input_field';


const Attendance = ({ navigation, route }) => {
    const submitHandler = () => {

        navigation.goBack()
    }

    return (
        <View style={{
            flex: 1,
            margin: 20
        }}>

<FloatingTitleTextInputField
                            attrName='event'
                            title='Event Name'
                            disabled
                        />
                                    <FloatingTitleTextInputField
                            attrName='supervisor'
                            title='Supervisor'
                           
                        />

<FloatingTitleTextInputField
                            attrName='name'
                            title='Name'
                            disabled
                           
                        />
                                    <FloatingTitleTextInputField
                            attrName='age'
                            title='Age'
                           
                        />
          
            <FloatingTitleTextInputField
                            attrName='name'
                            title='Name'
                            style= {{marginTop: 40}}
                           
                        />
                                    <FloatingTitleTextInputField
                            attrName='age'
                            title='Age'
                           
                        />
                                    <FloatingTitleTextInputField
                            attrName='gender'
                            title='Gender'
                 
                           
                        />
                                    <FloatingTitleTextInputField
                            attrName='contact'
                            title='Contact Number'
                           
                        />

                                                <TouchableOpacity
                            onPress={submitHandler}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginVertical: 8 }}>
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>

        </View>

    )




}
export default Attendance
