import Immutable from 'immutable';

export type PathName = string;
export const defaultPathName = '';
export const examplePathName = '/somewhere';

export type QueryParams = Immutable.Map<string, string>;
export const defaultQueryParams = Immutable.Map();
export const exampleQueryParams = Immutable.Map({ foo: 'bar' });
