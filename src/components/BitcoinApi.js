import React, { useEffect, useState } from "react";
//import "./App.scss";

function BitcoinApi() {
  const [loading, setLoading] = useState(true);

  const refreshPage = () => {
    window.location.reload();
  };

  // 데이터 담을 곳
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?quotes=KRW")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json.items.slice(0, 100)); // 가져온 데이터 1~100위 담기
        setLoading(false); // 로딩 멈추기
      });
  }, []);

  return (
    <div className="App">
      <section className="coin-tracker">
        <div className="title flex-grid flex-grid--center">
          <h1>암호화폐 실시간 TOP 100</h1>
          <div className="btn">
            <button onClick={refreshPage}>새로고침</button>
          </div>
        </div>
        <div className="result">
          {loading ? <span className="loader">Loading...</span> : coins}
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>종목</th>
                <th>기호</th>
                <th>가격(KRW)</th>
                <th>총 시가</th>
                <th>거래량(24H)</th>
                <th>변동(24H)</th>
                <th>변동(7D)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, idx) => (
                <tr key={idx}>
                  <td>{coin.rank}</td>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>
                    {Number(coin.quotes.KRW.price.toFixed(1)).toLocaleString()}
                  </td>
                  <td>
                    {(coin.quotes.KRW.market_cap / 1000000000000).toFixed(2)}T
                  </td>
                  <td>
                    {(coin.quotes.KRW.volume_24h / 1000000000000).toFixed(2)}T
                  </td>
                  <td>{coin.quotes.KRW.percent_change_24h.toFixed(2)}%</td>
                  <td>{coin.quotes.KRW.percent_change_7d.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default BitcoinApi;
