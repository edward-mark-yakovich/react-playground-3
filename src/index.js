import '@css_global/app.scss';

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { StoreProvider } from '@store/StoreContext';
import { initialState, appReducer } from './store/appReducer';

/****** Pages *****/
import Home from '@pages/home/Home.jsx';
import Login from '@pages/login/Login.jsx';

/****** Components *****/
import ApplicationErrorBoundary from '@components/error-boundaries/ApplicationErrorBoundary.jsx';
import NoRouteMatch from '@components/no-route-match/NoRouteMatch.jsx';

const isLocal = window.location.host === 'localhost:8080';
const subPath = isLocal ? '' : window.config.subDir;

if (!isLocal) {
  document.write("<base href='" + window.config.subDir + "/' />");
}

const RouteWithBoundary = ({ component: Component, ...rest }) => {
  const componentFunc = props => (
    <ApplicationErrorBoundary>
      <Component {...props} />
    </ApplicationErrorBoundary>
  );

  return <Route {...rest} component={componentFunc} />;
};

// need .htaccess to another solution to solve client side routing on server or use # url approach

render(
  <StoreProvider initialState={initialState} reducer={appReducer}>
    <BrowserRouter basename={`${subPath}`}>
      <Fragment>
        <div className="app _app--v-1.0.1">
          <Switch>
            <RouteWithBoundary exact={true} path="/" component={Login} />
            <RouteWithBoundary exact={true} path="/home" component={Home} />

            <Route component={NoRouteMatch} />
          </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
  </StoreProvider>, document.getElementById('app')
);
