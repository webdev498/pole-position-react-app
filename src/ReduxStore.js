import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { RootReducer } from './reducers'; //Import the reducer
import { RootSaga } from '@sagas';
import { migrations } from '@migrations'

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'business', 'viewLayout'],
  version: 1,
  migrate: createMigrate(migrations, { debug: false }),
  storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(RootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
};
