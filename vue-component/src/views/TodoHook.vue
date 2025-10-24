<template>
  <p>세로 {{ height }}, 가로 {{ width }}인 사각형 명전 {{ area }}</p>
  <button v-on:click="change">값변경</button>
</template>

<script setup>
import {
  ref,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
  // onBeforeCreate,
  // onCreated,
} from "vue";

const heightData = Math.round(Math.random() * 10);
const widthData = Math.round(Math.random() * 10);

const height = ref(heightData);
const width = ref(widthData);
const area = computed(() => {
  return height.value * width.value;
});
const change = () => {
  height.value = Math.round(Math.random() * 10);
  width.value = Math.round(Math.random() * 10);
};

onBeforeMount(() => {
  console.log(`onBeforeMount : ${height.value} * ${width.value}`);
});
onMounted(() => {
  console.log(`onMounted : ${height.value} * ${width.value}`);
});
onBeforeUpdate(() => {
  console.log(`onBeforeUpdate : ${height.value} * ${width.value}`);
});
onUpdated(() => {
  console.log(`onUpdated : ${height.value} * ${width.value}`);
});
onRenderTracked(() => {
  console.log(`onRenderTracked : ${height.value} * ${width.value}`);
});
onRenderTriggered(() => {
  console.log(`onRenderTriggered : ${height.value} * ${width.value}`);
});
// onBeforeCreate(() => {
//   console.log(`onBeforeCreate : ${height.value} * ${width.value}`);
// });
// onCreated(() => {
//   console.log(`onCreated : ${height.value} * ${width.value}`);
// });
</script>
