import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {AdminStackScreen, MyTabs, UserStackScreen} from './app-navigator';
import AuthStackScreen from './auth-navigator';
import {useDispatch, useSelector} from 'react-redux';
import {AsyncStorageService} from '../services/AsyncStorage';
import {AuthRepositry} from '../services/AuthRepositry';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
const Routes = () => {
  const dispatch: any = useDispatch();
  const {appLoader} = useSelector((state: any) => state.appLoader);
  const {user, loggedIn, loggingIn, isAdmin} = useSelector(
    (state: any) => state.userLogin,
  );
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorageService.getUser();
      if (user) {
        dispatch(AuthRepositry.updateUser(user));
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })();
  }, []);
  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{fontSize: 25, marginVertical: 15}}>Swatchh Gaon</Text>
        <ActivityIndicator size={40} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {loggedIn ? (
          <>{isAdmin ? AdminStackScreen() : MyTabs()}</>
        ) : (
          AuthStackScreen()
        )}
      </NavigationContainer>
      {appLoader && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',

            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#D3D3D3',
              padding: 25,
              elevation: 2.5,
              borderRadius: 12,
            }}>
            <ActivityIndicator
              animating={true}
              size={'large'}
              color={'#0B7CCE'}
            />
          </View>
        </View>
      )}

      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
};

export default Routes;
