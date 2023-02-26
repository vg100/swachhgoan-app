import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../scenes/Login';

const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={({route}) => ({headerShown: false})}
      />
    </Stack.Navigator>
  );
}
export default AuthStackScreen;
