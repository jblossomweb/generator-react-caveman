import { createSelector } from 'reselect';
import { AppState } from 'core/store';

import * as DataTypes from './dataTypes';
import paths from './paths';

<% storeProps.forEach(({
  propName,
  upperCasePropName,
  propType,
}) => { -%>
/*
 * get<%= upperCasePropName %>
 */

const get<%= upperCasePropName %>Selector = (
  state: AppState,
): DataTypes.<%= upperCasePropName %> => state.get('app').getIn(
  paths.<%= propName %>(),
  DataTypes.default<%= upperCasePropName %>,
);

export const get<%= upperCasePropName %> = createSelector([
  get<%= upperCasePropName %>Selector,
], (<%= propName %>: DataTypes.<%= upperCasePropName %>) => <%= propName %>);

<% }); -%>
