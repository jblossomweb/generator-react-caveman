import { configure } from '@storybook/react';

// import stories ending in *.stories.ts
const req = require.context('../src', true, /stories.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
