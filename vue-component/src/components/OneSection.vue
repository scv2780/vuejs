<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "안녕하세요",
  },
});
const emit = defineEmits(["callStarPoint"]);

const onClick = (e) => {
  emit("callStarPoint", e.target.parentElement.parentElement.children[0].innerText);
};
</script>

<template>
  <section class="box">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p><button v-on:click="onClick">자식컴포넌트에서 임의값 생성</button></p>
  </section>
</template>

<style scoped>
section {
  border: green 1px dashed;
  margin: 10px;
}
</style>
