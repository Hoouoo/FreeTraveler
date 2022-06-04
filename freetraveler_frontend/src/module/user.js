import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/auth";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { setCookie, getCookie } from "../lib/cookie";

const TEMP_SET_USER = "user/TEMP_SET_USER"; // 새로고침 이후 임시 로그인 처리
//const LOGOUT = "auth/LOGOUT"; // 회원 로그아웃

// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("user/CHECK");

const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
  createRequestActionTypes("user/LOGOUT");

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT, (data) => data);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,

  logoutError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: user }) => {
      return { ...state, user: null };
    },
    [LOGOUT_SUCCESS]: (state) => {
      return {
        ...state,
        user: null,
      };
    },
    [LOGOUT_SUCCESS]: (state, { payload: data }) => {
      return {
        ...state,
        user: null,
      };
    },
    [LOGOUT_FAILURE]: (state, { payload: error }) => {
      return {
        ...state,
        logoutError: error,
      };
    },
  },
  initialState
);
