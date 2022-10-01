import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log("click login");
    let body = {
      email: inputId,
      password: inputPw,
    };

    fetch("http://172.30.1.17:4000/login", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          setLoginStatus(res.message);
          return alert("아이디 또는 비밀번호가 맞지 않습니다.");
        } else {
          setLoginStatus(res[0]["email"]);
          navigate(`/group/${res[0]["group_type"]}`);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // navigate("/");
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  //  useEffect(
  //    () => {
  //      axios
  //        .get("/user_inform/login")
  //        .then((res) => console.log(res))
  //        .catch();
  //    },
  // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  //    []
  //  );

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input_id">ID : </label>
          <input
            type="text"
            name="input_id"
            value={inputId}
            onChange={handleInputId}
          />
        </div>
        <div>
          <label htmlFor="input_pw">PW : </label>
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
          />
        </div>
        <div>
          <button type="button" onClick={onClickLogin}>
            로그인
          </button>
        </div>
      </form>
      <div>
        <Link to="/register">
          <button type="button">회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
