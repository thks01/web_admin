import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Suggestion({ loginStatus }) {
  const [suggestion, setSuggestion] = useState("0");

  let body = {
    id: localStorage.getItem("ID"),
  };

  // fetch("http://localhost:4000/coinandcash", {
  //   method: "post", // 통신방법
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then((response) => response.json())
  //   .then((res) => {
  //     if (res) {
  //       setCoin(res[0]["num_of_coins"]);
  //       setCash(res[0]["amount_of_cash"]);
  //     }
  //   });

  return (
    <div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        제안 값 : {suggestion}
      </div>
    </div>
  );
}

export default Suggestion;
