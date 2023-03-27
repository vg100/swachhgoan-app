// import axios from 'axios';
// import React from 'react';
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {AuthRepositry} from '../services/AuthRepositry';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AsyncStorageService } from '../services/AsyncStorage';

// const Splash = ({navigation, route}) => {
//   const {user, loggedIn, loggingIn, isAdmin} = useSelector(
//     (state: any) => state.userLogin,
//   );
//   const dispatch: any = useDispatch();
//   React.useEffect(() => {
//     (async () => {
//       const user = await AsyncStorageService.getUser();
//       if (user) {
//         dispatch(AuthRepositry.updateUser(user));
//       }
//     //   setTimeout(() => {
//     //     setLoading(false);
//     //   }, 2000);
//     })();
//   }, []);

//   return (
//     <View style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#307ecc',}}>
//         <Text>splash</Text>
//     </View>
//   )

// };
// export default Splash;
