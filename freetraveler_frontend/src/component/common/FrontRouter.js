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

  const excludePath = ["/", "/login", "/register"];

  useEffect(() => {
    if (user === null) {
      if (!excludePath.includes(history.location.pathname)) {
        history.push("/");
      }
    }
  }, [history, location]);

  return <></>;
}
