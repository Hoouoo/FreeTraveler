import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/post";
import { take, takeLatest } from "redux-saga/effects";
import { useHistory } from "react-router-dom";

const CHANGE_FEILD = "post/CHANGE_FEILD";
const INITIALIZE_FORM = "post/INITIALIZE_FORM";

const LOAD_MODBUFFER = "post/LOAD_MODBUFFER";
const CLEAR_MODBUFFER = "post/CLEAR_MODBUFFER";

const [POST, POST_SUCCESS, POST_FAILURE] =
  createRequestActionTypes("post/POST");

const [GET_POSTLIST, GET_POSTLIST_SUCCESS, GET_POSTLIST_FAILURE] =
  createRequestActionTypes("post/GET_POSTLIST");

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] =
  createRequestActionTypes("post/GET_POST");

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] =
  createRequestActionTypes("post/REMOVE_POST");

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
  modBuffer: {},

  postWrite: {},
  postRead: {},
  postList: {},
  posWritetError: null,
  postListError: null,
  postReadError: null,
  postRemoveError: null,
};

//액션 생성
export const post = createAction(POST, (data) => data);
export const getPostList = createAction(GET_POSTLIST, (data) => data);
export const getPost = createAction(GET_POST, (data) => data);
export const removePost = createAction(REMOVE_POST, (data) => data);

export const loadModBuffer = createAction(LOAD_MODBUFFER, (data) => data);
export const clearModBuffer = createAction(CLEAR_MODBUFFER, (data) => data);

//사가 생성
const postSaga = createRequestSaga(POST, postAPI.post);
const getPostListSaga = createRequestSaga(GET_POSTLIST, postAPI.getPostList);
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);
const removePostSaga = createRequestSaga(REMOVE_POST, postAPI.removePost);

export function* postingSaga() {
  yield takeLatest(POST, postSaga);
  yield takeLatest(GET_POSTLIST, getPostListSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
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
    [POST_SUCCESS]: (state, { payload: postWrite }) => {
      alert("포스팅 성공");
      return {
        ...state,
        posWritetError: null,
        postWrite,
      };
    },
    [POST_FAILURE]: (state, { payload: error }) => {
      alert("포스팅 실패");
      return {
        ...state,
        postWriteError: error,
      };
    },
    [GET_POSTLIST_SUCCESS]: (state, { payload: postList }) => ({
      ...state,
      postListError: null,
      postList,
    }),
    [GET_POSTLIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postListError: error,
    }),
    [GET_POST_SUCCESS]: (state, { payload: PostRead }) => ({
      ...state,
      postReadError: null,
      PostRead,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postReadError: error,
    }),
    [LOAD_MODBUFFER]: (state, { payload: data }) => ({
      ...state,
      modBuffer: data,
    }),
    [CLEAR_MODBUFFER]: (state, { payload: data }) => ({
      ...state,
      modBuffer: {},
    }),
    [REMOVE_POST_SUCCESS]: (state, { payload: data }) => {
      alert("삭제 성공");

      return {
        ...state,
      };
    },
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => {
      useHistory().push("/");
      alert("삭제 실패");
      return {
        ...state,
        postRemoveError: error,
      };
    },
  },
  initialState
);

export default posting;
