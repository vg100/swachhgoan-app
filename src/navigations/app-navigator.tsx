import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../scenes/AdminDashboard';
import UserDashboard from '../scenes/UserDashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Event from '../scenes/Event';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export function UserStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="user" component={UserDashboard} />
      <Stack.Screen name="event" component={Event}
      
      />
    </Stack.Navigator>
  );
}

export function AdminStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="admin" component={AdminDashboard} />
    </Stack.Navigator>
  );
}

export function MyTabs() {


  const getTabBarVisibility = (route:any) => {
    const routeName = route?.state
      ? route?.state?.routes[route?.state?.index]?.name
      : '';
    switch (routeName) {
      case 'event':
        return false;

      default:
        return true;
    }
  };
  return (
    <Tab.Navigator 
    screenOptions={({route}) => { 
      return ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Category') {
          iconName = focused ? <Image source={require('../assets/images/attendance.png')} 
          resizeMode="contain"
          style={{ width: 25 }}
          /> : <Image source={require('../assets/images/attendance.png')} 
          resizeMode="contain"
          style={{ width: 25 }}
          />;
        }
      },
    })}}
    >
      <Tab.Screen name="Category" component={UserStackScreen} 
         initialParams={{
          activeicon: require('../assets/images/attendance.png'),
          inactiveicon: require('../assets/images/attendance.png'),
        }}
         options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
       <Tab.Screen name="attendance" component={UserStackScreen} 
         options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
       <Tab.Screen name="profile" component={UserStackScreen} 
         options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
}