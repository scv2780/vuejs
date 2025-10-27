<template>
  <h3>수정화면</h3>
  <div>
    <h3>제목: <input type="text" v-model="post.title" /></h3>
    <p>내용: <textarea v-model="post.content"></textarea></p>
    <p>
      <em>작성자: <input type="text" v-model="post.writer" /></em>
    </p>
    <p>작성일시: {{ writeDate }}</p>
    <button v-on:click="modifyHandler">수정</button>
    <RouterLink to="/">목록으로</RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute(); // 라우트 정보 접근
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
  if (post.value.write_date) {
    return new Date(post.value.write_date).toLocaleString();
  }
  return "";
});

const modifyHandler = async () => {
  const postId = route.params.id;
  await store.modifyPost(postId);
  router.push({ name: "HomeView" });
};
</script>
