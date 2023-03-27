import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthRepositry} from '../services/AuthRepositry';
import {EventRepositry} from '../services/EventRepositry';
// var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Util, {Utils} from '../utils/utils';
import {format} from 'date-fns';
import Moment from 'moment';
import {getEnvVariable} from '../environment';
import EventCollapsible from '../components/EventCollaps';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Linking} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const {config, fs} = RNFetchBlob;

let {width, height} = Dimensions.get('window');

const Event = ({navigation, route}: any) => {
  console.log(route.params, 'route.params.title');
  const dispatch: any = useDispatch();
  const {filtedData, eventItems, loading, isRefresh} = useSelector(
    (state: any) => state.event,
  );
  const [selectedFile, setSelectedFile] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [orientation, setorientation] = React.useState({
    orientationWidth: width,
    orientationHeight: height,
  });

  let videoPlayer = React.useRef(null);
  // React.useEffect(() => {
  //   if (route.params.title === 'Past Event') {
  //     dispatch(EventRepositry.getPastEvent());
  //   } else if (route.params.title === 'Ongoing Event') {
  //     dispatch(EventRepositry.getOngoingEvent());
  //   } else {
  //     dispatch(EventRepositry.getUpcomingEvent());
  //   }
  // }, [route.params.title,isRefresh]);

  React.useEffect(() => {
    if (
      route.params.title === 'Event Done' ||
      route.params.title === 'Participant List'
    ) {
      dispatch(EventRepositry.getDoneEvent());
    } else {
      dispatch(EventRepositry.getOngoingEvent());
    }
  }, [route.params.title, isRefresh]);

  React.useLayoutEffect(() => {
    // if (!isAdmin) {
    //   if (route.params.title === 'Ongoing Event') {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              let options = {
                fileCache: true,
                addAndroidDownloads: {
                  useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                  notification: true,
                  description: 'Downloading image.',
                },
              };
              config(options)
                .fetch(
                  'GET',
                  `${getEnvVariable().base_api_url}/event/export-event`,
                )
                .then(res => {
                  console.log('The file saved to ', res.path());
                })
                .catch(err => {
                  console.log(err, 'error');
                });
            }}
            style={{
              backgroundColor: '#0B7CCE',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>Downlod</Text>
          </TouchableOpacity>
        </View>
      ),
    });
    //   }
    // }
  }, [navigation]);

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted: any = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)

          Utils.exportDataToExcel(filtedData, route.params?.title?.trim());
          console.log('Permission granted');
        } else {
          // Permission denied
          Linking.openSettings();
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        Utils.exportDataToExcel(filtedData, route.params?.title?.trim());
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  function isImgUrl(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  }

  const resizeVideoPlayer = () => {
    // Always in 16 /9 aspect ratio
    let {width, height} = Dimensions.get('screen');

    if (Util.isPortrait()) {
      setorientation({
        orientationWidth: width * 0.8,
        orientationHeight: width * 0.8 * 0.56,
      });
    } else {
      setorientation({
        orientationHeight: height * 0.8,
        orientationWidth: height * 0.8 * 1.77,
      });
    }
  };

  const onLayout = (e: any) => {
    console.log('on layout called');
    resizeVideoPlayer();
  };

  const onPress = () => {
    if (videoPlayer != null) videoPlayer.presentFullscreenPlayer();
  };

  const deleteHandler = (id: any, index: any) => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove  this file?',
      [
        {
          text: 'Yes',
          onPress: () => dispatch(EventRepositry.deleteFile(id, index)),
        },
        {
          text: 'No',
        },
      ],
    );
  };

  if (filtedData.length < 1) {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>No Events Found!</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={[...filtedData]}
        renderItem={({item, index}) => {
          return (
            <EventCollapsible
              data={item}
              navigation={navigation}
              selectedEvent={(event: any) => setSelectedFile(event)}
              handler={(id: any, index: any) => deleteHandler(id, index)}
              routeName={route.params.title}
            />
          );
        }}
      />

      {selectedFile.length > 0 && (
        <>
          {!isImgUrl(selectedFile) ? (
            <Modal
              animationType="slide"
              visible={selectedFile.length > 0}
              onRequestClose={() => setSelectedFile('')}
              transparent={false}>
              <View
                onLayout={onLayout}
                style={{
                  flex: 1,
                  //  width: 400, height: 400,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}>
                <Video
                  ref={(p: any) => {
                    videoPlayer = p;
                  }}
                  source={{
                    uri: `${
                      getEnvVariable()?.base_api_url
                    }/${selectedFile?.replace(/\\/, '/')}`,
                  }}
                  style={{
                    width: orientation.orientationWidth,
                    height: orientation.orientationHeight,
                  }}
                  controls={true}
                  resizeMode={'contain'}
                />
                {/* <Button title="full screen" onPress={onPress}></Button> */}
              </View>
            </Modal>
          ) : (
            <Modal
              animationType="slide"
              visible={selectedFile.length > 0}
              transparent={true}
              onRequestClose={() => setSelectedFile('')}>
              <ImageViewer
                enableSwipeDown={true}
                onSwipeDown={() => {
                  setSelectedFile('');
                }}
                imageUrls={[
                  {
                    url: `${
                      getEnvVariable()?.base_api_url
                    }/${selectedFile?.replace(/\\/, '/')}`,
                  },
                ]}
              />
            </Modal>
          )}
        </>
      )}
      {/* 


      <TouchableOpacity
        onPress={handleClick}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0B7CCE',
          padding: 15,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Download</Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default Event;
