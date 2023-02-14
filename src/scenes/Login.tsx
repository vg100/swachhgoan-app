import axios from "axios"
import React from "react"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const Login = () => {
    const dispatch: any = useDispatch()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const loginHandler = () => {
        console.log(password, email)
        if (password !== "" && email !== "") {
            dispatch(AuthRepositry.login({
                // email,password
                // email:email,
                // password:password
                email: "user@gmail.com",
                password: "user",
            }))
        } else {
            Alert.alert("All fields are required!")
        }



    }
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{ paddingHorizontal: 5, justifyContent: 'center', height: "50%", width: "50%", backgroundColor: 'white' }}>

                <TextInput
                    placeholder="email"
                    style={{ borderWidth: 1 }}
                    value={email}
                    onChange={(value: any) => setEmail(value)}
                    autoFocus={true}

                />
                <TextInput

                    placeholder="password"
                    style={{ borderWidth: 1, marginTop: 5 }}
                    onChange={(value: any) => setPassword(value)}
                    value={password}

                />
                <TouchableOpacity
                    onPress={loginHandler}
                    style={{ marginVertical: 5, paddingHorizontal: 5, alignSelf: 'center', backgroundColor: 'yellow' }}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
export default Login