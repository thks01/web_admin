import styled from "styled-components";

function ProgressBar({ userId, num, maxNum }) {
  const dealt = Math.floor((num / maxNum) * 100);

  //소수점 버리기
  //styled-component에서 해당 비율만큼 박스크기를 차지하게 하면 된다!!

  const Progress = styled.div`
    width: 150px;
    height: 30px;
    background-color: gray;
  `;
  const Dealt = styled.div`
    background-color: red;
    width: ${dealt}%;
    height: 100%;
  `;

  return (
    <div>
      <p>User Id : {userId}</p>
      <div>
        progress status : {dealt}%
        <Progress>
          <Dealt />
        </Progress>
      </div>
      <div style={{ height: 30, width: 100 }}></div>
    </div>
  );
}

export default ProgressBar;
