import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"
import Icon from 'react-native-vector-icons/MaterialIcons';

const Supervisor = ({ navigation, route }) => {
    const dispatch: any = useDispatch()
    const { users,isRefresh} = useSelector((state: any) => state.allUsers)

    React.useEffect(()=>{
        dispatch(AuthRepositry.getAllUser())
            },[isRefresh])


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("addsupervisor")}
                    style={{ alignItems:'center',flexDirection:'row',backgroundColor: 'indianred', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 }}>
                    <Icon name={"person-add"} size={19} color="white" />
                        <Text style={{ color: 'white' ,marginLeft:2,fontSize:15}}>Add Supervisor</Text>
                    </TouchableOpacity >
                </View>
            )
        });

    }, [navigation])


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
          {
  <FlatList
  data={users}
  renderItem={({item,index})=>{
    return (
        <View key={index}>
            <Text>{JSON.stringify(item,null,2)}</Text>
        </View>
    )
  }}
  />
}


        </View>

    )
}
export default Supervisor