import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { registerUser } from "../../../_actions/user_action";

function Register() {
  // redux의 dispatch
  //const dispatch = useDispatch();

  // react hook에서 state 사용
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  //const [Age, setAge] = useState("");
  //const [Gender, setGender] = useState("male");
  //const [EduBackground, setEduBackground] = useState("");
  //const [Degree, setDegree] = useState("");
  const [isChecked, setIschecked] = useState(false);
  const [isRedundancy, setisRedundancy] = useState(false);

  const navigate = useNavigate();

  // handler 함수들
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    setIschecked(false);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  // const onAgeHandler = (event) => {
  //   setAge(event.currentTarget.value);
  // };

  // const onGenderHandler = (event) => {
  //   setGender(event.currentTarget.value);
  // };

  // const onEduBackgroundHandler = (event) => {
  //   setEduBackground(event.currentTarget.value);
  // };

  // const onDegreeHandler = (event) => {
  //   setDegree(event.currentTarget.value);
  // };

  const onEmailRedundancyCheck = (event) => {
    event.preventDefault();
    fetch(
      //"http://192.168.0.27:4000/userinfo"
      "http://localhost:4000/userinfo"
    )
      .then((response) => response.json())
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i]["email"] === Email) {
            setisRedundancy(true);
            return alert("이미 사용 중인 이메일입니다!");
          } else {
            setisRedundancy(false);
          }
        }
        if (!isRedundancy) alert("사용 가능한 이메일입니다!");
        setIschecked(true);
      });
  };

  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    if (Email === "") {
      return alert("이메일을 입력해주세요.");
    } else if (!isChecked) {
      return alert("이메일 중복 체크를 해주세요.");
    } else if (isRedundancy) {
      return alert("다른 이메일을 사용해주세요.");
    } else if (Name === "") {
      return alert("이름을 입력해주세요.");
    } else if (Password === "") {
      return alert("비밀번호를 입력해주세요.");
    } else if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인이 일치하지 않습니다.");
    }
    // } else if (Age === "") {
    //   return alert("나이를 입력해주세요.");
    // } else if (EduBackground === "") {
    //   return alert("교육 배경을 입력해주세요.");
    // } else if (Degree === "") {
    //   return alert("최종 학력을 입력해주세요.");
    // }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      // age: Age,
      // gender: Gender,
      // eduBackground: EduBackground,
      // degree: Degree,
    };

    fetch(
      //"http://192.168.0.27:4000/register",
      "http://localhost:4000/register",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log(body);

    alert("회원 가입이 완료되었습니다.");

    navigate("/");
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
    >
      <label>이메일</label>
      <input type="email" value={Email} onChange={onEmailHandler} />
      <button type="submit" onClick={onEmailRedundancyCheck}>
        이메일 중복 체크
      </button>
      <label>이름</label>
      <input type="text" value={Name} onChange={onNameHandler} />
      <label>비밀번호</label>
      <input type="password" value={Password} onChange={onPasswordHandler} />
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={ConfirmPassword}
        onChange={onConfirmPasswordHandler}
      />
      {/* <label>나이</label>
      <input
        type="number"
        value={Age}
        min="1"
        max="99"
        onChange={onAgeHandler}
      />
      <label>성별</label>
      <select value={Gender} onChange={onGenderHandler}>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
      <label>교육 배경</label>
      <input
        type="text"
        value={EduBackground}
        onChange={onEduBackgroundHandler}
      />
      <label>최종 학력</label>
      <input type="text" value={Degree} onChange={onDegreeHandler} /> */}
      <button type="submit">회원 가입</button>
    </form>
  );
}

export default Register;
