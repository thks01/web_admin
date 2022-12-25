import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Progress from "../components/Progress";

function ProgressPage({ setLoginStatus }) {
  const [infos, setInfos] = useState();

  const navigate = useNavigate();

  const onClickChangePage = () => {
    navigate(`/download`);
  };

  const onClickLoadInfos = () => {
    const body = {};
    //fetch("http://192.168.0.27:4000/predictioninfo", {
    fetch("http://localhost:4000/predictioninfo", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        let finalList = [];
        for (let i = 0; i < res.length; i++) {
          let curElement = res[i];
          let userId = curElement["user_id"];
          let progress = 0;
          for (const [key, value] of Object.entries(curElement)) {
            if (
              key.indexOf("init_price") != -1 ||
              key.indexOf("whether_to_change") != -1 ||
              key.indexOf("final_price") != -1
            ) {
              if (value != null) {
                progress += 1;
              }
            }
          }
          let curRes = [userId, progress, 30];
          finalList.push(curRes);
        }
        if (finalList) {
          let realFinalResult = [];
          for (let i = 0; i < finalList.length; i++) {
            let userId = finalList[i][0];
            let num = finalList[i][1];
            let maxNum = finalList[i][2];

            let res = (
              <Progress
                setLoginStatus={setLoginStatus}
                userId={userId}
                num={num}
                maxNum={maxNum}
              />
            );
            realFinalResult.push(res);
          }
          setInfos(realFinalResult);
        } else {
          alert("진행 상황이 없습니다!");
        }
      });
  };

  return (
    <div>
      <h1>Survey Progress Status</h1>
      <button type="button" onClick={onClickLoadInfos}>
        Loading informations
      </button>
      <button type="button" onClick={onClickChangePage}>
        Go to Download page
      </button>
      {infos}
    </div>
  );
}

export default ProgressPage;
