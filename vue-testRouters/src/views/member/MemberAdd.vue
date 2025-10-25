<script setup>
import axios from "axios";

const member = {
  id: null,
  name: "",
  password: "",
  phone: "",
  email: "",
  address: "",
};
const onAdd = () => {
  axios.post("http://localhost:3000/signup", {
    userid: member.id,
    name: member.name,
    password: member.password,
    phone: member.phone,
    email: member.email,
    address: member.address,
  });
};
</script>

<template>
  <h1>회원 관리</h1>
  <nav id="breadcrumbs">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원 리스트</RouterLink></li>
      <li>회원 정보 추가</li>
    </ul>
  </nav>

  <section>
    <h2>회원 정보 추가</h2>
    <p>정보를 입력하고 등록 버튼을 클릭해주세요</p>
    <form v-on:submit="onAdd">
      <dl>
        <dt><label for="addId">ID</label></dt>
        <dd><input type="text" id="addId" v-model.number="member.id" /></dd>
        <dt><label for="addName">이름</label></dt>
        <dd><input type="text" id="addName" v-model="member.name" /></dd>
        <dt><label for="addPassword">비밀번호</label></dt>
        <dd><input type="password" id="addPassword" v-model="member.password" /></dd>
        <dt><label for="addPhone">전화번호</label></dt>
        <dd><input type="text" id="addPhone" v-model="member.phone" /></dd>
        <dt><label for="addEmail">메일주소</label></dt>
        <dd><input type="email" id="addEmail" v-model="member.email" /></dd>
        <dt><label for="addAddress">주소</label></dt>
        <dd><input type="text" id="addAddress" v-model="member.address" /></dd>
      </dl>
      <button type="submit">등록</button>
    </form>
  </section>
</template>
