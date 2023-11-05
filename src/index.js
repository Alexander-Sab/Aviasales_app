import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'normalize.css';

import store from './store';
import App from './components/App';

import './index.scss';

const root = createRoot(document.getElementById('Aviasales'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
