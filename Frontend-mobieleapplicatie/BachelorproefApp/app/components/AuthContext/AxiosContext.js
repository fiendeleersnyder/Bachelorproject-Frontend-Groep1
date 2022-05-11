import React, {createContext, useContext} from 'react';
import {axiosPrivate} from '../../API/axios'
import useAuth from '../../Hooks/useAuth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const {Provider} = AxiosContext;
const {auth, setAuth} = useAuth();

const AxiosProvider = ({children}) => {

  axiosPrivate.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
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

        setAuth({
          accessToken: tokenRefreshResponse.data.access_token,
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
        setAuth(prev => {
          return {
              ...prev,
              roles: response.data.roles,
              accessToken: response.data.acces_token }
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