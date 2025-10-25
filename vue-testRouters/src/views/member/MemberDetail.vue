<script setup>
import { inject } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const memberId = route.params.id;

const memberList = inject("memberList");
const member = memberList.value.find((m) => m.id === Number(memberId));
</script>

<template>
  <h1>회원 관리</h1>
  <nav id="breadcrumbs">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원 리스트</RouterLink></li>
      <li>회원 상세 정보</li>
    </ul>
  </nav>

  <section>
    <h2>회원 상세 정보</h2>
    <dl>
      <dt>ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>이름</dt>
      <dd>{{ member.name }}</dd>
      <dt>전화번호</dt>
      <dd>{{ member.phone }}</dd>
      <dt>메일주소</dt>
      <dd>{{ member.email }}</dd>
      <dt>주소</dt>
      <dd>{{ member.address }}</dd>
    </dl>
  </section>
</template>
