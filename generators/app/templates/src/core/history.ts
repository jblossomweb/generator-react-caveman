import { createBrowserHistory, History } from 'history';

const history: History | null = null;

const getHistory: () => History = () => history ? history : createBrowserHistory();

export default getHistory;
