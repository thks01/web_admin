import { useState, useEffect, useRef } from "react";

function RemainingTimeAndFinalPrice({ onNextPage }) {
  const [firstTime, setFirstTime] = useState(10);
  const [finalTime, setFinalTime] = useState(5);

  const [finalPrice, setFinalPrice] = useState();
  const [whetherToChange, setWhetherToChange] = useState("NO");

  const inputRef = useRef(null);

  const onWhetherToChangeHandler = (event) => {
    setWhetherToChange(event.currentTarget.value);

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      whetherToChange: event.currentTarget.value,
      predTime: 60 - firstTime,
    };

    fetch("http://localhost:4000/whetherToChange", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const onFinalPriceHandler = (event) => {
    setFinalPrice(event.currentTarget.value);

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      finalPrice: event.currentTarget.value,
      predTime: 30 - finalTime,
    };

    fetch("http://localhost:4000/finalPrice", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const onWhetherToChangeSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    inputRef.current.disabled = false;
    inputRef.current.focus();

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      whetherToChange: whetherToChange,
      predTime: 60 - firstTime,
    };

    if (whetherToChange === "") {
      return alert("가격을 입력해주세요.");
    } else {
      setFirstTime(0);
      alert("응답이 기록되었습니다.");
    }

    fetch("http://localhost:4000/whetherToChange", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    //alert(`비밀번호는 ${password}입니다.`);

    //navigate("/");
  };

  const onFinalPriceSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      finalPrice: finalPrice,
      predTime: 30 - firstTime,
    };

    if (finalPrice === "") {
      return alert("가격을 입력해주세요.");
    } else {
      setFinalPrice(0);
      alert("응답이 기록되었습니다.");
    }

    fetch("http://localhost:4000/finalPrice", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        let modified_test_num = parseInt(localStorage.getItem("test_num")) + 1;
        localStorage.setItem("test_num", modified_test_num);
        onNextPage();
      });

    //alert(`비밀번호는 ${password}입니다.`);

    //navigate("/");
  };

  useEffect(() => {
    if (firstTime > 0) {
      const timerFirst = window.setInterval(() => {
        setFirstTime((prevTime) => prevTime - 1); // <-- Change this line!
      }, 1000);
      return () => {
        window.clearInterval(timerFirst);
      };
    } else {
      // onWhetherToChangeSubmitHandler();
      if (finalTime > 0) {
        const timerFinal = window.setInterval(() => {
          setFinalTime((prevTime) => prevTime - 1); // <-- Change this line!
        }, 1000);
        return () => {
          window.clearInterval(timerFinal);
        };
      } else if (finalTime == 0) {
        let modified_test_num = parseInt(localStorage.getItem("test_num")) + 1;
        localStorage.setItem("test_num", modified_test_num);
        onNextPage();
      }
    }
  }, [firstTime, finalTime]);

  return (
    <div>
      <p>
        You can change your initial price within a minute. Will you change your
        initial price?
      </p>
      Remaining Time: {firstTime}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onWhetherToChangeSubmitHandler}
      >
        <label>Whether To Change?</label>
        <select value={whetherToChange} onChange={onWhetherToChangeHandler}>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <p>You should enter your final price within 30 seconds.</p>
      Remaining Time: {finalTime}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onFinalPriceSubmitHandler}
      >
        <label>Final Price</label>
        <input
          diabled
          type="text"
          value={finalPrice}
          onChange={onFinalPriceHandler}
          ref={inputRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default RemainingTimeAndFinalPrice;
