<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원리스트</RouterLink></li>
      <li>회원정보추가</li>
    </ul>
  </nav>

  <section>
    <h3>회원정보추가</h3>
    <p>회원정보를 입력하고 추가버튼을 클릭하세요.</p>
    <form v-on:submit.prevent="onAdd">
      <dl>
        <dt><label for="">ID</label></dt>
        <dd><input type="number" v-model.number="customers.id" /></dd>
        <dt><label for="">이름</label></dt>
        <dd><input type="text" v-model="customers.name" /></dd>
        <dt><label for="">이메일</label></dt>
        <dd><input type="email" v-model="customers.email" /></dd>
        <dt><label for="">포인트</label></dt>
        <dd><input type="number" v-model.number="customers.phone" /></dd>
        <dt><label for="">비고</label></dt>
        <dd><input type="text" v-model="customers.address" /></dd>
      </dl>
      <button type="submit">추가</button>
    </form>
  </section>
</template>

<script setup>
// import { reactive, inject } from "vue";
import { ref } from "vue";
// import { useRouter } from "vue-router";
import axios from "axios";

// const router = useRouter(); // 라우터객체.
const customers = ref({});

// axios.post로 추가 만들어보기
axios
  .post("/customer", {
    id: customers.value.id,
    name: customers.value.name,
    email: customers.value.email,
    phone: customers.value.phone,
    address: customers.value.address,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const onAdd = () => {
  customers.value.push({
    id: customers.value.id,
    name: customers.value.name,
    email: customers.value.email,
    phone: customers.value.phone,
    address: customers.value.address,
  }); // useRouter: .push 페이지 이동
};

// data.
// const member = reactive({
//   id: 0,
//   name: "",
//   email: "",
//   points: 0,
//   note: "",
// });
// const memberList = inject("memberList");

// 함수.
// const onAdd = () => {
//   memberList.set(member.id, member);
//   // 목록이동.
//   router.push({ name: "MemberList" }); // useRouter: .push 페이지 이동
// };
</script>
