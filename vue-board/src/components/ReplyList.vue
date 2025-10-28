<template>
  <div class="reply-list">
    <h3>댓글 목록</h3>
    <ul>
      <li v-for="reply in replys" :key="reply.rId">
        <h4>{{ reply.rContent }}</h4>
        <p>{{ reply.rWriter }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";

const store = usePostStore();

const route = useRoute();
const replys = ref([]);

onMounted(async () => {
  const id = Number(route.params.id);
  replys.value = await store.fetchreply(id);
  // console.log("댓글아이딥니까? ", await store.fetchreply(id));
});
</script>

<style scoped>
.reply-list {
  margin-top: 30px;
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.reply-list h3 {
  color: #ff3b3b;
  margin-bottom: 12px;
}

.reply-list ul {
  list-style: none;
  padding: 0;
}

.reply-list li {
  background-color: #333;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 10px;
  color: #ddd;
}

.reply-list li h4 {
  margin: 0 0 4px;
  color: #fff;
}

.reply-list li p {
  margin: 0;
  color: #bbb;
  font-size: 14px;
}
</style>
