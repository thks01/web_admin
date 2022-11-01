import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BitCoin from "../components/bitcoin-chart/src/BitCoin";
import BitcoinApi from "../components/BitcoinApi";
import CoinAndCash from "../components/CoinAndCash";
import MembersDecision from "../components/MembersDecision";
import RemainingTimeAndInitialPrice from "../components/RemainingTimeAndInitialPrice";

function Group1Page({ loginStatus }) {
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");
    navigate("/");
  };

  const onNextPage = (e) => {
    navigate("second");
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
        <MembersDecision />
        <BitcoinApi />
        <BitCoin />
        <RemainingTimeAndInitialPrice t={180} onNextPage={onNextPage} />
      </div>
    );
  }
}

export default Group1Page;
