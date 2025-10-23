<template>
  <h1>컴포넌트 기초</h1>
  <p>{{ starName }}/ 별점: {{ starPoint }}</p>
  <button v-on:click="createStarPoint">임의값생성</button>
  <section>
    <h2>컴포넌트 1개</h2>
    <OneSection title="홍길동" content="반갑습니다" v-on:callStarPoint="createStarPoint" />
  </section>
  <section>
    <h2>컴포넌트 여러개</h2>
    <OneSection
      v-for="[no, item] in mapData"
      v-bind:key="no"
      v-bind:title="item.title"
      v-bind:content="item.content"
      v-on:callStarPoint="createStarPoint"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import OneSection from "../components/OneSection.vue";

const fName = ref("김길동");
const fContent = ref("Hello, World");
const starName = ref("초기값");
console.log(fName, fContent);

const mapData = new Map();
mapData.set(1, { title: "홍길동", content: "안녕하세요" });
mapData.set(2, { title: "김민교", content: "Hello" });
mapData.set(3, { title: "김상우", content: "Good Morning" });

const starPoint = ref(Math.ceil(Math.random() * 5));
const createStarPoint = (name) => {
  starPoint.value = Math.ceil(Math.random() * 5);
  starName.value = name;
};
</script>

<style>
section {
  border: green 1px solid;
  margin: 10px;
}
</style>
