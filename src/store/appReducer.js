export const SET_LOGIN = 'APP/SET_LOGIN';
export const SET_USER = 'APP/SET_USER';
export const SET_PASS_RESET = 'APP/SET_PASS_RESET';

export const initialState = {
  isLoggedIn: false,
  user: {},
  passwordResetEmail: {}
};

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_PASS_RESET:
      return {
        ...state,
        passwordResetEmail: action.passwordResetEmail
      };
    default:
      return state;
  }
};

export const setLogin = (isLoggedIn) => {
  sessionStorage.setItem('_appLogin', isLoggedIn); // for persisting refresh - POC purposes

  return ({
    type: SET_LOGIN,
    isLoggedIn
  });
};

export const setUser = (user) => {
  sessionStorage.setItem('_appUserEmail', user?.email || ''); // for persisting refresh - POC purposes

  return ({
    type: SET_USER,
    user
  });
};

export const setPasswordReset = (passwordResetEmail) => ({
  type: SET_PASS_RESET,
  passwordResetEmail
});
