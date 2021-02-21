import * as React from 'react';
import { Typography } from '@material-ui/core';
import {
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Login from '../pages/login';
import SessionExpire from '../shared/pages/SessionExpired';
import OfflinePage from '../shared/pages/Offline';

const AuthRoutes = () => (
    <Switch>
      <Route path="/forgotpassword">
        <Typography>Forgot Password Work's!</Typography>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/expire">
        <SessionExpire />
      </Route>
      <Route path="/offline">
        <OfflinePage />
      </Route>
      <Route path='*'>
        <Redirect to="/login" />
      </Route>
    </Switch>
);

export default AuthRoutes;