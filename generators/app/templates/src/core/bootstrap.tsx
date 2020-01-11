import React from 'react';
import ReactDOM from 'react-dom';
import root from 'window-or-global';

import config from 'core/config';
import 'core/reset.css';
import * as serviceWorker from 'core/serviceWorker';

export default (
  App: React.FC,
  registerServiceWorker: boolean = false,
) => {
  root.console.log(config.packageName + ' version ' + config.packageVersion);
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker ? serviceWorker.register() : serviceWorker.unregister();
}
