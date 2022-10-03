import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BitcoinApi from "../components/BitcoinApi";

function Group1Page({ loginStatus }) {
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  if (localStorage.getItem("ID")) {
    let userinfo = localStorage.getItem("ID");
    return (
      <div>
        <h1>{userinfo} user id, 첫 번째 집단입니다.</h1>
        <button type="button" onClick={onClickLogout}>
          로그아웃
        </button>
        <BitcoinApi />
      </div>
    );
  }
}

export default Group1Page;
