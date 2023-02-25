import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image,Animated, TouchableHighlight, StyleSheet, ScrollView, ImageBackground } from "react-native"
import { useDispatch } from "react-redux"
import Collapsiblee from "../components/collapse"
import { AuthRepositry } from "../services/AuthRepositry"
import { subWeeks, addWeeks, format, subDays } from 'date-fns';
import {  AndroidDateInputMode,
    AndroidPickerMode,
    AndroidTimeInputMode,
    MaterialDatetimePickerAndroid,
    AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import { getEnvVariable } from "../environment"
    const today = new Date();
const EventDetail = ({ navigation, route }) => {
    const data=route.params.data;
    const [date, setDate] = React.useState(new Date());
    const showDatePicker = () => {
        MaterialDatetimePickerAndroid.show({
          value: date,
          titleText: 'Select date',
          mode: AndroidPickerMode.DATE,
          minimumDate: subWeeks(today, 1),
          maximumDate: addWeeks(today, 1),
          inputMode: AndroidDateInputMode.CALENDAR,
          type: AndroidDatePickerType.DEFAULT,
          onChange: (date) => {
            setDate(date);
          },
        });
      };
    return (
      
<ScrollView contentContainerStyle={{ flexGrow: 1,     padding: 20, }}>

<View style={{
    height:"20%",


    overflow: 'hidden',
   
    backgroundColor: 'orange',
borderRadius:20,
    
  }}>

<Image  source={{ uri: `${getEnvVariable()?.base_api_url}/${data.files[0]?.replace(/\\/,'/')}` }}  style={{flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
    
    }}/>


</View>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:5}}>
<Text style={{fontSize:30}}>Event Name</Text>
<TouchableOpacity 
onPress={showDatePicker}
style={{backgroundColor:'indianred',paddingHorizontal:8,paddingVertical:2,borderRadius:5}}>
<Text style={{color:'white'}}>Mark Attendance</Text>
</TouchableOpacity>
</View>

<Text style={{fontSize:20,marginVertical:5}}>By supervisor</Text>

<Text style={{fontSize:15,fontWeight:'bold',color:'black',marginVertical:5,marginHorizontal:2}}>Details</Text>
<View style={{backgroundColor:'white',elevation:1,paddingHorizontal:10,paddingVertical:10}}>
    <Text style={{fontSize:15}}>Start at: {data.startDate}</Text>
    <Text style={{fontSize:15,marginTop:5}}>End at: {data.endDate}</Text>
    <Text style={{fontSize:15,marginTop:5}}>Location: {data.location}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Participant: {data.no_of_participant}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Male: {data.no_of_males}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Female: {data.no_of_females}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Participant: {data.no_of_participant}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Male: {data.no_of_males}</Text>
    <Text style={{fontSize:15,marginTop:5}}>No of Female: {data.no_of_females}</Text>
  
  
</View>
<Text style={{fontSize:15,fontWeight:'bold',color:'black',marginVertical:5,marginHorizontal:2}}>Report</Text>
<View style={{backgroundColor:'white',elevation:1,paddingHorizontal:10,paddingVertical:10}}>
<Text style={{fontSize:18}}>{data.report}</Text>

</View>
<Text style={{fontSize:15,fontWeight:'bold',color:'black',marginVertical:5,marginHorizontal:2}}>Files</Text>
<View>


<FlatList
nestedScrollEnabled
              
                data={[...data.files,...data.files,...data.files]}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            flex: 1 / 2,
                            flexDirection: 'column',
                            padding: 2,
                            backgroundColor: 'white',
                            
                        }}>
                           <ImageBackground
        imageStyle={{opacity: 0.7}}
        source={{ uri: `${getEnvVariable()?.base_api_url}/${item?.replace(/\\/,'/')}` }}
        style={{
          justifyContent: 'flex-end',

          height: 100,
          borderRadius:5,
          backgroundColor: '#0F0F0F',
        
          // borderRadius: 4,
          overflow: 'hidden',
        }}
        resizeMode="contain"></ImageBackground>
                        </View>
                    )
                }}
                />

</View>


            <Text style={{color:'black'}}>{JSON.stringify(route.params.data,null,2)}</Text>
           
            </ScrollView>
    

    )
}
export default EventDetail






