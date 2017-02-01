import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from '../reducers';
import sagas from '../sagas';

export default function configureStore( initialState ) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware( sagaMiddleware, logger() ),
  );
  sagaMiddleware.run( sagas );
  return store;
}

