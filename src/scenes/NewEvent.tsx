import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import styles from "./../styles/style"
import { FloatingTitleTextInputField } from './floating_title_text_input_field';

// import Animated, { useSharedValue } from 'react-native-reanimated';


const NewEvent = ({ navigation, route }) => {

    const [formValues, setFormValues] = React.useState({
        supervisor: '',
        training_type: '',
        location: '',
        no_participant: '',
        male: '',
        female: '',
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

    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'white',
            paddingVertical: 20
        }}>
            {/* <View style={{ paddingHorizontal: 5, paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                >
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 40 }}>{route.params.title}</Text>
            </View> */}


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
                            value={formValues.no_participant}
                            updateMasterState={_updateMasterState}
                        />


                        <FloatingTitleTextInputField
                            attrName='male'
                            title='Male'
                            value={formValues.male}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='female'
                            title='Female'
                            value={formValues.female}
                            updateMasterState={_updateMasterState}
                        />

                        <FloatingTitleTextInputField
                            attrName='report'
                            title='Report'
                            value={formValues.report}
                            updateMasterState={_updateMasterState}
                        />

                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginVertical: 5 }}>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/upload.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'Cabin-Bold' }}>Capture Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/images/video_upload.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'Cabin-Bold' }}>Upload Video</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView >
                </View>
            </View>
        </View>

    )
}
export default NewEvent