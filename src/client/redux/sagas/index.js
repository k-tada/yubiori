import { fork } from 'redux-saga/effects';

function* test() {
  console.log( 'saga start' );
}

export default function* rootSaga() {
  yield fork( test );
}

