import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Page from "@pages/page-wrap/Page.jsx";

const NoRouteMatch = () => {
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem('_appLogin') !== 'true') history.push("/");
  });

  return (
    <Page>
      <div className="no-route-match">
        <h1 className="heading-1">Nothing matched...</h1>
      </div>
    </Page>
  );
};

export default NoRouteMatch;
