import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// 로그인 상태 복원
import { useAuthStore } from "@/stores/auth.js";
useAuthStore().restore();
