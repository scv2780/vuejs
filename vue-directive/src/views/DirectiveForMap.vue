<template>
  No: <input type="number" v-model="no" /><br /><br />
  이름: <input type="text" v-model="name" /><br /><br />
  전화번호: <input type="text" v-model="phone" /><br /><br />
  <button v-on:click="addNewElement">추가</button>
  <div>
    <p v-for="(no, person) in mapRef" :key="person">
      키({{ no }}), 값:{{ person.name }} / 연락처: {{ person.phone }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 변수.
const no = ref(0);
const name = ref("");
const phone = ref("010-0000-0000");

// Map => 키, 값, {키: 값}
const map = new Map();
map.set(1, { name: "홍길동", phone: "010-1111-1111" });
map.set(2, { name: "김명식", phone: "010-2222-2222" });
map.set(3, { name: "박영동", phone: "010-3333-3333" });
map.delete(2);

const mapRef = reactive(map);

// addNewElement 번호, 이름 => 추가 후 clear
let addNewElement = () => {
  if (!no.value || !name.value) {
    alert("번호, 이름을 입력하세요");
    return;
  }

  mapRef.set(Number(no.value), name.value.trim(), phone.value);
};
</script>
