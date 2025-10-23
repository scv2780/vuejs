<script setup>
import { ref } from "vue";

const url = ref("#");
const hdTitle = "나의 첫 웹 페이지";
</script>

<template>
  <header>
    <h1>{{ hdTitle }}</h1>
    <p>HTML과 CSS로 만든 기본 구조</p>
  </header>
  <main>
    <h2>환영합니다!</h2>
    <p>이 페이지는 HTML과 CSS로 만들어졌으며, 기본적인 구조와 스타일을 포함하고 있습니다.</p>
    <h3>내용 예시</h3>
    <ul>
      <li>간단한 텍스트</li>
      <li>링크: <a v-bind:href="url">예시 사이트</a></li>
      <li>리스트 항목</li>
    </ul>
  </main>
</template>

<style>
body {
  background-color: rgb(241, 241, 241);
}

header {
  background-color: rgb(0, 153, 0);
  margin: 10px;
  padding: 10px;
}

header h1,
header p {
  color: white;
}

main {
  background-color: white;
  margin: 10px;
  padding: 10px;
}

main h2,
main p,
main h3,
main li {
  color: black;
}
</style>
