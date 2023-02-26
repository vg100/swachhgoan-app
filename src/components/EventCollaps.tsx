import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  Animated,
  Easing,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import Moment from 'moment';
import { getEnvVariable } from '../environment';
const EventCollapsible= ({
  children,
  title = '',
  item,
  type,
  header,
  schedules,
  data,
  navigation,
  initExpanded = false,
  expanded = null,
  unmountOnCollapse = false,
  isRTL = 'auto',
  duration = 300,
  collapsibleProps = {},
  collapsibleContainerStyle = {},
  arrowStyling,
  noArrow = false,
  style = {},
  activeOpacityFeedback = 0.3,
  TouchableComponent = TouchableOpacity,
  titleProps = {},
  titleStyle = {},
  touchableWrapperStyle = {},
  touchableWrapperProps = {},
  deleteHandler
}) => {
  console.log(item);
  let controlled = expanded !== null;
  const [show, setShow] = useState(initExpanded);
  const [mounted, setMounted] = useState(initExpanded);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  if (controlled) {
    if (!mounted && expanded) setMounted(true);
  }

  const handleArrowRotate = (open = null) => {
    const _open = open === null ? show : open;
    if (!_open)
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    else {
      Animated.timing(rotateAnim, {
        toValue: rotateAngle,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleAnimationEnd = () => {
    if (unmountOnCollapse && !show) setMounted(false);
  };

  const handleToggleShow = () => {
    if (!controlled)
      if (!mounted) {
        if (!show) setMounted(true);
      } else {
        setShow(!show);
      }
  };

  // place the arrow on the left or the right based on the device direction and isRTL property
  let rowDir = 'row';
  if (isRTL === 'auto') isRTL = I18nManager.isRTL;
  else if (isRTL !== I18nManager.isRTL) rowDir = 'row-reverse';

  const rotateAngle = isRTL ? 90 : -90;
  const rotateAnimDeg = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const TitleElement =
    typeof title === 'string' ? (
      <Text style={styles.TitleText}>{title}</Text>
    ) : (
      title
    );

  useEffect(() => {
    // this part is to trigger collapsible animation only after he has been fully mounted so animation would
    // not be interrupted.
    if (mounted) {
      setShow(true);
      // handleArrowRotate();
    }
  }, [mounted]);

  useEffect(() => {
    // on mounting set the rotation angel
    rotateAnim.setValue(show ? 0 : rotateAngle);
  }, []);

  useEffect(() => {
    if (mounted) handleArrowRotate(!show);
    if (controlled && show != expanded) setShow(expanded);
  });

  const [showpassword, setShowpassword] = React.useState(false);
  return (
    <View
      style={[
        styles.container,
        style,
        touchableWrapperStyle,
        {overflow: 'hidden'},
      ]}
      activeOpacity={activeOpacityFeedback}
      {...touchableWrapperProps}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          // backgroundColor: 'white',
       
          // justifyContent: 'space-between',
        }}
        activeOpacity={0.6}
        onPress={handleToggleShow}>
                
              <Image
                style={{
                  height: 100,
                  width: '40%',
                  borderRightWidth: 10,
                  borderColor: 'black',
                }}
                source={{
                  uri: `${
                    getEnvVariable()?.base_api_url
                  }/${item.files[0]?.replace(/\\/, '/')}`,
                }}
              />
              <View style={{flexGrow:1,paddingHorizontal:10}}>
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'capitalize',
                    fontFamily: 'Cabin-Bold',
                    color: 'black',
                  }}>
                  {item.supervisor.toUpperCase()}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textTransform: 'capitalize',
                    fontFamily: 'Cabin-Italic',
                    color: 'gray',
                  }}>
                  {Moment(item?.startDate).format('DD-MMM-YYYY')} -{' '}
                  {Moment(item?.endDate).format('DD-MMM-YYYY')}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    textTransform: 'capitalize',
                    fontFamily: 'Cabin-Italic',
                    color: 'gray',
                  }}>
                  {item?.location}
                </Text>
                {noArrow ? null : (
            <Animated.View style={{alignSelf:'flex-end',transform: [{rotate: rotateAnimDeg}]}}>
              <Icon name="chevron-down" size={22} color="#3766E8" />
            </Animated.View>
          )}
     
              </View>
            </TouchableOpacity>
        
         

        
     
      {mounted ? (
        <View style={{width: '100%', ...collapsibleContainerStyle}}>
          <Collapsible
            onAnimationEnd={handleAnimationEnd}
            collapsed={!show}
            {...{duration, ...collapsibleProps}}>
<View>
  <Text>Male</Text>
  <Text>FeMale</Text>
</View>
<View>
  <Text>Files</Text>
<FlatList
          nestedScrollEnabled
          data={[...item.files, ...item.files,...item.files, ...item.files,...item.files, ...item.files,...item.files, ...item.files]}
          keyExtractor={(item, index) => index.toString()}
          // numColumns={2}
          horizontal
          renderItem={({item, index}) => {
            return (
                 <ImageBackground
                  imageStyle={{opacity: 0.7}}
                  source={{
                    uri: `${getEnvVariable()?.base_api_url}/${item?.replace(
                      /\\/,
                      '/',
                    )}`,
                  }}
                  style={{
                    justifyContent: 'flex-end',
width:80,
marginHorizontal:3,
marginVertical:5,
                    height: 80,
                    borderRadius: 5,
                    backgroundColor: '#0F0F0F',

                    // borderRadius: 4,
                    overflow: 'hidden',
                  }}
                  resizeMode="contain"></ImageBackground>
              // <View
              //   style={{
              //     // flex: 1 / 2,
              //     // flexDirection: 'column',
              //     // padding: 2,
              //     backgroundColor: 'white',
              //   }}>
              //   <ImageBackground
              //     imageStyle={{opacity: 0.7}}
              //     source={{
              //       uri: `${getEnvVariable()?.base_api_url}/${item?.replace(
              //         /\\/,
              //         '/',
              //       )}`,
              //     }}
              //     style={{
              //       justifyContent: 'flex-end',

              //       height: 100,
              //       borderRadius: 5,
              //       backgroundColor: '#0F0F0F',

              //       // borderRadius: 4,
              //       overflow: 'hidden',
              //     }}
              //     resizeMode="contain"></ImageBackground>
              // </View>
            );
          }}
        />
</View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  backgroundColor: 'blue',
                  flexGrow: 1,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Edit</Text>
              </TouchableOpacity>
          
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('userstack')}
              style={{
                paddingVertical: 10,
                backgroundColor: '#00A300',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>Attendance</Text>
            </TouchableOpacity>
          </Collapsible>
        </View>
      ) : null}
    </View>
  );
};

export default EventCollapsible;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,

    // padding: 5,

    borderRadius: 10,

    //  shadowOffset: {width: 1, height: 0},
    //                 shadowOpacity: 0.4,
    //                 shadowRadius: 2,
    elevation: 1,

    backgroundColor: `white`,
  },
  //   TitleText: { color: "#3385ff", fontSize: 16, padding: 5 },
});
