import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  Animated,
  Easing,
} from 'react-native';



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Collapsible from 'react-native-collapsible';
const Collapsiblee = ({
  children,
  title = '',
  item,
  type,
  header,
  schedules,
  data,
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

  return (
    <View
      style={[styles.container, style, touchableWrapperStyle]}
      activeOpacity={activeOpacityFeedback}
      {...touchableWrapperProps}>
      <TouchableOpacity activeOpacity={0.6} onPress={handleToggleShow}>
       
          <Text
            style={{
              color: `#545454`,
              fontWeight: 'bold',
              lineHeight: 21,
      
            }}>
           Name: {item?.name}
          </Text>
         
          <Text
            style={{
              color: `#545454`,
              fontWeight: 'bold',
              lineHeight: 21,
      
            }}>
           Email: {item?.email}
          </Text>

          <Text
            style={{
              color: `#545454`,
              fontWeight: 'bold',
              lineHeight: 21,
      
            }}>
           Password: vg100
          </Text>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: `#545454`,
              fontWeight: 'bold',
              lineHeight: 21,
      
            }}>
           Role: {item?.role}
          </Text>

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
              style={{
                borderTopWidth: 0.5,
                borderColor: 'black',
                // marginVertical: hp(1.3),
              }}>


          
              </View>
              <View style={{paddingHorizontal:10}}>
<Text>edit</Text>
</View>
            
             

              
            
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