import _axios, {AxiosRequestConfig} from 'axios';
import {getEnvVariable} from '../environment';
import {ToastAndroid} from 'react-native';
import {AsyncStorageService} from './AsyncStorage';
import {showMessage, hideMessage} from 'react-native-flash-message';
export class Http {
  static getToken = async () => {
    const user = await AsyncStorageService.getUser();
    return user ? user.token : null;
  };
  private static axios = _axios.create({
    baseURL: getEnvVariable().base_api_url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  static async get(url: any, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();

      const response = await Http.axios.get(url, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async post(url: any, body?: object, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const response = await Http.axios.post(url, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async patch(url: any, body?: object, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();

      const response = await Http.axios.patch(url, body, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  static async delete(url: any, config?: AxiosRequestConfig) {
    try {
      const token = await Http.getToken();

      const response = await Http.axios.delete(url, config);
      if (response) {
        return response.data;
      }
    } catch (e) {
      Http.handleErrors(e);
      return Promise.reject(e);
    }
  }
  private static handleErrors(error: any) {
    if (error.response) {
      const message = error.response.data.message;
      const errorMessage = message
        ? message
        : 'Something Went Wrong. Please Try Again';
      showMessage({
        message: message,
        type: 'danger',
      });
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } else {
      ToastAndroid.show(
        'Something Went Wrong.Please Try Again',
        ToastAndroid.LONG,
      );
    }
  }
}
