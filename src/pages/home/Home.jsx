import './home.scss';

import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from '@store/StoreContext';
import { setUser, setLogin } from '@store/appReducer';
import Page from "@pages/page-wrap/Page.jsx";

const Home = () => {
  const [loggedInMessageActive, setLoggedInMessageActive] = useState(false);
  const [globalState, globalDispatch] = useStore();
  const history = useHistory();
  const user = globalState?.user?.email || sessionStorage.getItem('_appUserEmail');

  useEffect(() => {
    if (sessionStorage.getItem('_appLogin') !== 'true') history.push("/"); // POC purposes
  });

  useEffect(() => {
    setTimeout(() => setLoggedInMessageActive(true), 100);
    setTimeout(() => setLoggedInMessageActive(false), 3000);
  }, [], loggedInMessageActive);

  return (
    <Page
      alert={{
        isActive:loggedInMessageActive,
        icon:"👍",
        copy:"You have been logged in. Good job."
      }}
    >
      <div className="home">

        <div className="home_heading">
          <h1 className="heading-1">Home</h1>

          <p>Welcome {user}</p>

          <button
            onClick={() => {
              globalDispatch(setLogin(false));
              globalDispatch(setUser({}));
            }}
            type="button"
            className="button"
          >
            Log Out.
          </button>
        </div>

      </div>
    </Page>
  );
};

export default Home;
