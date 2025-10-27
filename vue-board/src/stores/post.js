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
    const newId = data?.id ?? null;

    if (newId == null) {
      // 서버 결과가 애매하면 전체 다시 동기화
      await fetchPosts();
      return;
    }
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
    try {
      await axios.delete(`http://localhost:3000/board/${id}`);
      posts.value = posts.value.filter((post) => post.id !== Number(id));
    } catch (err) {
      console.error("deletePost error:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/boards");
      // 서버에서 배열로 돌려주니 그대로 대입
      posts.value = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("fetchPosts error:", err);
      posts.value = [];
    }
  };

  // 수정
  const modifyPost = async (id, payload) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/board/${id}`, {
        param: payload, // {title, content, writer}
      });
      if (data?.affectedRows > 0) {
        // 로컬도 갱신
        const idx = posts.value.findIndex((p) => p.id === Number(id));
        if (idx !== -1) {
          posts.value[idx] = { ...posts.value[idx], ...payload };
        }
      } else {
        // 서버 기준으로 다시 가져와서 동기화
        await fetchPosts();
      }
    } catch (err) {
      console.error("modifyPost error:", err);
    }
  };

  return { posts, getPostById, addPost, deletePost, fetchPosts, modifyPost };
});
