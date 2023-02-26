import axios from "axios"
import React from "react"
import { ActivityIndicator, Alert, PermissionsAndroid } from "react-native"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import { EventRepositry } from "../services/EventRepositry"
// var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { Utils } from "../utils/utils"
import { format } from "date-fns"
import Moment from 'moment';
import { getEnvVariable } from "../environment"
const Event = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const {filtedData, eventItems, loading, isRefresh, } = useSelector((state: any) => state.event)

 

    React.useEffect(() => {
        if (route.params.title === "Past Event") {
            dispatch(EventRepositry.getPastEvent())
        } else if (route.params.title === "Ongoing Event") {

            dispatch(EventRepositry.getOngoingEvent())
        }else { 
            dispatch(EventRepositry.getUpcomingEvent())
        }
    }, [route.params.title])

    console.log(eventItems);




    React.useLayoutEffect(() => {
        if (route.params.title === "Ongoing Event") { 
            navigation.setOptions({
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('addEvent', { title: "Add Event", })}
                            style={{ backgroundColor: 'indianred', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Add Event</Text>
                        </TouchableOpacity >
                    </View>
                )
            });
              }
      

    }, [navigation])

    const handleClick = async () => {

        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {
                const granted: any = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {   title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    Utils.exportDataToExcel(route.params.title === "Past Event" ? pastEvent : upcomingEvent);
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                Utils.exportDataToExcel(route.params.title === "Past Event" ? pastEvent : upcomingEvent);
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }

    };

    if (eventItems.length < 1) {
        return (
            <Text>No data!</Text>
        )
    }

    return (
        <View style={{
            flex: 1,
        }}>


            <FlatList
                data={filtedData}
                renderItem={({ item }) => {
console.log({uri: `${getEnvVariable()?.base_api_url}/${item.files[0]?.replace(/\\/,'/')}`})
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('eventDetail', { title: "Event Detail", data: item })}
                            style={{ alignItems: 'center', elevation: 1, borderRadius: 10, marginVertical: 10, flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 15, justifyContent: 'space-between' }}>
                            <Image style={{ height: 100, width: "40%", borderRightWidth: 10, borderColor: 'black' }}
                                source={{ uri: `${getEnvVariable()?.base_api_url}/${item.files[0]?.replace(/\\/,'/')}` }}
                            />
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 20, textTransform: 'capitalize', fontFamily: 'Cabin-Bold', color: 'black' }}>{item.supervisor.toUpperCase()}</Text>
                                <Text style={{ fontSize: 15, textTransform: 'capitalize', fontFamily: 'Cabin-Italic', color: 'gray' }}>{Moment(item?.startDate).format('DD-MMM-YYYY')} - {Moment(item?.endDate).format('DD-MMM-YYYY')}</Text>
                                <Text style={{ fontSize: 15, textTransform: 'capitalize', fontFamily: 'Cabin-Italic', color: 'gray' }}>{item?.location}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <TouchableOpacity
                onPress={handleClick}
                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B7CCE', padding: 15 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Download</Text>
            </TouchableOpacity>
        </View>

    )
}
export default Event