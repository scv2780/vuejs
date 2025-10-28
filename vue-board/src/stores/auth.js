import { defineStore } from "pinia";
import { ref, computed } from "vue";

const USERS_KEY = "users"; // 전체 사용자 목록 저장용
const SESSION_KEY = "gm-auth-user"; // 현재 로그인 사용자 저장용

export const useAuthStore = defineStore("auths", () => {
  // 현재 로그인 사용자 (없으면 null)
  const user = ref(JSON.parse(localStorage.getItem(SESSION_KEY) || "null"));

  // 상태/파생값
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const nickname = computed(() => user.value?.nickname || "");

  /**
   * 로그인
   * - users 목록에 아이디가 없으면 새로 등록(연습용 회원가입)
   * - 있으면 비밀번호 일치 검사
   * - 성공 시 세션(SESSION_KEY)에 현재 로그인 사용자 저장
   */
  function login(id, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    let found = users.find((u) => u.account === id);

    // 없으면 새로 생성(연습용 "자동 회원가입")
    if (!found) {
      found = {
        id: Date.now(), // 고유값
        account: id, // 로그인 아이디
        password, // (연습용) 평문 저장
        nickname: id, // 닉네임 = 아이디
        role: id === "admin" ? "admin" : "user",
        createdAt: new Date().toISOString(),
      };
      users.push(found);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      // 존재하면 비밀번호 체크
      if (found.password !== password) {
        alert("비밀번호가 맞지 않습니다.");
        return false;
      }
    }

    // 세션 저장
    user.value = {
      id: found.id,
      account: found.account,
      nickname: found.nickname,
      role: found.role,
      password: found.password, // (연습용) 필요하면 유지, 싫으면 제거
      lastLoginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user.value));

    return true;
  }

  // 로그아웃
  function logout() {
    user.value = null;
    localStorage.removeItem(SESSION_KEY);
  }

  // 새로고침 복원
  function restore() {
    const saved = localStorage.getItem(SESSION_KEY);
    user.value = saved ? JSON.parse(saved) : null;
  }

  // 글 소유자 판별(UI 가드)
  function isOwner(writer) {
    if (!user.value) return false;
    return writer === user.value.nickname || isAdmin.value;
  }

  return { user, isLoggedIn, isAdmin, nickname, login, logout, restore, isOwner };
});
