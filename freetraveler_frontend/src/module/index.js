import { getAllByTitle } from "@testing-library/react";
import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import { all } from "redux-saga/effects";
import { userSaga } from "./user";
import user from "./user";
import post, { postingSaga } from "./posting";
import account, { accountSaga } from "./account";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  post,
  account,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), postingSaga(), accountSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
