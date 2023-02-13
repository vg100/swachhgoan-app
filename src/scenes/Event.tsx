import axios from "axios"
import React from "react"
    import { Text,TextInput,TouchableOpacity,View,FlatList} from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const Event=({navigation,route})=>{
  
    const backHandler=()=>{
        navigation.goBack()
    }
 const data=[
    {title:"banihal",date:"15th June,2022"},
    {title:"Batote",date:"19th June,2022"},
    {title:"banihal",date:"5th June,2022"},
    {title:"banihal",date:"5th June,2022"}
 ]
    return (
        <View style={{
            flex:1,
backgroundColor:'white',
paddingVertical:20
        }}>
<View style={{paddingHorizontal:5,paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
    <TouchableOpacity
    onPress={backHandler}
    >
        <Text>Back</Text>
    </TouchableOpacity>
<Text style={{fontSize:40}}>{route.params.title}</Text>
</View>

<FlatList
data={data}
renderItem={({item})=>{
    return (
<View style={{marginVertical:10,flexDirection:'row',backgroundColor:'green',marginHorizontal:10}}>
    <View style={{backgroundColor:'red',padding:35}}>
        <Text>Image</Text>
    </View>
    <View>
    <Text>{item.title}</Text>
    <Text>{item.date}</Text>
    </View>
</View>
    )
}}
/>

       
           
</View>
    
    )
}
export default Event