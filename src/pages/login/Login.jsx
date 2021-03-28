import './login.scss';

import React, { useReducer, useEffect } from 'react';
import { useStore } from '@store/StoreContext';
import { useHistory } from "react-router-dom";
import Page from "@pages/page-wrap/Page.jsx";
import { setPasswordReset, setUser, setLogin } from '@store/appReducer';
import { fakeLogin, fakePasswordReset } from '@utils/helpers';
import { loginReducer, loginInitialState } from './loginReducer';

const Login = () => {
  const [globalState, globalDispatch] = useStore();
  const history = useHistory();
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  const {
    email,
    password,
    loading,
    resetting,
    error,
    mainHeading,
    primaryBtnCopy,
    passwordReset
  } = state;

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (resetting) {
      dispatch({type: 'resetting-password'});

      try {
        await fakePasswordReset({email});
        dispatch({type: 'resetting-success'});
        globalDispatch(setPasswordReset(email));
      } catch (error) {
        dispatch({type: 'resetting-error'});
      }
    } else {
      dispatch({type: 'login'});

      try {
        await fakeLogin({email, password});
        globalDispatch(setLogin(true));
        globalDispatch(setUser({email, password}));
      } catch (error) {
        dispatch({type: 'error'});
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('_appLogin') === 'true') history.push("/home"); // POC purposes

    if (passwordReset) {
      setTimeout(() => dispatch({type: 'reset-password-reset'}), 3000);
    }
  });

  return (
    <Page
      alert={{
        isActive:passwordReset,
        icon:"👍",
        copy:"Password reset instructions have been sent."
      }}
    >
      <div className="login">

        <div className="grid">

          <form className="login-form" onSubmit={(ev) => handleSubmit(ev)}>
            <div className="login-form_heading">
              <h1 className="heading-1">{mainHeading}</h1>

              {resetting &&
                <div className="login-form_heading-reset">
                  <p>Enter your registered email in order to receive password reset Instructions.</p>
                </div>
              }
            </div>

            <div className="login-form__input">
              <label className="vh" htmlFor="email--ID">Email</label>
              <input
                disabled={loading}
                required={true}
                placeholder="Email"
                value={email}
                onChange={(ev) => dispatch({
                  type: 'field',
                  field: 'email',
                  value: ev.target.value
                })}
                type="email"
                name="email--ID"
                id="email--ID"
              />
            </div>

            {!resetting &&
              <div className="login-form__input">
                <label className="vh" htmlFor="pass--ID">Password</label>
                <input
                  disabled={loading}
                  required={true}
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => dispatch({
                    type: 'field',
                    field: 'password',
                    value: ev.target.value
                  })}
                  type="password"
                  name="pass--ID"
                  id="pass--ID"
                />
              </div>
            }

            <div className="login-form__submit">
              <button disabled={loading} type="submit" className="button button--primary">
                {primaryBtnCopy}
              </button>
            </div>

            {!resetting
              ? <div className="login-form__reset">
                  <p>
                    <span>Forgot your password?</span>
                    <button onClick={() => dispatch({type: 'reset-password'})} disabled={loading} type="button" className="button">
                      Reset it here.
                    </button>
                  </p>
                </div>
              : <div className="login-form__reset">
                  <p>
                    <span>Didn’t mean to click that?</span>
                    <button onClick={() => dispatch({type: 'default-login'})} disabled={loading} type="button" className="button">
                      Sign In.
                    </button>
                  </p>
                </div>
            }

            {error &&
              <div className="login-form__errors">
                <p className="mice-1">{error}</p>
              </div>
            }

          </form>

        </div>

      </div>
    </Page>
  );
};

export default Login;
