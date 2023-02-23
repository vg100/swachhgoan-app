import {getEnvVariable} from '../environment';
import {Http} from './http';

export class Api {
  static login(data:any) {
    return Http.post('/user/login', data);
  }

  static async addNewEvent(data:any){
    const token = await Http.getToken();
    return Http.post('/event/add', data,{
      headers:{
        'Content-Type': 'multipart/form-data',
        authorization:token
      }
    });
  }

  static async getAllEvents(){
    const token = await Http.getToken();
    return Http.get('/event/',{
      headers:{
        authorization:token
      }
    });
  }

  static async getAllUser(){
    const token = await Http.getToken();
    return Http.get('/user/',{
      headers:{
        authorization:token
      }
    });
  }

  static async createUser(data:any){
    const token = await Http.getToken();
    return Http.post('/user/signup',data,{
      headers:{
        authorization:token
      }
    });
  }
}
