// 실제 기능을 담당하는 함수들의 모음
const mysql = require("../database/mapper.js");

// 실제 제공할 서비스 등록

// 전체조회
const findAll = async () => {
  let list = await mysql.query("selectboardList").catch((err) => {
    console.log(err);
    return { err: "DB조회중 오류발생" };
  });
  return list;
};

// 단건조회
const findByNo = async (boardNo) => {
  let list = await mysql
    .query("selectboardOne", boardNo)
    .catch((err) => console.log(err));
  // 배열로 온걸 꺼낸다.
  let info = list[0];
  return info;
};

// 등록
const createBoard = async (boardInfo) => {
  // insertData = [ title, writer, content, created_dt ]
  let insertData = getInsertInfo(boardInfo);
  let result = await mysql
    .query("boardInsert", insertData)
    .catch((err) => console.log(err));
  let resObj = {};
  if (result.insertId > 0) {
    // AUTO_INCREMENT가 적용된 PK값이 반환
    resObj = { result: true, bno: result.insertId };
  } else {
    resObj = { result: false };
  }
  return resObj;
};

function getInsertInfo(info) {
  let aray = [];
  aray.push(info.title);
  aray.push(info.writer);
  aray.push(info.content);
  aray.push(info.created_dt);
  return aray;
}

// 수정
const updateBoard = async (boardInfo, bno) => {
  let updateData = updateInfo(boardInfo, bno);
  let result = await mysql
    .query("boardUpdate", updateData)
    .catch((err) => console.log(err));
  // console.log(result);
  // result 예시
  // OkPacket { affectedRows: 1, insertId: 0, warningStatus: 0 }
  // affectedRows : 실행된 쿼리로 인해 영향을 받은 행(Row) 의 개수
  //                (INSERT 문 : 1 이상, UPDATE 문 : 0 이상, DELETE 문 : 0 이상)
  // insertId : INSERT 문 실행 시 생성된 AUTO_INCREMENT 기본키 값
  //            (INSERT 문이 아닌 경우에는 0 반환)
  // warningStatus : 쿼리 수행 중 발생한 경고(warning) 개수
  //                 (경고가 없는 경우에는 0 반환)
  let resObj = {};
  if (result.affectedRows > 0) {
    resObj = { result: true };
  } else {
    resObj = { result: false };
  }
  return resObj;
};

function updateInfo(boardInfo, bno) {
  let aray = [];
  let obj = {
    title: boardInfo.title,
    writer: boardInfo.writer,
    content: boardInfo.content,
    created_dt: boardInfo.created_dt,
  };
  aray.push(obj);
  aray.push(bno);
  return aray;
}

// 삭제

module.exports = { findAll, findByNo, createBoard, updateBoard };
