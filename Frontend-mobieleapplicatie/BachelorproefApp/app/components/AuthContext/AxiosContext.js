import React, {createContext, useContext} from 'react';
import {axiosPrivate} from '../../API/axios'
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  axiosPrivate.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = failedRequest => {
    //const data = {
      //refreshToken: authContext.authState.refreshToken,
    //};

    const options = {
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:8080/auth/refreshtoken',
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            //refreshToken: authContext.authState.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch(e => {
        authContext.setAuthState({
          accessToken: null,
          //refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(axiosPrivate, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        axiosPrivate,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};