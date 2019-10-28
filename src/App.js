import React from 'react';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import ReduxStore from './ReduxStore'; //Import the store
import { AppRouter } from './routers/AppRouter';

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
});

const App = () => {
  const store = ReduxStore();
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Router>
          <AppRouter />
        </Router>
      </PersistGate>
    </Provider>
  );
};

App.displayName = App.name;

export default App;
