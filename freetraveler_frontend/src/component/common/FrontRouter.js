import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FrontRouter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  //로그인 안되었을 때 접근 가능 영역
  const excludePath = ["/", "/login", "/register", "/post"];

  //로그인 시 접근 불가 영역
  const includePath = ["/login", "/register"];

  useEffect(() => {
    if (user === null) {
      if (!excludePath.includes(history.location.pathname)) {
        history.push("/login");
      }
    } else {
      if (includePath.includes(history.location.pathname)) {
        history.push("/");
      }
    }
  }, [history, location, user]);

  return <></>;
}
