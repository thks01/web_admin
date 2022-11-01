import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BitCoin from "../components/bitcoin-chart/src/BitCoin";
import BitcoinApi from "../components/BitcoinApi";
import CoinAndCash from "../components/CoinAndCash";
import RemainingTimeAndFinalPrice from "../components/RemainingTimeAndFinalPrice";
import Suggestion from "../components/Suggestion";

function Group1SecondPage({ loginStatus }) {
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");
    navigate("/");
  };

  const onNextPage = (e) => {
    navigate(-1);
  };

  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  if (localStorage.getItem("ID")) {
    let userinfo = localStorage.getItem("ID");
    return (
      <div>
        <div style={{ border: "1px solid", padding: "10px" }}>
          Test Number : {localStorage.getItem("test_num")}
        </div>
        <h1>{userinfo} user id, 첫 번째 집단입니다.</h1>
        <button type="button" onClick={onClickLogout}>
          로그아웃
        </button>
        <CoinAndCash />
        <Suggestion />
        <BitcoinApi />
        <BitCoin />
        <RemainingTimeAndFinalPrice onNextPage={onNextPage} />
      </div>
    );
  }
}

export default Group1SecondPage;
