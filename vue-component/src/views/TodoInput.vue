<template>
  <slot name="header"></slot>
  <div>
    <input
      type="text"
      placeholder="새 할일을 입력하세요"
      v-model="newText"
      v-on:keyup.enter="addNewTodo"
    />
    <button v-on:click="addNewTodo">추가</button>
  </div>
  <slot></slot>
  <slot name="footer"></slot>
</template>

<script setup>
import { inject, ref, defineProps } from "vue";

defineProps({
  msg: String,
});

const newText = ref("초기값");
const addTodo = inject("addTodo");

const addNewTodo = () => {
  addTodo(newText.value);
};
</script>
