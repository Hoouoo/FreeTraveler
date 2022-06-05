import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as followAPI from "../lib/api/follow";
import { takeLatest } from "redux-saga/effects";

const [ADD_FOLLOW, ADD_FOLLOW_SUCCESS, ADD_FOLLOW_FAILURE] =
  createRequestActionTypes("follow/ADD_FOLLOW");
const [REMOVE_FOLLOW, REMOVE_FOLLOW_SUCCESS, REMOVE_FOLLOW_FAILURE] =
  createRequestActionTypes("follow//REMOVE_FOLLOW");
const [GET_FOLLOW_LIST, GET_FOLLOW_LIST_SUCCESS, GET_FOLLOW_LIST_FAILURE] =
  createRequestActionTypes("follow/GET_FOLLOW_LIST");

export const addFollow = createAction(ADD_FOLLOW, (data) => data);
export const removeFollow = createAction(REMOVE_FOLLOW, (data) => data);
export const getFollowList = createAction(GET_FOLLOW_LIST, (data) => data);

//사가 생성
const addFollowSaga = createRequestSaga(ADD_FOLLOW, followAPI.addFollow);
const removeFollowSaga = createRequestSaga(
  REMOVE_FOLLOW,
  followAPI.removeFollow
);
const getFollowListSaga = createRequestSaga(
  GET_FOLLOW_LIST,
  followAPI.followList
);

export function* followSaga() {
  yield takeLatest(ADD_FOLLOW, addFollowSaga);
  yield takeLatest(REMOVE_FOLLOW, removeFollowSaga);
  yield takeLatest(GET_FOLLOW_LIST, getFollowListSaga);
}

const initialState = {
  getFollow: null,
  getFollowError: null,

  removeFollow: null,
  removeFollowError: null,

  getFollowList: null,
  getFollowListError: null,
};

const follow = handleActions(
  {
    [ADD_FOLLOW_SUCCESS]: (state, { payload: data }) => {
      alert("친구 추가 성공");
      return {
        ...state,
        getFollow: data,
      };
    },
    [ADD_FOLLOW_FAILURE]: (state, { payload: error }) => {
      alert("친구 추가 실패");
      return {
        ...state,
        getFollowError: error,
      };
    },
    [REMOVE_FOLLOW_SUCCESS]: (state, { payload: data }) => {
      return {
        ...state,
        removeFollow: data,
      };
    },
    [REMOVE_FOLLOW_FAILURE]: (state, { payload: error }) => {
      alert("친구 삭제 실패");
      return {
        ...state,
        removeFollowError: error,
      };
    },
    [GET_FOLLOW_LIST_SUCCESS]: (state, { payload: data }) => {
      return {
        ...state,
        getFollowList: data,
      };
    },
    [GET_FOLLOW_LIST_FAILURE]: (state, { payload: error }) => {
      alert("친구 리스트 불러오기 실패");
      return {
        ...state,
        getFollowListError: error,
      };
    },
  },
  initialState
);

export default follow;
