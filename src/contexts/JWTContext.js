import { createContext, useEffect, useReducer } from 'react';
// utils
import { isValidToken, setSession } from '../utils/jwt';
import { REACT_APP_API_URL } from '../config';
import axios from 'axios';
import React from 'react';
import axiosInstance from '../utils/axios';

// ----------------------------------------------------------------------

const Types = {
  Initial: 'INITIALIZE',
  Login: 'LOGIN',
  Logout: 'LOGOUT',
  Register: 'REGISTER'
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userId = window.localStorage.getItem('userId');
        if (accessToken && userId && isValidToken(accessToken)) {
          const response = await axios.get(REACT_APP_API_URL + `users/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          const {
            fldUserId,
            fldRole,
            fldBirthday,
            fldEmail,
            fldFullname,
            fldPhone,
            fldAddress,
            fldActiveStatus
          } = response.data;
          const user = {
            id: fldUserId,
            role: fldRole,
            birthday: fldBirthday,
            email: fldEmail,
            fullName: fldFullname,
            phone: fldPhone,
            address: fldAddress,
            activeStatus: fldActiveStatus
          };
          setSession(accessToken);

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    var url = '/login';
    const userLogin = await axiosInstance.get(url, {
      params: {
        Username: username,
        Password: password
      },
    });
    //const firebaseUser = await firebaseLogin.user?.getIdTokenResult();
    if (!userLogin) return;
      const userToken = userLogin.data.token;
    
    //const firebaseToken = firebaseUser.token;
    console.log(userToken);
    url = "/admin";
    const response = await axiosInstance.get(url, {
      params: {
        token: userToken
      },
    });
    const {
      id,
      token,
      email,
      image,
      phoneNum,
      idCard,
      city,
      district,
      address,
      fullName,
      bankName
    } = response.data;
    const user = {
      id: id,
      phoneNum: phoneNum,
      idCard: idCard,
      city: city,
      district: district,
      address: address,
      bankName: bankName,
      fullName: fullName,
      email: email,
      image: image
    };
    setSession(token);
    window.localStorage.setItem('userId', id);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    window.localStorage.removeItem('userId');
    dispatch({ type: Types.Logout });
  };

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };