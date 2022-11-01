import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RemainingTimeAndInitialPrice({ t, onNextPage }) {
  const [time, setTime] = useState(t);
  const [initialPrice, setInitialPrice] = useState();

  const onInitialPriceHandler = (event) => {
    setInitialPrice(event.currentTarget.value);

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      initialPrice: event.currentTarget.value,
      predTime: 180 - time,
    };

    fetch("http://localhost:4000/initialPrice", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    if (initialPrice === "") {
      return alert("가격을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      initialPrice: initialPrice,
      predTime: 180 - time,
    };

    fetch("http://localhost:4000/initialPrice", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        onNextPage();
      });

    //alert(`비밀번호는 ${password}입니다.`);

    //navigate("/");
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => prevTime - 1); // <-- Change this line!
    }, 1000);
    if (time >= 0) {
      return () => {
        window.clearInterval(timer);
      };
    } else {
      onNextPage();
    }
  }, []);

  return (
    <div>
      <p>
        Please suggest the price of a coin at which your team should sell within
        3 minutes
      </p>
      Remaining Time: {time}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Initial Price</label>
        <input
          type="text"
          value={initialPrice}
          onChange={onInitialPriceHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default RemainingTimeAndInitialPrice;
