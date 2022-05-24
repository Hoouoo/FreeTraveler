import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { takeLatest } from "redux-saga/effects";

const CHANGE_FEILD = "auth/CHANGE_FEILD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const LOGOUT = "auth/LOGOUT";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(
  CHANGE_FEILD,
  ({ form, key, value }) => ({
    form, //register, login
    key, //username, password, passwordConfirm
    value, //실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register / login

export const register = createAction(
  REGISTER,
  ({ username, password, name }) => ({
    username,
    password,
    name,
  })
);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

//사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FEILD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, //폼 전환 시 회원 인증  에러 초기화
    }),
    //회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => {
      alert("회원가입 성공");
      return {
        ...state,
        auth,
      };
    },
    [REGISTER_FAILURE]: (state, { payload: error }) => {
      alert("회원가입 실패");
      return {
        ...state,
        authError: error,
      };
    },
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
    }),
  },
  initialState
);

export default auth;
