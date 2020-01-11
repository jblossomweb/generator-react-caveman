import { ConnectedRouter } from 'connected-react-router/immutable';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import getHistory from 'core/history';
import { composeStore, getInitialState } from 'core/store';

import rootReducer from 'app/store/rootReducer';
import Theme from 'app/theme';
import { redirects, routes } from './routes';

const store = composeStore(getInitialState(), rootReducer);

const App: React.FC = () => (
  <Theme>
    <Provider store={store}>
      <ConnectedRouter history={getHistory()}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              exact={true}
              path={route.path}
              component={route.page}
            />
          ))}
          {redirects.map((
            redirect,
            key,
          ) => (
            <Redirect
              key={key}
              exact={true}
              from={redirect.from || undefined}
              to={redirect.to}
            />
          ))}
        </Switch>
      </ConnectedRouter>
    </Provider>
  </Theme>
);

export default App;
