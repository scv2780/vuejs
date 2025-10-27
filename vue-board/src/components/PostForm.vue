<template>
  <div class="page-container">
    <h2>글 작성</h2>
    <form v-on:submit.prevent="addPostHandler">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="title" placeholder="제목을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="content"
          placeholder="내용을 입력하세요"
          rows="8"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="writer">작성자</label>
        <input id="writer" v-model="writer" placeholder="닉네임 또는 이름" required />
      </div>

      <button type="submit" class="submit-btn">등록하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

//inject 함수로 addPost 함수 주입
import { usePostStore } from "@/stores/post";
const postStore = usePostStore(); // pinia 스토어 사용
const { addPost } = postStore; // addPost 함수 호출

// 폼 데이터 상태 관리
const title = ref("");
const content = ref("");
const writer = ref("");

// 폼 제출 핸들러
const addPostHandler = async () => {
  if (!title.value || !content.value || !writer.value) {
    alert("모든 필드를 작성해주세요.");
    return;
  }
  const newPost = {
    title: title.value,
    content: content.value,
    writer: writer.value,
  };
  await addPost(newPost);
  // 폼 초기화
  title.value = "";
  content.value = "";
  writer.value = "";
};
</script>

<style scoped>
/* ===== 전체 페이지 레이아웃 ===== */
.page-container {
  max-width: 700px;
  margin: 60px auto;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 40px 45px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
  color: #1a1a1a;
}

/* ===== 제목 ===== */
.page-container h2 {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 30px;
  color: #111827;
}

/* ===== 입력 폼 ===== */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  font-size: 15px;
}

input,
textarea {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
  color: #111827;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  border-color: #ff4d4d;
  box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.25);
  outline: none;
}

/* ===== 버튼 ===== */
.submit-btn {
  margin-top: 10px;
  width: 100%;
  background: #5457ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 14px 0;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.15s;
}

.submit-btn:hover {
  background: #7174ff;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>
