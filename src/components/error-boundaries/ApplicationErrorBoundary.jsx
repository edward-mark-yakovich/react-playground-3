import './error-boundary.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BrandLogo from '@components/brand-logo/BrandLogo.jsx';
import {logErrorRemotely} from '@utils/helpers';

export class ApplicationErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // not sure if there's a way to do this with React functional component?
    // https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    logErrorRemotely(error, errorInfo);
  }

  render() {
    const isLocal = window.location.host === 'localhost:8080';
    const subPath = isLocal ? '' : window.config.subDir;

    return this.state.errorInfo
      ? <div className="error-boundary">
          <div className="grid">

            <div className="error-boundary__wrap">
              <BrandLogo theme="dark" />

              <div className="error-boundary__inner">
                <div className="error-boundary__content">
                  <p className="heading-1">An error occured...</p>

                  <img src={`${subPath}/assets/images/maintenance.png`} />
                </div>
              </div>
            </div>

          </div>
        </div>
      : this.props.children;
  }
}

ApplicationErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ApplicationErrorBoundary;
