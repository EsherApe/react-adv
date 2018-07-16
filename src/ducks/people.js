import { appName } from "../config";
import { Record, List } from 'immutable';
import {put, call, takeEvery} from 'redux-saga/effects';
import {generateId} from "./utils";

//initial state
const ReducerState = Record({
  entities: new List([])
});

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
});

//constants
export const moduleName = 'people';
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

//reducer
export default function reducer(state = ReducerState(), action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', entities => entities.push(new PersonRecord(payload)));

    default:
      return state
  }
}

//action creators
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}

//side effects with saga
export const addPersonSaga = function *(action) {
  const id = yield call(generateId);

  yield put({
    type: ADD_PERSON,
    payload: {...action.payload, id}
  })
};

export const saga = function *() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
};