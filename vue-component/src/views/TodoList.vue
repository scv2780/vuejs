<template>
  <h3>Todo List(provide/Inject)</h3>
  <TodoInput>
    <template v-slot:header>
      <h3>글등록header</h3>
    </template>
    <template v-slot:default>
      <h3>기본slot</h3>
    </template>
    <template v-slot:footer>
      <h3>글등록footer</h3>
    </template>
  </TodoInput>
  <ul>
    <TodoItemContainer v-for="todo in todos" :key="todo.id" v-bind:todo="todo" />
  </ul>
</template>

<script setup>
import { reactive, provide } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoItemContainer from "./TodoItemContainer.vue";

// 데이터.
let nextId = 3;
const todoData = [
  { id: 1, text: "Vue.js 이해하기", complted: false },
  { id: 2, text: "provide/Inject 처리", complted: true },
];
const todos = reactive(todoData);

// 함수.
const addTodo = (newText) => {
  if (newText.trim() == "") return;
  todos.push({ id: nextId++, text: newText, complted: false });
};
const toggleComplete = (id) => {
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.complted = !todo.complted;
  }
};
const removeTodo = (id) => {
  const idx = todos.findIndex((t) => t.id == id);
  todos.splice(idx, 1);
};

// provides..
provide("todos", todos);
provide("addTodo", addTodo);
provide("toggleComplete", toggleComplete);
provide("removeTodo", removeTodo);
</script>
