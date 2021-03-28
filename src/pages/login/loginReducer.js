export const loginInitialState = {
  mainHeading: 'Sign In',
  primaryBtnCopy: 'Sign In',
  email: '',
  password: '',
  loading: false,
  resetting: false,
  error: '',
  passwordReset: false
};

export function loginReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value
      };
    case "login":
      return {
        ...state,
        loading: true,
        resetting: false,
        error: '',
        primaryBtnCopy: 'Signing In...',
        passwordReset: false
      };
    case "error":
      return {
        ...state,
        loading: false,
        resetting: false,
        error: 'Incorrect Email or Password',
        email: '',
        password: '',
        primaryBtnCopy: 'Sign In',
        passwordReset: false
      };
    case "logout":
    case "default-login":
      return {
        ...state,
        mainHeading: 'Sign In',
        loading: false,
        resetting: false,
        error: '',
        email: '',
        password: '',
        primaryBtnCopy: 'Sign In',
        passwordReset: false
      };
    case "reset-password":
      return {
        ...state,
        mainHeading: 'Reset Password',
        resetting: true,
        error: '',
        email: '',
        password: '',
        primaryBtnCopy: 'Reset Password',
        passwordReset: false
      };
    case "reset-password-reset":
      return {
        ...state,
        passwordReset: false,
      };
    case "resetting-password":
      return {
        ...state,
        loading: true,
        resetting: true,
        error: '',
        primaryBtnCopy: 'Resetting Password...',
        passwordReset: false
      };
    case "resetting-success":
      return {
        ...state,
        mainHeading: 'Sign In',
        loading: false,
        resetting: false,
        error: '',
        email: '',
        password: '',
        primaryBtnCopy: 'Sign In',
        passwordReset: true
      };
    case "resetting-error":
      return {
        ...state,
        loading: false,
        resetting: true,
        error: 'Incorrect Email',
        email: '',
        password: '',
        primaryBtnCopy: 'Reset Password',
        passwordReset: false
      };
    default:
      return state;
  }
}
