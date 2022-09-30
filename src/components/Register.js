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
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("male");
  const [EduBackground, setEduBackground] = useState("");
  const [Degree, setDegree] = useState("");
  const navigate = useNavigate();

  // handler 함수들
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
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

  const onAgeHandler = (event) => {
    setAge(event.currentTarget.value);
  };

  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };

  const onEduBackgroundHandler = (event) => {
    setEduBackground(event.currentTarget.value);
  };

  const onDegreeHandler = (event) => {
    setDegree(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인이 일치하지 않습니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      age: Age,
      gender: Gender,
      eduBackground: EduBackground,
      degree: Degree,
    };

    fetch("http://localhost:3001/register", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setEmail(body.email);
        setName(body.name);
        setPassword(body.password);
        setAge(body.age);
        setGender(body.gender);
        setEduBackground(body.eduBackground);
        setDegree(body.degree);
      });

    console.log(body);

    navigate("/");
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
    >
      <label>이메일</label>
      <input type="email" value={Email} onChange={onEmailHandler} />
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
      <label>나이</label>
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
      <input type="text" value={Degree} onChange={onDegreeHandler} />
      <button type="submit">회원 가입</button>
    </form>
  );
}

export default Register;
