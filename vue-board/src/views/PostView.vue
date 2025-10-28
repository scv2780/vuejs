<template>
  <div class="post-page">
    <!-- 상단 헤더 -->
    <header class="page-header">
      <h2>게시글 상세</h2>
      <RouterLink class="back-link" to="/">← 목록으로</RouterLink>
    </header>

    <!-- 게시글 상세 -->
    <section v-if="post" class="post-detail">
      <header class="post-header">
        <h3 class="title">{{ post.title }}</h3>
        <div class="meta">
          <span class="writer">작성자: {{ post.writer }}</span>
          <span class="date">{{ writeDate }}</span>
        </div>
      </header>

      <article class="content">
        {{ post.content }}
      </article>

      <div class="actions">
        <button @click="goModify">수정</button>
        <button class="danger" @click="deletePostHandler">삭제</button>
      </div>
    </section>

    <div v-else class="loading">로딩 중…</div>

    <!-- 댓글 섹션 -->
    <section class="reply-section">
      <AuthList />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";
import AuthList from "@/components/ReplyList.vue";

const route = useRoute();
const router = useRouter();
const store = usePostStore();

const id = Number(route.params.id);

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

function goModify() {
  router.push({ name: "ModifyView", params: { id: post.value.id } });
}

const deletePostHandler = async () => {
  const postId = route.params.id;
  await store.deletePost(postId);
  router.push({ name: "HomeView" });
};
</script>

<style scoped>
/* 페이지 전체 */
.post-page {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px 60px;
  color: #f5f5f5;
}

/* 상단 헤더 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.page-header h2 {
  color: #ff3b3b;
  margin: 0;
  font-size: 24px;
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

/* 게시글 카드 */
.post-detail {
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 30px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
}

.post-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.post-header .title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin: 0;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: #aeb4bb;
}
.meta .writer {
  font-weight: 700;
  color: #e5e7eb;
}
.meta .date {
  opacity: 0.8;
}

/* 본문 */
.content {
  background: #252525;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  padding: 16px;
  color: #e5e5e5;
  line-height: 1.7;
  margin: 8px 0 18px;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 액션 버튼 */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #3a3a3a;
  padding-top: 14px;
}

.actions button {
  background: #ff3b3b;
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
.actions button:hover {
  background: #ff5b5b;
}
.actions button:active {
  transform: translateY(1px);
}
.actions .danger {
  background: #e04646;
}
.actions .danger:hover {
  background: #ff6b6b;
}

/* 댓글 섹션 */
.reply-section {
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

/* 로딩 */
.loading {
  color: #ccc;
  text-align: center;
  padding: 20px;
}

/* 반응형 */
@media (max-width: 640px) {
  .post-page {
    margin: 30px auto;
    padding: 0 14px;
  }
  .post-header .title {
    font-size: 20px;
  }
  .meta {
    font-size: 12px;
  }
}
</style>
