<script setup>
import { onMounted, provide, ref } from "vue";
import { RouterView } from "vue-router";
import axios from "axios";

const memberList = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/customers");
  memberList.value = res.data;
  console.log(memberList.value);
});

provide("memberList", memberList);
</script>

<template>
  <header>
    <h1>라우터 샘플</h1>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  border: blue 1px solid;
  padding: 10px;
}

#breadcrumbs ul li {
  display: inline;
  list-style: none;
}

#breadcrumbs {
  margin-left: 0;
}

#breadcrumbs ul {
  padding-left: 0;
}

#breadcrumbs ul .current {
  color: red;
}

#breadcrumbs ul li:before {
  content: " > ";
}

#breadcrumbs ul li:first-child:before {
  content: none;
}
</style>
