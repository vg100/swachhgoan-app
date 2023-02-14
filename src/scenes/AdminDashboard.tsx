import axios from "axios"
import React from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const AdminDashboard = () => {
    const dispatch: any = useDispatch()
    const logoutHandler = () => {
        dispatch(AuthRepositry.logout())
    }
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>admin Dashboard</Text>
            <TouchableOpacity onPress={logoutHandler}>
                <Text>logout</Text>
            </TouchableOpacity>
        </View>

    )
}
export default AdminDashboard