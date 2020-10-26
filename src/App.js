import React from 'react';
import {Provider} from 'react-redux';
import {store} from "./store";
import ReactJoyride, { STATUS } from 'react-joyride';
import AppRouter from './AppRouter';
import HttpsRedirect from 'react-https-redirect';

import './App.scss';

function App() {

  return (
    <div>
      <HttpsRedirect>
        <Provider store={store}>
          <AppRouter/>
        </Provider>
      </HttpsRedirect>
    </div>
  );
}

export default App;
