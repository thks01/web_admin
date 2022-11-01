import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CoinAndCash({ loginStatus }) {
  const [coin, setCoin] = useState("");
  const [cash, setCash] = useState("");

  let body = {
    id: localStorage.getItem("ID"),
  };

  fetch("http://localhost:4000/coinandcash", {
    method: "post", // 통신방법
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res) {
        setCoin(res[0]["num_of_coins"]);
        setCash(res[0]["amount_of_cash"]);
      }
    });
  return (
    <div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        남은 코인 : {coin}
      </div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        현재 보유 중인 금액 : {cash}
      </div>
    </div>
  );
}

export default CoinAndCash;
