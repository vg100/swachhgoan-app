import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../scenes/AdminDashboard';
import UserDashboard from '../scenes/UserDashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Event from '../scenes/Event';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import Attendance from '../scenes/Attendance';
import NewEvent from '../scenes/NewEvent';
import Profile from '../scenes/Profile';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export function UserStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={UserDashboard}
       options={({ route }:any) => ({ 
        headerRight:route.params && route.params.headerRight
      })}
      />
      <Stack.Screen name="event" component={Event}
  
       options={({ route }:any) => ({ 
        title: route.params.title,      
      })}
      />
       <Stack.Screen name="attendance" component={Attendance}
  
  options={({ route }:any) => ({ 
   title: route.params.title,      
 })}
 />
   <Stack.Screen name="newEvent" component={NewEvent}
  
  options={({ route }:any) => ({ 
   title: route.params.title,      
 })}
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
    <Tab.Navigator>
      <Tab.Screen name="Category" component={UserStackScreen} 
         options={({route}) => ({
          headerShown: false,
          tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({ color }) => (
          <Image source={require("../assets/images/grid.png")} />
          ),
        })}
      />
       <Tab.Screen name="Attendance" component={Attendance} 
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color }) => (
          <Image source={require("../assets/images/tab2.png")} />
          ),
        }}
      />
       <Tab.Screen name="Profile" component={Profile} 
          options={{
            tabBarIcon: ({ color }) => (
            <Image source={require("../assets/images/tab3.png")} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}