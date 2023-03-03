import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';
const Collapsiblee = ({
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
  deleteHandler,
  editHandler,
  viewEventHandler,
  index,
  loader
}) => {

  let controlled = expanded !== null;
  const [show, setShow] = useState(initExpanded);
  const [mounted, setMounted] = useState(initExpanded);
  const {users, isRefresh} = useSelector((state: any) => state.allUsers);
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
        style={{padding: 10}}
        activeOpacity={0.6}
        onPress={handleToggleShow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
           
            <View style={{alignItems:'center',flexDirection:'row'}}>
            <Text
              style={{
                color: `#545454`,
                fontWeight: 'bold',
                lineHeight: 21,
                fontSize: 20,
            textTransform: 'capitalize',
              }}>
              {users[index]?.name}
            </Text>
            {isRefresh && (<ActivityIndicator style={{marginHorizontal:10}} size={15} />)}
            </View>

            <Text
              style={{
                color: `#545454`,
                fontWeight: 'bold',
                lineHeight: 21,
              }}>
              {users[index]?.email}
            </Text>
          </View>
          <View>
            {showpassword ? (
              <Text
                style={{
                  color: `#545454`,
                  fontWeight: 'bold',
                  lineHeight: 21,
                }}>
                {users[index]?.passwordView}
              </Text>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: 'yellow',
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
                onPress={() => setShowpassword(pre => !pre)}>
                <Text
                  style={{
                    color: `#545454`,
                    fontSize: 15,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  view password
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: users[index]?.role === 'admin' ? 'indianred' : 'green',
              paddingVertical: 0,
              paddingHorizontal: 5,
              borderRadius: 3,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                lineHeight: 21,
                color: users[index]?.role === 'admin' ? 'white' : 'white',
                textTransform:'capitalize'
              }}>
              {users[index]?.role}
            </Text>
          </View>

          {noArrow ? null : (
            <Animated.View style={{transform: [{rotate: rotateAnimDeg}]}}>
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                 onPress={()=>editHandler(index)}
                style={{
                  paddingVertical: 10,
                  backgroundColor: '#0B7CCE',
                  flexGrow: 1,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>deleteHandler(users[index]?._id)}
                style={{
                  paddingVertical: 10,
                  backgroundColor: 'red',
                  flexGrow: 1,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Remove</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('userstack')}
              style={{
                paddingVertical: 10,
                backgroundColor: '#00A300',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>View Events</Text>
            </TouchableOpacity>
          </Collapsible>
        </View>
      ) : null}
    </View>
  );
};

export default Collapsiblee;

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
