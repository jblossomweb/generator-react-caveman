import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as knobs from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { composeStore, getInitialState } from 'core/store';
import rootReducer from 'app/store/rootReducer';
import Theme from 'app/theme';
import 'core/reset.css';

const { withKnobs } = knobs;
const store = composeStore(getInitialState(), rootReducer);

export interface KnobsInterface {
  text: (name: string, val: string) => string,
  number: (name: string, val: number) => number,
  date: (name: string, val: number) => number,
  boolean: (name: string, val: boolean) => boolean,
  object: (name: string, val: any) => any,
  select: (name: string, options: any, val: any) => any,
};

export type Scenario = (...args: any[]) => JSX.Element;

export interface Scenarios {
  [key: string]: Scenario
};

const noTemplate: React.FC = ({ children }) => (<div>{children}</div>);

export const storyBuilder = (
  scenarios: Scenarios,
  storyPath: string,
  pageTemplate?: React.FC<any>,
) => {
  const Template: React.FC = pageTemplate || noTemplate;
  const stories = storiesOf(storyPath, module);
  stories.addDecorator(withKnobs as any);

  Object.keys(scenarios).forEach(key => {
    stories.add(key, () => (
      <Theme>
        <Provider store={store}>
          <Router>
            <Template>
              <div>
                {scenarios[key](knobs)}
              </div>
            </Template>
          </Router>
        </Provider>
      </Theme>
    ))
  })
};
