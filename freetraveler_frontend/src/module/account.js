import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as accountAPI from "../lib/api/account";
import { takeLatest } from "redux-saga/effects";

const [GET_ACCOUNT, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAILURE] =
  createRequestActionTypes("account/GET_ACCOUNT");
const [CHANGE_ACCOUNT, CHANGE_ACCOUNT_SUCCESS, CHANGE_ACCOUNT_FAILURE] =
  createRequestActionTypes("account/CHANGE_ACCOUNT");

/*
요청을 위한 액션 타입을 payload로 설정합니다. (예: "sample/GET_POST")
*/

export const getAccount = createAction(GET_ACCOUNT, (data) => data);

export const changeAccount = createAction(CHANGE_ACCOUNT, (data) => data);

//사가 생성
const getAccountSaga = createRequestSaga(GET_ACCOUNT, accountAPI.getAccount);
const changeAccountSaga = createRequestSaga(
  CHANGE_ACCOUNT,
  accountAPI.changeAccount
);

export function* accountSaga() {
  yield takeLatest(GET_ACCOUNT, getAccountSaga);
  yield takeLatest(CHANGE_ACCOUNT, changeAccountSaga);
}

const initialState = {
  account: null,
  accountError: null,
};

const account = handleActions(
  {
    [GET_ACCOUNT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      account: data,
      accountError: null,
    }),
    [GET_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      account: null,
      accountError: error,
    }),
    [CHANGE_ACCOUNT_SUCCESS]: (state, { payload: data }) => ({
      ...state,
    }),
    [CHANGE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountError: error,
    }),
  },
  initialState
);

export default account;
