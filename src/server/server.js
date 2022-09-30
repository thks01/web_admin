const express = require("express");
const app = express();
const port = 4000; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //mysql의 id
  password: "gmlwls1014@!", //mysql의 password
  database: "bitcoin", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use("/", require("./router"));
// app.use("/login", require("./router"));

app.get("/", (req, res) => {
  res.send("<h1>서버입니다</h1>");
});

app.get("/register", (req, res) => {
  res.send("<h1>등록 페이지</h1>");
});

app.get("/login", (req, res) => {
  res.send("<h1>빠잉</h1>");
});

app.post("/register", (req, res) => {
  const age = req.body.age;
  const gender = req.body.gender;
  const eduBackground = req.body.eduBackground;
  const degree = req.body.degree;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  connection.query(
    "INSERT INTO infos (age, gender, eduBackground, degree, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [age, gender, eduBackground, degree, email, password],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        console.log("실패");
      } else {
        console.log("성공");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM infos WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong email / password combination" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`connect at http://localhost:${port} !!!`);
});
