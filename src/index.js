import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './components/App/App';
import Spinner from 'components/common/Spinner/Spinner';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
