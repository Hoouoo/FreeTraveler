import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAccount } from "../../module/account";

const ProfileTemplate = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: -10px;
`;
const ProfileForm = styled.form``;
const ProfileTitle = styled.div`
  font-weight: bold;
`;
const ProfileInput = styled.input``;
const ProfileButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color: red;
  padding: 0.6rem;
  border-radius: 0.3rem;
`;

export default function AccountContainer() {
  const { data } = useSelector((account) => ({ data: account.account }));
  const dispatch = useDispatch();

  //사용자 정보 요청
  useEffect(() => {
    dispatch(getAccount());
  }, []);

  //사용자 정보 렌더링
  useEffect(() => {
    const accountIdInput = document.getElementById("account_id");
    const accountNameInput = document.getElementById("account_name");
    // const accountOldPasswordInput = document.getElementById(
    //   "account_old_password"
    // );
    // const accountNewPasswordInput = document.getElementById(
    //   "accout_new_password"
    // );
    // const accountNewPasswordConfirmInput = document.getElementById(
    //   "account_new_password_confirm"
    // );
    if (data != null) {
      accountIdInput.value = data.userId;
      accountNameInput.value = data.name;
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ProfileTemplate>
      <ProfileForm onSubmit={onSubmit}>
        <ProfileTitle>Account</ProfileTitle>
        아이디 : <ProfileInput id="account_id" disabled /> <br />
        이름 : <ProfileInput id="account_name" /> <br />
        이전 비밀번호 : <ProfileInput id="account_old_password" /> <br />
        새 비밀번호 : <ProfileInput id="account_new_password" /> <br />
        비밀번호 확인 : <ProfileInput id="account_new_password_confirm" />
        <br />
        <ProfileButton>수정하기</ProfileButton>
      </ProfileForm>
    </ProfileTemplate>
  );
}
