import coreConfig from 'core/config';

export default {
  ...coreConfig,
  title: process.env.REACT_APP_TITLE,
  description: process.env.REACT_APP_DESCRIPTION,
};
