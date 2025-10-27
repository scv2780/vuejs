<template>
  <div class="board-page">
    <h2>게시글 목록</h2>
    <ul>
      <li class="post-card" v-for="post in posts" :key="post.id">
        <h4>
          <RouterLink v-bind:to="{ name: 'ModifyView', params: { id: post.id } }">{{
            post.title
          }}</RouterLink>
        </h4>
        <p>{{ post.content }}</p>
        <span class="writer">작성자: {{ post.writer }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.board-page {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
  color: #1a1a1a;
}

.board-page h2 {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 25px;
  color: #111827;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.post-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
}

.post-card h4 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.post-card p {
  margin: 0 0 10px;
  color: #4b5563;
  line-height: 1.6;
}

.writer {
  font-size: 14px;
  color: #ccc;
  font-weight: 600;
}
</style>
