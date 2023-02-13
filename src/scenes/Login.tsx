import axios from "axios"
import React from "react"
    import { Text,TextInput,TouchableOpacity,View } from "react-native"
import { useDispatch } from "react-redux"
import { AuthRepositry } from "../services/AuthRepositry"


const Login=()=>{
    const dispatch:any=useDispatch()
    const loginHandler=()=>{
       dispatch(AuthRepositry.login({
        email:"user@gmail.com",
        password:"user",
       }))
    }
    return (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}>
<View style={{paddingHorizontal:5,justifyContent:'center',height:"50%",width:"50%",backgroundColor:'white'}}>
<TextInput
placeholder="email"
              style={{borderWidth:1}}
              returnKeyType="search"
              autoFocus={true}
            />
            <TextInput
            
            placeholder="password"
              style={{borderWidth:1,marginTop:5}}
              returnKeyType="search"
              autoFocus={true}
            />
            <TouchableOpacity
            onPress={loginHandler}
            style={{marginVertical:5,paddingHorizontal:5,alignSelf:'center',backgroundColor:'yellow'}}>
                <Text>Login</Text>
            </TouchableOpacity>
</View>
        </View>
    
    )
}
export default Login