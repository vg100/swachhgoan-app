import {getEnvVariable} from '../environment';
import {Http} from './http';

export class Api {
  static login(data: any) {
    return Http.post('/user/login', data);
  }

  static async addNewEvent(url: any, data: any) {
    const token = await Http.getToken();
    return Http.post(url, data, {
      headers: {
        authorization: token,
      },
    });
  }

  static async getAllEvents(url: any) {
    const token = await Http.getToken();
    return Http.get(`${url}`, {
      headers: {
        authorization: token,
      },
    });
  }

  static async getAllUser() {
    const token = await Http.getToken();
    return Http.get('/user/', {
      headers: {
        authorization: token,
      },
    });
  }

  static async createUser(data: any) {
    const token = await Http.getToken();
    return Http.post('/user/signup', data, {
      headers: {
        authorization: token,
      },
    });
  }

  static async deleteUser(id: any) {
    const token = await Http.getToken();
    return Http.delete(`/user/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });
  }

  static async addAttendance(id: any, data: any) {
    const token = await Http.getToken();
    return Http.post(`/attendance/add/${id}`, data, {
      headers: {
        authorization: token,
      },
    });
  }

  static async updateSupervisor(id: any, data: any) {
    const token = await Http.getToken();
    return Http.patch(`/user/update/${id}`, data, {
      headers: {
        authorization: token,
      },
    });
  }

  static async updateEvent(id: any, data: any) {
    const token = await Http.getToken();
    return Http.patch(`/event/update/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    });
  }
  static async deleteFile(id: any, index: any) {
    const token = await Http.getToken();
    return Http.delete(`/event/deletefile/${id}/${index}`, {
      headers: {
        authorization: token,
      },
    });
  }
  static async finalSubmit(id: any, data: any) {
    const token = await Http.getToken();
    return Http.patch(`/event/finalsubmit/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    });
  }
}
