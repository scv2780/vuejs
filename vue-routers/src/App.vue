<script setup>
import { RouterView } from "vue-router";
import { provide, reactive } from "vue";
import axios from "axios";

// 요청서버: http://localhost:5173
// 제공서버: http://localhost:3000
axios
  .get("http://localhost:3000/customers")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

const memberList = new Map();
memberList.set(33456, {
  id: 33456,
  name: "김영희",
  email: "bow@email.com",
  points: 35,
  note: "신규가입특전",
});
memberList.set(47783, {
  id: 47783,
  name: "김철수",
  email: "mue@email.com",
  points: 53,
});

provide("memberList", reactive(memberList));
</script>

<template>
  <header>
    <h1>Vue 라우터 샘플</h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  border: blue 1px solid;
  padding: 10px;
}

#breadcrums ul li {
  display: inline;
  list-style: none;
}

#breadcrums {
  margin-left: 0;
}

#breadcrums ul {
  padding-left: 0;
}

#breadcrums ul .current {
  color: red;
}

#breadcrums ul li:before {
  content: " > ";
}

#breadcrums ul li:first-child:before {
  content: none;
}
</style>
