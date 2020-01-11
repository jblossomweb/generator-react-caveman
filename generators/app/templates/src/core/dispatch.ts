import { Dispatch, AnyAction } from 'redux';

export type ActionDispatch = Dispatch<AnyAction>;

export const mockDispatch: ActionDispatch = (
  action: AnyAction,
) => action.type;
