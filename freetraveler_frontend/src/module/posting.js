import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";
import { takeLatest } from "redux-saga/effects";

const CHANGE_FEILD = "post/CHANGE_FEILD";
const INITIALIZE_FORM = "post/INITIALIZE_FORM";

const ADD_FORM = "post/ADD_FORM";
const REMOVE_FORM = "post/REMOVE_FORM";

const [POST, POST_SUCCESS, POST_FAILURE] =
  createRequestActionTypes("post/POST");

export const changeField = createAction(
  CHANGE_FEILD,
  ({ form, key, value }) => ({
    form, //register, login
    key, //username, password, passwordConfirm
    value, //실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register / login

const initialState = {
  wpost: {},
  post: {},
  meta: {},
};

export const post = createAction(POST, (data) => data);

//사가 생성
const postSaga = createRequestSaga(POST, postAPI.post);
export function* postingSaga() {
  yield takeLatest(POST, postSaga);
}

const posting = handleActions(
  {
    [CHANGE_FEILD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      postError: null, //폼 전환 시 회원 인증  에러 초기화
    }),
    [POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      postError: null,
      post,
    }),
    [POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default post;
