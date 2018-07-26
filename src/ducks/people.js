import { appName } from "../config";
import { Record, OrderedMap } from 'immutable';
import { put, call, take, all, fork, cancel, spawn, race } from 'redux-saga/effects';
import {delay, eventChannel} from 'redux-saga'
import { fbDataToEntities, generateId } from "./utils";
import { createSelector } from 'reselect';
import firebase from 'firebase';

//initial state
const ReducerState = Record({
  entities: new OrderedMap({})
});

const PersonRecord = Record({
  uid: null,
  id: null,
  firstName: null,
  lastName: null,
  email: null
});

//constants
export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const FETCH_ALL_PERSONS_REQUEST = `${prefix}/FETCH_ALL_PERSONS_REQUEST`;
export const FETCH_ALL_PERSONS_SUCCESS = `${prefix}/FETCH_ALL_PERSONS_SUCCESS`;
export const FETCH_ALL_PERSONS_ERROR = `${prefix}/FETCH_ALL_PERSONS_ERROR`;

//reducer
export default function reducer(state = ReducerState(), action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_ALL_PERSONS_SUCCESS:
      return state
        .set('entities', fbDataToEntities(payload, PersonRecord));
    default:
      return state
  }
}

//selectors
export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(stateSelector, state => state.entities);
export const personListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray());

//action creators
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}

export function fetchPersons() {
  return {
    type: FETCH_ALL_PERSONS_REQUEST
  }
}

//side effects with saga
export const addPersonSaga = function* () {

  while (true) {
    const action = yield take(ADD_PERSON_REQUEST);

    const id = generateId();
    const ref = firebase.database().ref(moduleName);

    try {
      yield call([ref, ref.push], {...action.payload, id});
      yield put({
        type: FETCH_ALL_PERSONS_REQUEST
      });
    } catch (error) {
      yield put({
        type: FETCH_ALL_PERSONS_ERROR
      });
    }
  }
};

export const fetchPersonsSaga = function* () {
  while (true) {
    yield take(FETCH_ALL_PERSONS_REQUEST);

    const ref = firebase.database().ref(moduleName);

    try {
      const data = yield call([ref, ref.once], 'value');

      yield put({
        type: FETCH_ALL_PERSONS_SUCCESS,
        payload: data.val()
      })
    } catch (error) {
      yield put({
        type: FETCH_ALL_PERSONS_ERROR,
        error
      })
    }
  }
};

//create chanel for people
const createPeopleSocket = () => eventChannel(emmit => {
  const ref = firebase.database().ref('people');
  const callback = data => emmit({data});
  ref.on('value', callback);

  return () => {
    console.log('canceled');
    ref.off('value', callback);
  }
});

//listen chanel for people and dispatch action to fetch data
export const realtimeSync = function* () {
  const chan = yield call(createPeopleSocket);
  try {
    while (true) {
      const {data} = yield take(chan);

      yield put({
        type: FETCH_ALL_PERSONS_SUCCESS,
        payload: data.val()
      })
    }
  } finally {
    yield call([chan, chan.close]);
    console.log('___', 'cancelled realtime saga');
  }
};

//cancel listening for people after some delay
export const cancellableSync = function* () {
  yield race({
    sync: realtimeSync(),
    delay: delay(10000)
  })
};

export const saga = function* () {
  yield spawn(cancellableSync);
  yield all([
    addPersonSaga(),
    fetchPersonsSaga()
  ]);
};