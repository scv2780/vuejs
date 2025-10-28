<template>
  <div class="modify-page">
    <!-- 헤더 -->
    <header class="page-header">
      <h3>게시글 수정</h3>
      <RouterLink to="/" class="back-link">← 목록으로</RouterLink>
    </header>

    <!-- 본문 -->
    <div v-if="post" class="form-section">
      <div class="form-group">
        <label>제목</label>
        <input type="text" v-model="post.title" />
      </div>

      <div class="form-group">
        <label>내용</label>
        <textarea v-model="post.content"></textarea>
      </div>

      <p class="write-date">작성일시: {{ writeDate }}</p>

      <div class="actions">
        <button @click="modifyHandler">수정 완료</button>
        <RouterLink to="/" class="cancel-link">취소</RouterLink>
      </div>
    </div>

    <div v-else class="loading">로딩 중…</div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";

const props = defineProps({
  id: { type: [Number, String], required: true },
});

const router = useRouter();
const store = usePostStore();

const id = Number(props.id);

onMounted(async () => {
  if (!store.posts.length) {
    await store.fetchPosts();
  }
});

const post = computed(() => store.getPostById(id));

const writeDate = computed(() => {
  const wd = post.value?.write_date;
  return wd ? new Date(wd).toLocaleString() : "";
});

const modifyHandler = async () => {
  if (!post.value) return;
  await store.modifyPost(id, {
    title: post.value.title,
    content: post.value.content,
  });
  router.push({ name: "HomeView" });
};
</script>

<style scoped>
.modify-page {
  max-width: 700px;
  margin: 50px auto;
  background-color: #2a2a2a;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  color: #f5f5f5;
}

/* 헤더 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.page-header h3 {
  margin: 0;
  color: #ff3b3b;
  font-size: 22px;
  font-weight: 800;
}

.back-link {
  color: #ffb3b3;
  text-decoration: none;
  font-weight: 600;
}
.back-link:hover {
  text-decoration: underline;
}

/* 폼 */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #eaeaea;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
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

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ff3b3b;
  box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
}

textarea {
  resize: vertical;
  min-height: 140px;
}

.write-date {
  font-size: 13px;
  color: #aaa;
  text-align: right;
  margin-top: -8px;
}

/* 버튼 */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 18px;
}

.actions button {
  background: #ff3b3b;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.06s;
}

.actions button:hover {
  background: #ff5b5b;
}

.actions button:active {
  transform: translateY(1px);
}

.cancel-link {
  color: #bbb;
  text-decoration: none;
  font-weight: 600;
  align-self: center;
}
.cancel-link:hover {
  color: #ffb3b3;
}

/* 로딩 */
.loading {
  color: #ccc;
  text-align: center;
  padding: 20px;
}

/* 반응형 */
@media (max-width: 640px) {
  .modify-page {
    padding: 20px;
  }
  .page-header h3 {
    font-size: 20px;
  }
}
</style>
