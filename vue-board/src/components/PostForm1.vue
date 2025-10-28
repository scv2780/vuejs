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
import { ref, inject } from "vue";

//inject 함수로 addPost 함수 주입
const addPost = inject("addPost");
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
/* 페이지 컨테이너 (이 파일 안에서만 책임) */
.page-container {
  max-width: 700px;
  margin: 50px auto;
  padding: 24px;
  background-color: #2a2a2a;
  color: #f5f5f5;
  border: 1px solid #3a3a3a;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.page-container h2 {
  margin: 0 0 18px;
  color: #ff3b3b;
  font-size: 24px;
  font-weight: 800;
}

/* 폼 */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 14px;
  color: #eaeaea;
}

/* 인풋/텍스트에어리어 공통 */
.form-group input,
.form-group textarea {
  width: 100%;
  background-color: #1e1e1e;
  color: #fff;
  border: 1px solid #3d3d3d;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #8e8e8e;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ff3b3b;
  box-shadow: 0 0 0 3px rgba(255, 59, 59, 0.15);
}

/* 버튼 */
.submit-btn {
  width: 100%;
  background: #ff3b3b;
  color: #fff;
  border: 0;
  border-radius: 10px;
  padding: 12px 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.06s ease;
}

.submit-btn:hover {
  background: #ff5b5b;
}

.submit-btn:active {
  transform: translateY(1px);
}
/* 모바일 간격 */
@media (max-width: 640px) {
  .page-container {
    margin: 24px auto;
    padding: 18px;
  }
}
</style>
