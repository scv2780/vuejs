require("dotenv").config({ path: "./database/dbConfig.env" });
console.log(process.env);
const express = require("express");
const app = express();
const port = 3000;

// 1. 미들웨어 영역
// body parser
// content-type : application/x-www-form-urlencoded 검색기능 만들때 필요
app.use(express.urlencoded({ extended: false }));
// content-type : application/json
app.use(express.json());

// 2. Server 실행
app.listen(port, () => {
  console.log("Sever Start");
  console.log(`http://localhost:${port}`);
});

// 3. 라우팅 영역
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const boardRouter = require("./routes/board_router.js");

app.use("/", boardRouter);
