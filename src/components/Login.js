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

    fetch("http://localhost:4000/login", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          localStorage.setItem("ID", "");
          return alert("이메일 또는 비밀번호가 맞지 않습니다.");
        } else {
          localStorage.setItem("ID", res[0]["id"]);
          localStorage.setItem("group_type", res[0]["group_type"]);
          return res[0]["group_type"];
        }
      })
      .then((id) => {
        if (id) {
          navigate(`/survey`);
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
          <label htmlFor="input_id">Email : </label>
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
            login
          </button>
        </div>
      </form>
      <div>
        <Link to="/findemail">
          <button type="button">find email</button>
        </Link>
        <Link to="/findpassword">
          <button type="button">find password</button>
        </Link>
        <Link to="/register">
          <button type="button">register</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
