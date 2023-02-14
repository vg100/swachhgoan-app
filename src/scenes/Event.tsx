import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View, FlatList, Image } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const Event = ({ navigation, route }) => {

    const backHandler = () => {
        navigation.goBack()
    }
    const data = [
        { image: require('../assets/images/image.png'), title: "banihal", date: "15th June,2022" },
        { image: require('../assets/images/image.png'), title: "banihal", date: "15th June,2022" },
        { image: require('../assets/images/image.png'), title: "banihal", date: "15th June,2022" },

    ]
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 20
        }}>
            {/* <View style={{paddingHorizontal:5,paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
    <TouchableOpacity
    onPress={backHandler}
    >
        <Text>Back</Text>
    </TouchableOpacity>
<Text style={{fontSize:40}}>{route.params.title}</Text>
</View> */}

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: 'center', elevation: 1, borderRadius: 10, marginVertical: 10, flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 10 }}>

                            <Image

                                source={item.image}
                            />

                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                                <Text style={{ fontSize: 20 }}>{item.date}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>

    )
}
export default Event