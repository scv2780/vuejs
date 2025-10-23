<template>
  <div id="myDIV" class="header">
    <h2 style="margin: 5px">My To Do List</h2>
    <input type="text" id="myInput" placeholder="Title..." v-model="title" />
    <span v-on:click="newElement()" class="addBtn">Add</span>
  </div>

  <ul id="myUL">
    <li
      v-for="[no, todo] in todoList"
      :key="no"
      v-bind:class="{ checked: todo.checked }"
      v-on:click="cancelTodo(no, todo)"
    >
      {{ todo.title }}<span v-on:click.stop="deleteTodo(no)" class="close">X</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive } from "vue";
// 변수.
const title = ref("");
const todoData = new Map();
todoData.set(1, { title: "Hit the gym", checked: false });
todoData.set(2, { title: "Pay bills", checked: false });
todoData.set(3, { title: "Meet George", checked: false });
todoData.set(4, { title: "Buy eggs", checked: false });
todoData.set(5, { title: "Read a book", checked: false });
todoData.set(6, { title: "Organize office", checked: false });

console.log(todoData.keys());
console.log(todoData.values());

const todoList = reactive(todoData);

//배열로 했을때 [] push, unshift, pop, shift => splice(idx, option):추가,수정,삭제 처리

// 추가.
const newElement = () => {
  const newNo = newNumber();
  todoList.set(newNo, title.value);
};

// 삭제.
const deleteTodo = (no) => {
  todoList.delete(no);
};

// 취소.
const cancelTodo = (no, todo) => {
  const { title, checked } = todo;
  todoList.set(no, { title, checked: !checked });
};

// 번호생성.
const newNumber = () => {
  let maxNo = 0;
  for (let k of todoList.keys()) {
    // console.log(k);
    if (maxNo < k) maxNo = k;
  }
  return maxNo + 1;
};
</script>

<style scoped>
body {
  margin: 0;
  min-width: 250px;
}

/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  color: black;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: "";
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
