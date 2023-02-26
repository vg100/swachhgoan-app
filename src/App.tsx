import React, {Children} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  TextInput,
} from 'react-native';
import Routes from './navigations';
import {Provider} from 'react-redux';
import store from './redux/store';

LogBox.ignoreAllLogs();
if (Text.defaultProps == null) Text.defaultProps = {};
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
function App(): JSX.Element {
  return (
    <Errorr>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Errorr>
  );
}

const Errorr = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <Text>error</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
