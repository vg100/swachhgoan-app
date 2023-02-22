import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { ToastAndroid } from 'react-native';

export class Utils {
  static  exportDataToExcel(data:any){
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data)    
    XLSX.utils.book_append_sheet(wb,ws,"Users")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
    RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/Download/my_exported_file.xlsx', wbout, 'ascii').then((r:any)=>{
        ToastAndroid.show('success', ToastAndroid.LONG);
     console.log('Success');
    }).catch((e:any)=>{
      console.log('Error', e);
    });
    }
}