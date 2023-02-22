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
import EventDetail from '../scenes/EventDetail';

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
        tabBarStyle: { display: "none" },    
      })}
      />
       <Stack.Screen name="attendance" component={Attendance}
  
  options={({ route }:any) => ({ 
   title: route.params.title,      
 })}
 />
   <Stack.Screen name="newEvent" component={Event}
  
  options={({ route }:any) => ({ 
   title: route.params.title,      
 })}
 
 />
  <Stack.Screen name="addEvent" component={NewEvent}
  
  options={({ route }:any) => ({ 
   title: route.params.title,      
 })}
 
 />
  <Stack.Screen name="eventDetail" component={EventDetail}
  
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
  return (
    <Tab.Navigator>
      <Tab.Screen name="Category" component={UserStackScreen} 
        options={({ route }) => ({
          headerShown: false,
           tabBarIcon: ({ color }) => (
          <Image source={require("../assets/images/grid.png")} />
          ),
          tabBarStyle: ((route) => {

            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
            console.log(routeName)
            switch (routeName) {
              case "event":
                case "newEvent":
                  case "attendance":
                    case "addEvent":
                      case "eventDetail":
                return { display: "none" }
              default:
                return
            }
            
          })(route),
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