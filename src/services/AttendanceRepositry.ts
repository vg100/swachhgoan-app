import { Alert } from "react-native";
import { Api } from "./Api";
import { EventActionTypes } from "./EventRepositry";

export enum AttendanceActionTypes {
    ADD_ATTENDANCE = 'add attendance',
    
  }

export class AttendanceRepositry {

  static addAttendance(id:any,data:any){
        return async (dispatch: any) => {
        
            try {
              const user = await Api.addAttendance(id ,data);
              console.log(user, 'hh');
            //   dispatch({
            //     type: AttendanceActionTypes.ADD_ATTENDANCE,
            //     payload: user,
            //   });
            Alert.alert("Marked Attendance Successfullly")
            dispatch({type: EventActionTypes.IS_REFRESH});
            } catch (error) {
              return Promise.reject(error);
            }
          };
        }

}