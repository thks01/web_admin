const express = require("express");
const app = express();
const port = 4000; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

const connection = require("./config/db");
const { connect } = require("./routes/user_inform");

//connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use("/", require("./router"));
// app.use("/login", require("./router"));

app.get("/userinfo", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/groupinfo", (req, res) => {
  const sql = "SELECT * FROM groups";
  connection.query(sql, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/predictioninfo", (req, res) => {
  const sql = "SELECT * FROM prediction";
  connection.query(sql, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/register", (req, res) => {
  res.send("<h1>등록 페이지</h1>");
});

app.get("/login", (req, res) => {
  res.send("<h1>빠잉</h1>");
});

app.post("/register", (req, res) => {
  const body = req.body;
  connection.query("SELECT COUNT(*) FROM users", (err, result) => {
    if (result) {
      const id = result[0]["COUNT(*)"] + 1;
      const groupNum = parseInt(result[0]["COUNT(*)"] / 4) + 1;

      connection.query(
        "INSERT INTO users (id, age, gender, eduBackground, degree, email, password, group_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          body.age,
          body.gender,
          body.eduBackground,
          body.degree,
          body.email,
          body.password,
          groupNum,
        ],
        (err, result) => {
          if (result) {
            connection.query(
              "INSERT INTO prediction (user_id, group_id) VALUES (?, ?)",
              [id, groupNum]
            );

            connection.query(
              "SELECT group_size FROM bitcoin.groups WHERE group_id = ?",
              [groupNum],
              (err, result) => {
                if (result) {
                  let group_size = result[0]["group_size"] + 1;
                  connection.query(
                    "UPDATE bitcoin.groups SET group_size = ? WHERE group_id = ?",
                    [group_size, groupNum]
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT u.email, g.group_type FROM bitcoin.users AS u JOIN bitcoin.groups AS g ON u.group_num = g.group_id WHERE u.email=? AND u.password=?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);
      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({ message: "실패" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`connect at http://localhost:${port} !!!`);
});
