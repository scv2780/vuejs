<template>
  <BoardForm>
    <template v-slot:no>
      <input class="form-control" type="text" v-model="boardInfo.no" readonly />
    </template>
    <template v-slot:title>
      <input class="form-control" type="text" v-model="boardInfo.title" />
    </template>
    <template v-slot:writer>
      <input class="form-control" type="text" v-model="boardInfo.writer" />
    </template>
    <template v-slot:content>
      <textarea class="form-control" v-model="boardInfo.content"></textarea>
    </template>
    <template v-slot:created_date>
      <input class="form-control" type="date" v-model="formattedDate" readonly />
    </template>
    <template v-slot:button>
      <button class="btn btn-info" @click="modifyBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from "@/components/BoardForm.vue";
import dateFormat from "@/utils/dateFormat";
import axios from "axios";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const boardInfo = ref({
  no: "",
  title: "",
  writer: "",
  content: "",
  created_dt: new Date(),
});
const formattedDate = computed(() => {
  return dateFormat(boardInfo.value.created_dt, "yyyy-MM-dd");
});

onBeforeMount(async () => {
  const bno = route.query.no;
  // console.log(bno);
  let result = await axios.get(`/api/boards/${bno}`).catch((err) => console.log(err));
  // console.log(result.data);
  boardInfo.value = result.data;
  // console.log(boardInfo.value);
});

const modifyBoard = async () => {
  const obj = {
    title: boardInfo.value.title,
    writer: boardInfo.value.writer,
    content: boardInfo.value.content,
    created_dt: formattedDate.value,
  };
  const result = await axios
    .put(`api/boards/${boardInfo.value.no}`, obj)
    .catch((err) => console.log(err));
  let addRes = result.data;
  if (addRes.result) {
    alert("게시글이 수정되었습니다.");
    router.push({ name: "boardInfo", query: { no: boardInfo.value.no } });
  } else {
    alert("게시글 수정에 실패하였습니다.");
  }
};
</script>
