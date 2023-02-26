import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import { FloatingTitleTextInputField } from './floating_title_text_input_field';


const Attendance = ({ navigation, route }) => {
    const [selectedRole, setSelectedRole] = React.useState(0);

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

            <View style={{ marginTop: 20 }}></View>

            <FloatingTitleTextInputField
                attrName='name'
                title='Name'
            />
            <FloatingTitleTextInputField
                attrName='age'
                title='Age'
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
                                onPress={() => setSelectedRole(index)}
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
                                {index === selectedRole ? (
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
            <FloatingTitleTextInputField
                attrName='contact'
                title='Contact Number'
                keyboardType="numeric"
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
