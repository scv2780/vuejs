<script setup>
// CompositionAPI /
import { ref, computed } from "vue";

const radiusInit = Math.round(Math.random() * 10);
const radius = ref(radiusInit);
const PI = ref(3.14);

// 계산된 속성.
const area = computed(() => {
  return radius.value * radius.value * PI.value;
});

// 반응형 데이터(radius)를 변경하면 화면에 refresh.
setInterval(() => {
  radius.value = Math.round(Math.random() * 10);
}, 5000);
</script>

<!-- Options API 방식 -->
<!-- <script>
export default {
  name: "RandomAreaExample",
  data() {
    const radiusInit = Math.round(Math.random() * 10);
    return {
      radius: radiusInit,
      PI: 3.14,
      _timerId: null
    };
  },
  computed: {
    area() {
      return this.radius * this.radius * this.PI;
    }
  },
  mounted() {
    this._timerId = setInterval(() => {
      this.radius = Math.round(Math.random() * 10);
    }, 5000);
  },
  beforeUnmount() {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }
};
</script> -->

<template>
  <p>반지름이 {{ radius }}이고 원주율 {{ PI }} 인 원의 면적은 {{ area }}</p>
</template>

<style></style>
