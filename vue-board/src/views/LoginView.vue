<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const id = ref("");
const pw = ref("");

function onLogin() {
  if (!id.value || !pw.value) {
    alert("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }
  const ok = auth.login(id.value, pw.value);
  if (ok) {
    alert(`${auth.nickname}님 로그인 성공!`);
    router.push("/");
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>로그인</h2>
      <form class="login-form" @submit.prevent="onLogin">
        <input v-model="id" placeholder="아이디" />
        <input v-model="pw" placeholder="비밀번호" type="password" />
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 전체 페이지 중앙 정렬 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 세로 화면 꽉 채움 */
  background-color: #1e1e1e;
}

/* 로그인 카드 */
.login-card {
  background-color: #2a2a2a;
  padding: 40px 32px;
  border-radius: 14px;
  box-shadow: 0 0 18px rgba(255, 59, 59, 0.25);
  width: 340px;
  text-align: center;
}

/* 제목 */
.login-card h2 {
  color: #ff3b3b;
  margin-bottom: 24px;
  font-weight: 800;
}

/* 폼 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-form input {
  background-color: #1e1e1e;
  color: #fff;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.login-form input::placeholder {
  color: #8e8e8e;
}

.login-form input:focus {
  border-color: #ff3b3b;
  box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
}

/* 버튼 */
.login-form button {
  background-color: #ff3b3b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  margin-top: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.06s;
}

.login-form button:hover {
  background-color: #ff5b5b;
}

.login-form button:active {
  transform: translateY(1px);
}
</style>
