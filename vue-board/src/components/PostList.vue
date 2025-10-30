<template>
  <div class="list-wrap">
    <h3 class="list-title">게시글 목록</h3>
    <ul class="list-grid">
      <li class="post-card" v-for="post in posts" :key="post.id">
        <h4 class="post-title">
          <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
        </h4>
        <p class="post-content">{{ post.content }}</p>
        <span class="writer">작성자: {{ post.writer }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  posts: { type: Array, required: true },
});
</script>

<style scoped>
.list-wrap {
}
.list-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 14px;
  color: #ff3b3b;
}

/* 그리드 */
.list-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

/* 카드 */
.post-card {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    border-color 0.15s;
}
.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(255, 59, 59, 0.18);
  border-color: #ff3b3b55;
}

/* 텍스트 */
.post-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
}
.post-title a {
  color: #ffffff;
  text-decoration: none;
}
.post-title a:hover {
  color: #ffb3b3;
  text-decoration: underline;
}

.post-content {
  margin: 0 0 10px;
  color: #cfcfcf;
  line-height: 1.6;
}
.writer {
  font-size: 13px;
  color: #9aa0a6;
  font-weight: 600;
}

/* 반응형 */
@media (max-width: 640px) {
  .post-card {
    padding: 14px 16px;
  }
}
</style>
