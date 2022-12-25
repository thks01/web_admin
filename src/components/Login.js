import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setLoginStatus }) {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    let body = {
      email: inputId,
      password: inputPw,
    };

    fetch(
      //"http://192.168.0.27:4000/adminlogin",
      "http://localhost:4000/adminlogin",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          localStorage.setItem("ID", "");
          return alert("이메일 또는 비밀번호가 맞지 않습니다.");
        } else {
          localStorage.setItem("ID", res[0]["id"]);
          return res[0]["id"];
        }
      })
      .then((id) => {
        if (id) {
          navigate(`/download`);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          <label htmlFor="input_pw">PassWord : </label>
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
          />
        </div>
        <div>
          <button type="button" onClick={onClickLogin}>
            Login
          </button>
        </div>
      </form>
      <div>
        {/* <Link to="/findpassword">
          <button type="button">find password</button>
        </Link>
        <Link to="/register">
          <button type="button">register</button>
        </Link> */}
      </div>
    </div>
  );
}

export default Login;
