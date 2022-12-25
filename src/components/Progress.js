import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Link, useNavigate } from "react-router-dom";

function Progress({ setLoginStatus, userId, num, maxNum }) {
  return <ProgressBar userId={userId} num={num} maxNum={maxNum} />;
}

export default Progress;
