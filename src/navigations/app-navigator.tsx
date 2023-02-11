import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../scenes/Login';

const Stack = createNativeStackNavigator();

function AppStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="dash" component={Login} />
    </Stack.Navigator>
  );
}
export default AppStackScreen