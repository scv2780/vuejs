<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원리스트</RouterLink></li>
      <li>회원상세정보</li>
    </ul>
  </nav>

  <section>
    <h3>회원상세정보</h3>
    <dl>
      <dt>ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>이름</dt>
      <dd>{{ member.name }}</dd>
      <dt>메일</dt>
      <dd>{{ member.email }}</dd>
      <dt>포인트</dt>
      <dd>{{ member.phone }}</dd>
      <dt>비고</dt>
      <dd>{{ member.address }}</dd>
    </dl>
  </section>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const props = defineProps({ id: Number });
// const memberList = inject("memberList");
// const member = memberList.get(props.id);
const member = ref({});

axios
  .get(`http://localhost:3000/customers/${props.id}`)
  .then((res) => {
    console.log(res.data);
    member.value = res.data[0];
    console.log(member.value);
  })
  .catch((err) => {
    console.error(err);
  });
</script>
