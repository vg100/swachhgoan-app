import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const EventDetail = ({ navigation, route }) => {
    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'white',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{color:'black'}}>{JSON.stringify(route.params.data,null,2)}</Text>
           

        </View>

    )
}
export default EventDetail