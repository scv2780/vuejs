<template>
  <p>이름: <input type="text" v-model="firendInfo.name" /></p>
  <p>나이: <input type="number" v-model="firendInfo.age" /></p>
  <button v-on:click="addfriend">친구추가</button>
  <h3>{{ tiele }}</h3>
  <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="friend in friends" v-bind:key="friend.name">
        <td>{{ friend.name }}</td>
        <td>{{ friend.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive } from "vue";

// Data.
const friends = reactive([
  { name: "홍길동", age: 20 },
  { name: "김민식", age: 21 },
]);
const firendInfo = reactive({
  name: "",
  age: 20,
});

// const addfriend = () => {
//   friends.push({ name: friendName.value, age: friendAge.value });
// };

const addfriend = () => {
  console.log(firendInfo.name);
  const obj = { name: firendInfo.name, age: firendInfo.age };
  friends.push(obj);
};
</script>
