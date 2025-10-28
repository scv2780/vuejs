<template>
  <div class="write-card">
    <h3 class="write-title">글 작성</h3>
    <form class="write-form" @submit.prevent="addPostHandler">
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" v-model="title" placeholder="제목을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="content"
          rows="7"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>

      <button type="submit" class="btn-primary">등록하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();
const { addPost } = postStore;

const title = ref("");
const content = ref("");

const addPostHandler = async () => {
  if (!title.value || !content.value) {
    alert("모든 필드를 작성해주세요.");
    return;
  }
  await addPost({
    title: title.value,
    content: content.value,
    writer: "", // (로그인 닉네임을 자동 사용하고 싶으면 여기에 주입하도록 추후 개선)
  });
  title.value = "";
  content.value = "";
};
</script>

<style scoped>
.write-card {
}
.write-title {
  margin: 0 0 14px;
  color: #ff3b3b;
  font-size: 20px;
  font-weight: 800;
}

/* 폼 */
.write-form {
  display: grid;
  gap: 14px;
}
.form-group {
  display: grid;
  gap: 8px;
}
.form-group label {
  font-size: 14px;
  color: #eaeaea;
}

/* 인풋 공통 */
.write-form input,
.write-form textarea {
  width: 100%;
  background: #1e1e1e;
  color: #fff;
  border: 1px solid #3d3d3d;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.write-form input::placeholder,
.write-form textarea::placeholder {
  color: #8e8e8e;
}
.write-form input:focus,
.write-form textarea:focus {
  border-color: #ff3b3b;
  box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
}

/* 버튼 */
.btn-primary {
  width: 100%;
  background: #ff3b3b;
  color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 12px 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.06s;
}
.btn-primary:hover {
  background: #ff5b5b;
}
.btn-primary:active {
  transform: translateY(1px);
}
</style>
