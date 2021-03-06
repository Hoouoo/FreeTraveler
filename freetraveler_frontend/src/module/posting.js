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

const SAVE_POST_INTEGRITY = "post/SAVE_POST_INTEGRITY";
const CLEAR_POST_INTEGRITY = "post/SAVE_POST_INTERGRITY";

const POST_CHECK_TRUE = "post/POSTING_CHECK_TRUE";
const POST_CHECK_FALSE = "post/POSTING_CHECK_FALSE";

const POST_REMOVE_CHECK_TRUE = "post/POST_REMOVE_CHECK_TRUE";
const POST_REMOVE_CHECK_FALSE = "post/POST_REMOVE_CHECK_FALSE";

const POSTLIST_CLEAR = "post/POSTLIST_CLEAR";

const [POST, POST_SUCCESS, POST_FAILURE] =
  createRequestActionTypes("post/POST");

const [GET_POSTLIST, GET_POSTLIST_SUCCESS, GET_POSTLIST_FAILURE] =
  createRequestActionTypes("post/GET_POSTLIST");

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] =
  createRequestActionTypes("post/GET_POST");

const GET_POST_CLEAR = "post/GET_POST_CLEAR";

const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] =
  createRequestActionTypes("post/REMOVE_POST");

const [MYPICK, MYPICK_SUCCESS, MYPICK_FAILURE] =
  createRequestActionTypes("post/MYPICK");

const [GOOD, GOOD_SUCCESS, GOOD_FAILURE] =
  createRequestActionTypes("post/GOOD");

const [GET_MODIFY_LIST, GET_MODIFY_LIST_SUCCESS, GET_MODIFY_LIST_FAILURE] =
  createRequestActionTypes("post/GET_MODIFY_LIST");

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

  postCheck: false,
  postRemoveCheck: false,

  postIntegrity: [[]],

  postMyPick: {},
  postMyPickError: null,

  postGood: {},
  postGoodError: null,

  modifyList: null,
  modifyListError: null,
};

//액션 생성
export const post = createAction(POST, (data) => data);
export const getPostList = createAction(GET_POSTLIST, (data) => data);
export const getPost = createAction(GET_POST, (data) => data);
export const removePost = createAction(REMOVE_POST, (data) => data);

export const loadModBuffer = createAction(LOAD_MODBUFFER, (data) => data);
export const clearModBuffer = createAction(CLEAR_MODBUFFER, (data) => data);

export const postCheckTrue = createAction(POST_CHECK_TRUE, (data) => data);
export const postCheckFalse = createAction(POST_CHECK_FALSE, (data) => data);

export const getModifyList = createAction(GET_MODIFY_LIST, (data) => data);

export const postRemoveCheckTrue = createAction(
  POST_REMOVE_CHECK_TRUE,
  (data) => data
);
export const postRemoveCheckFalse = createAction(
  POST_REMOVE_CHECK_FALSE,
  (data) => data
);

export const savePostIntegrity = createAction(
  SAVE_POST_INTEGRITY,
  (data) => data
);
export const clearPostIntegrity = createAction(
  CLEAR_POST_INTEGRITY,
  (data) => data
);

export const getPostClear = createAction(GET_POST_CLEAR, (data) => data);

export const good = createAction(GOOD, (data) => data);
export const mypick = createAction(MYPICK, (data) => data);

export const clearPostList = createAction(POSTLIST_CLEAR, (data) => data);

//사가 생성
const postSaga = createRequestSaga(POST, postAPI.post);
const getPostListSaga = createRequestSaga(GET_POSTLIST, postAPI.getPostList);
const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);
const removePostSaga = createRequestSaga(REMOVE_POST, postAPI.removePost);

const goodSaga = createRequestSaga(GOOD, postAPI.good);
const mypickSaga = createRequestSaga(MYPICK, postAPI.mypick);

const getModifyListSaga = createRequestSaga(
  GET_MODIFY_LIST,
  postAPI.getModifyList
);

export function* postingSaga() {
  yield takeLatest(POST, postSaga);
  yield takeLatest(GET_POSTLIST, getPostListSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
  yield takeLatest(GOOD, goodSaga);
  yield takeLatest(MYPICK, mypickSaga);
  yield takeLatest(GET_MODIFY_LIST, getModifyListSaga);
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
      return {
        ...state,
        posWritetError: null,
        postCheck: true,
        postWrite,
      };
    },
    [POST_FAILURE]: (state, { payload: error }) => {
      alert("포스팅 실패");
      return {
        ...state,
        postCheck: false,
        postWriteError: error,
      };
    },
    [POST_CHECK_TRUE]: (state, { payload: data }) => ({
      ...state,
      postCheck: true,
    }),
    [POST_CHECK_FALSE]: (state, { payload: data }) => ({
      ...state,
      postCheck: false,
    }),
    [GET_POSTLIST_SUCCESS]: (state, { payload: postList }) => ({
      ...state,
      postListError: null,
      postList,
    }),
    [GET_POSTLIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postListError: error,
    }),
    [GET_POST_SUCCESS]: (state, { payload: postRead }) => ({
      ...state,
      postReadError: null,
      postRead,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postReadError: error,
    }),
    [GET_POST_CLEAR]: (state, { payload: data }) => ({
      ...state,
      postRead: {},
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
        postRemoveCheck: true,
      };
    },
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => {
      alert("삭제 실패");
      return {
        ...state,
        postRemoveError: error,
        postRemoveCheck: false,
      };
    },
    [POST_REMOVE_CHECK_FALSE]: (state, { payload: data }) => ({
      ...state,
      postRemoveCheck: false,
    }),
    [SAVE_POST_INTEGRITY]: (state, { payload: data }) => {
      return {
        ...state,
        postIntegrity: data,
      };
    },
    [CLEAR_POST_INTEGRITY]: (state, { payload: data }) => {
      return {
        ...state,
        postIntegrity: [],
      };
    },
    [GOOD_SUCCESS]: (state, { payload: data }) => ({ ...state }),
    [GOOD_FAILURE]: (state, { payload: data }) => ({ ...state }),
    [MYPICK_SUCCESS]: (state, { payload: data }) => ({ ...state }),
    [MYPICK_FAILURE]: (state, { payload: data }) => ({ ...state }),

    [POSTLIST_CLEAR]: (state, { payload: data }) => ({
      ...state,
      postList: "",
    }),
    [GET_MODIFY_LIST_SUCCESS]: (state, { payload: data }) => {
      return { ...state, modifyList: data, modifyListError: null };
    },
    [GET_MODIFY_LIST_FAILURE]: (state, { payload: error }) => {
      return { ...state, modifyList: null, modifyListError: error };
    },
  },
  initialState
);

export default posting;
