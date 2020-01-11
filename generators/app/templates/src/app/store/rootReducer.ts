import { AppReducers, combineAllReducers } from 'core/store';
import extend from 'lodash/extend';

/* import your reducers here. */

const appReducers: AppReducers = extend({},
  /* register your reducers here. */
) as AppReducers;

export default combineAllReducers(appReducers);
