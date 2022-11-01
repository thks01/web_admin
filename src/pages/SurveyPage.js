import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SurverPage({ loginStatus }) {
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("male");
  const [EduBackground, setEduBackground] = useState("");
  const [Degree, setDegree] = useState("");

  const navigate = useNavigate();

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

    if (Age === "") {
      return alert("나이를 입력해주세요.");
    } else if (EduBackground === "") {
      return alert("교육 배경을 입력해주세요.");
    } else if (Degree === "") {
      return alert("최종 학력을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      age: Age,
      gender: Gender,
      eduBackground: EduBackground,
      degree: Degree,
    };

    fetch("http://localhost:4000/survey", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(body);

    alert("설문이 완료되었습니다.");

    navigate("/notice");
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
    >
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
      <button type="submit">완료</button>
    </form>
  );
}

export default SurverPage;
