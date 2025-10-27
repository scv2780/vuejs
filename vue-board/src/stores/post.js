import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
// import { useRoute } from "vue-router";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]); // state

  // getter
  const getPostById = computed(() => {
    return (id) => posts.value.find((post) => post.id === id);
  });

  // // getter: 가공된 state 반환.
  // const getPostById = computed(() => {
  //   const id = parseInt(useRoute().params.id); // 라우트 파라미터에서 id 가져오기
  //   return posts.value.find((post) => post.id === id);
  // });

  // action
  const addPost = async (newPost) => {
    const { data } = await axios.post("http://localhost:3000/board", { param: newPost });

    // ✅ 서버가 어떤 키로 반환하든 안전하게 회수
    const newId = data?.id ?? data?.insertId ?? data?.result?.insertId ?? data?.data?.id ?? null;

    if (newId == null) {
      // ⚠️ id 못 받았으면 잘못된 항목을 푸시하지 말고 서버 기준으로 동기화
      await fetchPosts();
      return;
    }

    // 정상일 때만 추가 (상단에 넣고 싶으면 unshift)
    posts.value.push({ ...newPost, id: Number(newId) });
  };

  // | 백엔드 종류             | 응답 예시                      | 우리가 꺼내야 하는 키      |
  // | --------------------    | ----------------------------- | ----------------- |
  // | Node + MySQL2           | `{ insertId: 8 }`             | `insertId`        |
  // | Node + Express (커스텀) | `{ id: 8 }`                   | `id`              |
  // | Express + Axios 래핑    | `{ data: { id: 8 } }`         | `data.data.id`    |
  // | MySQL Pool 결과         | `{ result: { insertId: 8 } }` | `result.insertId` |

  // const addPost = async (newPost) => {
  //   const result = await axios.post("http://localhost:3000/board", { param: newPost });
  //   posts.value.push({ ...newPost, id: result.data.insertid });
  // };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:3000/board/${id}`); // DB 삭제
    posts.value = posts.value.filter((post) => post.id !== id); // 로컬 삭제
  };

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    posts.value = response.data;
  };

  // 수정
  const modifyPost = async () => {
    const result = await axios.put(`http://localhost:3000/board/${id}`);
    posts.value = result.data;
  };

  return { posts, getPostById, addPost, deletePost, fetchPosts, modifyPost };
});
