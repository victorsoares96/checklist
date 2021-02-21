import * as React from 'react';

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Typography } from '@material-ui/core';

/* User Routes */
import UserManage from '../pages/users/manage';
import UserCreate from '../pages/users/create';
import UserEdit from '../pages/users/edit';
import UserDetail from '../pages/users/detail';
import UnityCreate from '../pages/unities/create';
import UnityManage from '../pages/unities/manage';
import UnityDetail from '../pages/unities/detail';
import UnityEdit from '../pages/unities/edit';

/* Checklist Routes */
import CheckListManage from '../pages/Checklists/Manage';
import CheckListEdit from '../pages/Checklists/Edit';
import AvailableChecklists from '../pages/Checklists/Available';
import CreateAnswer from '../pages/Checklists/Answer/Create';
import ListAnswer from '../pages/Checklists/Answer/List';
import ChecklistResult from '../pages/Checklists/Result';
import ViewAnswer from '../pages/Checklists/Answer/View';
import ChecklistDetail from '../pages/Checklists/Detail';
import CheckListCreate from '../pages/Checklists/Create';
import PendingChecklists from '../pages/Checklists/Pending';

/* Other Routes */
import Dashboard from '../pages/dashboard';
import FAQPage from '../pages/faq';

/* Hook's */
import useAuth from '../utils/useAuth';

/* Handle Exception Pages */
import ErrorPage from '../shared/pages/Error';
import OfflinePage from '../shared/pages/Offline';
import Feedback from '../pages/Feedback';

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Switch>
      {
        (user.type !== 'comum' && user.type !== 'gerencial') && (
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        )
      }
      {
        (user.type !== 'comum' && user.type !== 'gerencial') && (
          <Route path="/relatorios">
            <Typography>Relatórios Works!</Typography>
          </Route>
        )
      }
      <Route path="/checklist">
        <Switch>
          <Route exact path='/checklist/manage/'>
            <CheckListManage />
          </Route>
          <Route exact path='/checklist/create/'>
            <CheckListCreate />
          </Route>
          <Route exact path='/checklist/detail/:checklistID'>
            <ChecklistDetail />
          </Route>
          <Route exact path='/checklist/edit/:checklistID'>
            <CheckListEdit />
          </Route>
          <Route exact path='/checklist/availables'>
            <AvailableChecklists />
          </Route>
          <Route exact path='/checklist/pending'>
            <PendingChecklists />
          </Route>
          <Route exact path='/checklist/answer/:checklistID/result'>
            <ChecklistResult />
          </Route>
          <Route exact path='/checklist/answer/:checklistID/:storageType'>
            <CreateAnswer />
          </Route>
          <Route exact path='/checklist/answereds'>
            <ListAnswer />
          </Route>
          <Route exact path='/checklist/answereds/:answeredChecklistID/view'>
            <ViewAnswer />
          </Route>
          <Route exact path='*'>
            <Redirect to="/checklist/manage" />
          </Route>
        </Switch>
      </Route>
      {
        user.type === 'admin' &&
          <Route path="/plano">
              <Switch>
                <Route exact path='/plano/manage/'>
                  <Typography>Plano Manage Works!</Typography>
                </Route>
                <Route exact path='/plano/create/'>
                  <Typography>Plano Create Works!</Typography>
                </Route>
                <Route exact path='/plano/edit/'>
                  <Typography>Plano Edit Works!</Typography>
                </Route>
                <Route exact path='*'>
                  <Redirect to="/plano/manage" />
                </Route>
              </Switch>
          </Route>
      }
      {
        (user.type !== 'comum' && user.type !== 'gerencial') &&
          <Route path="/users">
              <Switch>
                <Route exact path='/users/manage/'>
                  <UserManage />
                </Route>
                <Route exact path='/users/create/'>
                  <UserCreate />
                </Route>
                <Route exact path='/users/detail/:id'>
                  <UserDetail />
                </Route>
                <Route exact path='/users/edit/:id'>
                  <UserEdit />
                </Route>
                <Route exact path='*'>
                  <Redirect to="/users/manage" />
                </Route>
              </Switch>
          </Route>
      }
      {
        user.type === 'admin' &&
          <Route path="/unity">
              <Switch>
                <Route exact path='/unity/manage/'>
                  <UnityManage />
                </Route>
                <Route exact path='/unity/create/'>
                  <UnityCreate />
                </Route>
                <Route exact path='/unity/detail/:id'>
                  <UnityDetail />
                </Route>
                <Route exact path='/unity/edit/:id'>
                  <UnityEdit />
                </Route>
                <Route exact path='*'>
                  <Redirect to="/unity/manage" />
                </Route>
              </Switch>
          </Route>
      }
      <Route path="/error">
        <ErrorPage />
      </Route>
      <Route path="/offline">
        <OfflinePage />
      </Route>
      <Route path="/faq">
        <FAQPage />
      </Route>
      <Route path="/feedback">
        <Feedback />
      </Route>
      <Route path="*">
        {
          user.type !== 'comum' && user.type !== 'gerencial' ?
          <Redirect to="/dashboard" />
          : <Redirect to='/checklist/availables' />
        }
      </Route>
    </Switch>
  );
};

export default AppRoutes;