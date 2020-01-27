import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
// import { defaultRest } from 'core/rest/utils';
import config from 'app/config';

// import SomeService from 'app/services/some';
// import * as SomeServiceTypes from 'app/services/some/types';

// import * as someActions from 'app/store/some/action/creators';
// import * as someSelectors from 'app/store/some/selectors';

import HomePage, { DispatchProps } from './HomePage';

const imgSrc: string = `${config.publicUrl}/logo512.png`;

// const someApiBase: string = config.services.some.url!;

// const liveService = new SomeService(
//   someApiBase,
//   defaultRest,
// );

export const mapStateToProps = (
  state: AppState,
) => ({
  imgSrc,
});

export const mapDispatchToProps = (
  // someService: SomeServiceTypes.ServiceInterface,
) => (
  dispatch: Dispatch<AnyAction>,
): DispatchProps => ({
  // doSomething: () => dispatch(
  //   someActions.doSomething(someService)(dispatch),
  // ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(
    // liveService,
  ),
)(withImmutablePropsToJS(
  HomePage,
) as any);
