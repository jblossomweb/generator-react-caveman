import { AppState } from 'core/store';
import { createSelector } from 'reselect';
import * as DataTypes from './dataTypes';
import paths from './paths';

/*
 * getPathName
 */

const getPathNameSelector = (
  state: AppState,
): DataTypes.PathName => state.getIn(
  paths.pathName(),
  DataTypes.defaultPathName,
);

export const getPathName = createSelector([
  getPathNameSelector,
], (pathName: DataTypes.PathName) => pathName);

/*
 * getQueryParams
 */

const getQueryParamsSelector = (
  state: AppState,
): DataTypes.QueryParams => state.getIn(
  paths.queryParams(),
  DataTypes.defaultQueryParams,
);

export const getQueryParams = createSelector([
  getQueryParamsSelector,
], (queryParams: DataTypes.QueryParams) => queryParams);
