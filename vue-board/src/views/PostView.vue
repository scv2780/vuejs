<template>
  <h3>상세화면</h3>
  <div>
    <h3>제목: {{ post.title }}</h3>
    <p>내용: {{ post.content }}</p>
    <p>
      <em>작성자: {{ post.writer }}</em>
    </p>
    <p>작성일시: {{ writeDate }}</p>
    <button v-on:click="deletePostHandler">삭제</button>
    <RouterLink to="/">목록으로</RouterLink>
    <p><RouterLink to="{ name: 'ModifyView', params: { id: post.id } }">수정하기</RouterLink></p>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
// import axios from "axios";
// import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";

const route = useRoute(); // 라우트 정보 접근
const router = useRouter();
const store = usePostStore();

// const postStore = usePostStore();
// const { getPostById } = storeToRefs(postStore);

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

// onMounted(async () => {
//   const result = await axios.get(`http://localhost:3000/board/${route.params.id}`);
//   console.log("Post Data:", result.data);
//   post.value = result.data[0];
// });

// 함수
const deletePostHandler = async () => {
  const postId = route.params.id;
  await store.deletePost(postId);
  router.push({ name: "HomeView" });
};
</script>
