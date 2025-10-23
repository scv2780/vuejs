<script setup>
// Vue.js 특징 1. 데이터변경 -> 화면(DOM update) refresh.
import { ref, reactive, computed } from "vue";

const url = ref("https://vuejs.org/");
const isDisabled = ref(true);
const imgAttributes = reactive({
  src: "./src/assets/logo.svg",
  alt: "Vue 기본 로고",
  width: "150px",
});
const txtColor = ref("pink");
const backColor = ref("green");
const styleAttributes = reactive({
  color: "pink",
  backgroundColor: "green",
});

const msg = ref("Hello World");
const isTxtColorRed = ref(true);
const isbgColorBlue = ref(true);
const classStyles = reactive({
  txtColorRed: true,
  bgColorBlue: false,
  txtSize24: true,
});
let isRedTrue = ref(true); // .value
let isBlueTrue = ref(true);

const computedStyles = computed(() => {
  // isRedTrue = ref(Math.round(Math.random())); // 0, '', null=> falsy
  // isBlueTrue = ref(Math.round(Math.random()));
  // isRedTrue = isRedTrue == 0 ? false : true;
  // isBlueTrue = isBlueTrue == 0 ? false : true;

  return { txtColorRed: isRedTrue.value, bgColorBlue: isBlueTrue.value };
});

setInterval(() => {
  const isRed = Math.round(Math.random()) == 0 ? false : true;
  const isBlue = Math.round(Math.random()) == 0 ? false : true;

  // console.log(isRed, isBlue);

  isRedTrue.value = isRed;
  isBlueTrue.value = isBlue;
}, 100);
</script>

<template>
  <p>
    <a v-bind:href="url" v-bind:style="{ color: txtColor, backgroundColor: backColor }"
      >Vue.js 사이트</a
    >
  </p>
  <p>
    <a v-bind:href="url + 'guide/introduction.html'" v-bind:style="styleAttributes"
      >Vue.js 가이드 페이지</a
    >
  </p>
  <p><button v-bind:disabled="isDisabled">클릭</button></p>
  <p><img v-bind="imgAttributes" /></p>

  <p v-bind:class="{ txtColorRed: isTxtColorRed, bgColorBlue: isbgColorBlue }">{{ msg }}</p>
  <p v-bind:class="{ 'txt-color-pink': isTxtColorRed, bgColorBlue: isbgColorBlue }">{{ msg }}</p>
  <p v-bind:class="classStyles">{{ msg }}</p>
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<style scoped>
.txtColorRed {
  color: red;
}

.txt-color-pink {
  color: pink;
}

.bgColorBlue {
  background-color: blue;
}

.txtSize24 {
  font-size: 24px;
}
</style>
