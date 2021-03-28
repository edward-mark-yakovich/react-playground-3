import './page.scss';

import React from 'react';
import Alert from '@components/alert/Alert.jsx';
import LoaderIcon from '@components/loader-icon/LoaderIcon.jsx';
import CompanyMessage from '@components/company-message/CompanyMessage.jsx';

const Page = ({ alert, children }) => {
  return (
    <main className="page">
      <div className="page__inner">

        <LoaderIcon />

        {alert &&
          <Alert
            active={alert?.isActive || false}
            icon={alert?.icon || ''}
            copy={alert?.copy || ''}
          />
        }

        <section className="page__section grid">
          <aside className="page__sidebar">
            <div className="grid">

              <CompanyMessage />

            </div>
          </aside>

          <div className="page__content">
            {children}
          </div>
        </section>

      </div>
    </main>
  );
};

export default Page;
