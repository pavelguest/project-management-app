import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './redux/store';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const store = setupStore();

root.render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>
);

reportWebVitals();
