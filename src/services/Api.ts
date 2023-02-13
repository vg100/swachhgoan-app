import {getEnvVariable} from '../environment';
import {Http} from './http';

export class Api {
  static login(data:any) {
    return Http.post('/user/login', data);
  }
}
