<script setup>
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

const router = useRouter();
const postStore = usePostStore();
const auth = useAuthStore();

const { posts } = storeToRefs(postStore);
const { fetchPosts } = postStore;
const isLoggedIn = computed(() => auth.isLoggedIn);

onMounted(async () => {
  await fetchPosts();
});

function goLogin() {
  router.push("/login");
}
function onLogout() {
  auth.logout();
  alert("로그아웃되었습니다.");
}
</script>

<template>
  <div class="page">
    <!-- 상단 공통 헤더 -->
    <header class="page-header">
      <h2 class="page-title">게시판</h2>
      <div class="page-actions">
        <template v-if="isLoggedIn">
          <span class="user-name">{{ auth.nickname }} 님</span>
          <button class="btn" @click="onLogout">로그아웃</button>
        </template>
        <template v-else>
          <button class="btn" @click="goLogin">로그인</button>
        </template>
      </div>
    </header>

    <!-- 글 작성 폼 (로그인 시 노출) -->
    <section v-if="isLoggedIn" class="section">
      <PostForm />
    </section>

    <!-- 목록 -->
    <section class="section">
      <PostList :posts="posts" />
    </section>

    <!-- 안내문 -->
    <p v-if="!isLoggedIn" class="hint">로그인 후 게시글을 작성할 수 있습니다.</p>
  </div>
</template>

<style scoped>
/* 공통 페이지 래핑 */
.page {
  max-width: 900px;
  margin: 56px auto;
  padding: 0 20px 60px;
  color: #f5f5f5;
}

/* 상단 헤더 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 14px;
  margin-bottom: 20px;
}
.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #ff3b3b;
}
.page-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.user-name {
  font-weight: 700;
  color: #e7e7e7;
}

/* 공통 섹션 카드 */
.section {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  margin-bottom: 18px;
}

/* 버튼(페이지 전용 보정) */
.btn {
  background-color: #ff3b3b;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.06s;
}
.btn:hover {
  background: #ff5b5b;
}
.btn:active {
  transform: translateY(1px);
}

/* 안내 */
.hint {
  color: #ff9b9b;
  margin-top: 12px;
}
</style>
