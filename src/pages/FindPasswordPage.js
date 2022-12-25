import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindPasswordPage() {
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    if (email === "") {
      return alert("이메일을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      email: email,
    };

    fetch(
      //"http://192.168.0.27:4000/findpassword",
      "http://localhost:4000/findpassword",
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
        if (res["message"]) {
          alert("유효하지 않은 이메일입니다.");
        }
        let password = res[0]["password"];
        alert(`비밀번호는 ${password}입니다.`);
      })
      .then((res) => {
        navigate("/");
      });

    //alert(`비밀번호는 ${password}입니다.`);

    //navigate("/");
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
    >
      <label>이메일</label>
      <input type="text" value={email} onChange={onEmailHandler} />
      <button type="submit">비밀번호 찾기</button>
    </form>
  );
}

export default FindPasswordPage;
