import axios from "axios"
import React from "react"
    import { Text,TextInput,TouchableOpacity,View,FlatList, Image} from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const UserDashboard=({navigation,route})=>{
    const dispatch:any=useDispatch()
 const logoutHandler=()=>{
    dispatch(AuthRepositry.logout())
 }

 const data=[
    {
        image:require('../assets/images/past_event.png'),
        title:"Past Event",
        routeName:'event'
    },
     {
        image:require('../assets/images/attendance.png'),
        title:"Attendance",
        routeName:'attendance'
    },
     {
        image:require('../assets/images/upcoming_event.png'),
        title:"Upcoming Event",
        routeName:'event'
    },
     {
        image:require('../assets/images/new_event.png'),
        title:"New Event",
        routeName:'new-event'
    },
 ]

 const selectCategoryHandler=(index:any)=>{
    navigation.navigate(data[index].routeName,{title:data[index].title})

 }
    return (
        <View style={{
            flex:1,
backgroundColor:'white',
paddingVertical:20
        }}>
<View style={{justifyContent:'center',paddingHorizontal:5,paddingVertical:20}}>
<Text style={{fontSize:40}}>Categories</Text>
</View>
<FlatList
                 style={{marginVertical:20}}
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
           renderItem={({item,index})=>{
            console.log(item.image)
return(
    <TouchableOpacity
                       
                        onPress={()=>selectCategoryHandler(index)}
                        style={{
                          flex: 1 / 2,
                          elevation: 2,
                          flexDirection: 'column',
                      
                          marginHorizontal:10,
                          marginVertical:10,
                          backgroundColor: 'white',
                          borderRadius:5,
                          borderWidth:1,
                          borderColor:'#D9D0E3'
                        }}>
                     
                         <View style={{borderColor:'#D9D0E3',borderBottomWidth:1,justifyContent:'center',alignItems:"center",paddingVertical:20}}>
                         <Image 
                         source={item.image}
                       />
                         </View>
                         <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                         <Text style={{fontWeight:'bold',fontSize:15}}>{item.title}</Text>
                         </View>
                           
                                </TouchableOpacity>
)
             }}

                  />
       
            <TouchableOpacity onPress={logoutHandler}>
            <Text>logout</Text>
            </TouchableOpacity>
</View>
    
    )
}
export default UserDashboard