import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

function Download({ setLoginStatus }) {
  const [userInfoPath, setUserInfoPath] = useState("");
  const [groupInfoPath, setGroupInfoPath] = useState("");
  const [predictionInfoPath, setPredictionInfoPath] = useState("");
  const [bitcoinInfoPath, setBitcoinInfoPath] = useState("");

  const [userInfo, setUserInfo] = useState("");
  const [groupInfo, setGroupInfo] = useState("");
  const [predictionInfo, setPredictionInfo] = useState("");
  const [bitcoinInfo, setBitcoinInfo] = useState("");

  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleUserInfoPath = (e) => {
    setUserInfoPath(e.target.value);
  };

  const handleGroupInfoPath = (e) => {
    setGroupInfoPath(e.target.value);
  };

  const handlePredictionInfoPath = (e) => {
    setPredictionInfoPath(e.target.value);
  };

  const handleBitcoinInfoPath = (e) => {
    setBitcoinInfoPath(e.target.value);
  };

  const onClickUserInfo = () => {
    let body = {
      path: userInfoPath,
    };
    //fetch("http://192.168.0.27:4000/userinfo", {
    fetch("http://localhost:4000/userinfo", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        setUserInfo(res);
        if (res) {
          return alert("정보를 성공적으로 불러왔습니다.");
        } else {
          return alert("정보를 불러오지 못했습니다.");
        }
      });
  };

  const onClickUserInfoDownload = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(userInfo)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    if (userInfoPath) {
      link.download = userInfoPath;
    } else {
      link.download = "userinfos.json";
    }

    link.click();
  };

  const onClickGroupInfo = () => {
    let body = {
      path: groupInfoPath,
    };
    // fetch("http://192.168.0.27:4000/groupinfo", {
    fetch("http://localhost:4000/groupinfo", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        setGroupInfo(res);
        if (res) {
          return alert("정보를 성공적으로 불러왔습니다.");
        } else {
          return alert("정보를 불러오지 못했습니다.");
        }
      });
  };

  const onClickGroupInfoDownload = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(groupInfo)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    if (groupInfoPath) {
      link.download = groupInfoPath;
    } else {
      link.download = "groupinfos.json";
    }

    link.click();
  };

  const onClickPredictionInfo = () => {
    let body = {
      path: predictionInfoPath,
    };

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
        setPredictionInfo(res);
        if (res) {
          return alert("정보를 성공적으로 불러왔습니다.");
        } else {
          return alert("정보를 불러오지 못했습니다.");
        }
      });
  };

  const onClickPredictionInfoDownload = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(predictionInfo)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    if (predictionInfoPath) {
      link.download = predictionInfoPath;
    } else {
      link.download = "predictioninfos.json";
    }

    link.click();
  };

  const onClickBitcoinInfo = () => {
    let body = {
      path: bitcoinInfoPath,
    };

    //fetch("http://192.168.0.27:4000/bitcoininfo", {
    fetch("http://localhost:4000/bitcoininfo", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        setBitcoinInfo(res);
        if (res) {
          return alert("정보를 성공적으로 불러왔습니다.");
        } else {
          return alert("정보를 불러오지 못했습니다.");
        }
      });
  };

  const onClickBitcoinInfoDownload = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(bitcoinInfo)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    if (bitcoinInfoPath) {
      link.download = bitcoinInfoPath;
    } else {
      link.download = "bitcoininfos.json";
    }

    link.click();
  };

  const onClickChangePage = () => {
    navigate(`/progress`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Save</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userinfo">File name : </label>
          <input
            type="text"
            name="userinfo"
            value={userInfoPath}
            onChange={handleUserInfoPath}
          />
        </div>
        <div>
          <button type="button" onClick={onClickUserInfo}>
            Load user infos
          </button>
          <button type="button" onClick={onClickUserInfoDownload}>
            Download user infos
          </button>
        </div>
        <div style={{ height: 30, width: 100 }}></div>
        <div>
          <label htmlFor="groupinfo">File name : </label>
          <input
            type="text"
            name="groupinfo"
            value={groupInfoPath}
            onChange={handleGroupInfoPath}
          />
        </div>
        <div>
          <button type="button" onClick={onClickGroupInfo}>
            Load group infos
          </button>
          <button type="button" onClick={onClickGroupInfoDownload}>
            Download group infos
          </button>
        </div>
        <div style={{ height: 30, width: 100 }}></div>
        <div>
          <label htmlFor="predictioninfo">File name : </label>
          <input
            type="text"
            name="predictioninfo"
            value={predictionInfoPath}
            onChange={handlePredictionInfoPath}
          />
        </div>
        <div>
          <button type="button" onClick={onClickPredictionInfo}>
            Load prediction infos
          </button>
          <button type="button" onClick={onClickPredictionInfoDownload}>
            Download prediction infos
          </button>
        </div>
        <div style={{ height: 30, width: 100 }}></div>
        <div>
          <label htmlFor="bitcoininfo">File name : </label>
          <input
            type="text"
            name="bitcoininfo"
            value={bitcoinInfoPath}
            onChange={handleBitcoinInfoPath}
          />
        </div>
        <div>
          <button type="button" onClick={onClickBitcoinInfo}>
            Load bitcoin infos
          </button>
          <button type="button" onClick={onClickBitcoinInfoDownload}>
            Download bitcoin infos
          </button>
        </div>
        <div style={{ height: 60, width: 100 }}></div>
        <button type="button" onClick={onClickChangePage}>
          Go to Progress rate page
        </button>
      </form>
    </div>
  );
}

export default Download;
