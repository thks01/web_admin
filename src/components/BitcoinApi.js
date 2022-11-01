import React, { useEffect, useState } from "react";
//import "./App.scss";

function BitcoinApi() {
  const [loading, setLoading] = useState(true);

  const refreshPage = () => {
    window.location.reload();
  };

  // 데이터 담을 곳
  const [coins, setCoins] = useState([]);
  const [krw, setKrw] = useState();

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?quotes=KRW")
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        //setCoins(json[0]);
        //setKrw(json[0]["quotes"]["KRW"]);
        setCoins(json.slice(0, 1)); // 가져온 데이터 1~100위 담기
        setLoading(false); // 로딩 멈추기
      });
  }, []);

  return (
    <div className="App">
      <section className="coin-tracker">
        <div className="title flex-grid flex-grid--center">
          <h1>비트코인 실시간 시세</h1>
          <div className="btn">
            <button onClick={refreshPage}>새로고침</button>
          </div>
        </div>
        <div className="result">
          {loading ? <span className="loader">Loading...</span> : ""}
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
              {/* <tr>
                <td>{coins.rank}</td>
                <td>{coins.name}</td>
                <td>{coins.symbol}</td>
                <td>{krw.price}</td>
                <td>{Number(coins.quotes.KRW.price)}</td>
                <td>
                  {Number(coins.quotes.KRW.price.toFixed(1)).toLocaleString()}
                </td>
                <td>
                  {(coins.quotes.KRW.market_cap / 1000000000000).toFixed(2)}T
                </td>
                <td>
                  {(coins.quotes.KRW.volume_24h / 1000000000000).toFixed(2)}T
                </td>
                <td>{coins.quotes.KRW.percent_change_24h.toFixed(2)}%</td>
                <td>{coins.quotes.KRW.percent_change_7d.toFixed(2)}%</td>
              </tr> */}
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
