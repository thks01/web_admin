import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MembersDecision({ loginStatus }) {
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");

  let body = {
    id: localStorage.getItem("ID"),
    test_num: localStorage.getItem("test_num"),
  };

  setInterval(() => {
    fetch("http://localhost:4000/membersdecision", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            if (res[i]["user_id"] === localStorage.getItem("ID")) {
              res.splice(i, 1);
            }
          }
          setMember1(res[0][`init_price_${body.test_num}`]);
          setMember2(res[1][`init_price_${body.test_num}`]);
          setMember3(res[2][`init_price_${body.test_num}`]);
          setMember4(res[3][`init_price_${body.test_num}`]);
        }
      });
  }, 1000);

  return (
    <div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        멤버 1의 예측값 : {member1}
      </div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        멤버 2의 예측값 : {member2}
      </div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        멤버 3의 예측값 : {member3}
      </div>
      <div style={{ border: "1px solid", padding: "10px" }}>
        멤버 4의 예측값 : {member4}
      </div>
    </div>
  );
}

export default MembersDecision;
