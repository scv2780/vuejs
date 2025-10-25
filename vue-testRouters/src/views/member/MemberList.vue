<script setup>
import { inject } from "vue";
import { RouterLink } from "vue-router";

const memberList = inject("memberList");
</script>

<template>
  <h1>회원 관리</h1>
  <nav id="breadcrumbs">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li>회원 리스트</li>
    </ul>
  </nav>

  <section>
    <h2>회원 리스트</h2>
    <p>신규등록은 <RouterLink v-bind:to="{ name: 'MemberAdd' }">여기</RouterLink>를 클릭</p>
    <ul>
      <li v-for="member in memberList" :key="member.id">
        <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: member.id } }">
          ID 가 {{ member.id }} 인 {{ member.name }} 님
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
