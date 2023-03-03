import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {ToastAndroid} from 'react-native';

import { Dimensions } from "react-native";
import { showMessage } from 'react-native-flash-message';
export class Utils {
  static exportDataToExcel(data: any,filename:any) {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    RNFS.writeFile(
      RNFS.ExternalStorageDirectoryPath + `/Download/${filename}.xlsx`,
      wbout,
      'ascii',
    )
      .then((r: any) => {
        showMessage({
          message: "downloaded Sucessfully",
          type: "success",
        });
        // ToastAndroid.show('success', ToastAndroid.LONG);
        // console.log('Success');
      })
      .catch((e: any) => {
        console.log('Error', e);
      });
  }
}




export default function Util() {}

Util.isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};


Util.secondToTime = (time:any) => {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
};

Util.normalizeSeconds = (number:any) =>  {
  let sec_num = parseInt(number, 10); // don't forget the second param
  let hours:any   = Math.floor(sec_num / 3600);
  let minutes:any = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds:any = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
};

