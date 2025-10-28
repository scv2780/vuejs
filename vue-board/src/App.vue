<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
  background-color: #1e1e1e;
  color: #f5f5f5;
}

a {
  color: #ff3b3b;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #ff3b3b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #ff5b5b;
}

input,
textarea {
  background-color: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 100px;
}
</style>
