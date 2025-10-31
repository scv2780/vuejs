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
      <button class="btn btn-info" @click="addBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from "@/components/BoardForm.vue";
import { reactive, computed } from "vue";
import dateFormat from "@/utils/dateFormat";
import axios from "axios";

const boardInfo = reactive({
  // reactive 객체 자체가 변하는게 아니라 필드만 변할 수 있음, ref 보다 가벼움
  no: "",
  title: "",
  writer: "",
  content: "",
  created_dt: new Date(),
});

const formattedDate = computed(() => {
  return dateFormat(boardInfo.created_dt, "yyyy-MM-dd");
});

const addBoard = async () => {
  let obj = {
    title: boardInfo.title,
    writer: boardInfo.writer,
    content: boardInfo.content,
    created_dt: formattedDate.value,
  };

  let result = await axios.post(`/api/boards`, obj).catch((err) => console.log(err));
  let addRes = result.data;
  if (addRes.result) {
    alert("게시글이 추가되었습니다.");
    boardInfo.no = addRes.bno;
  } else {
    alert("게시글 추가에 실패하였습니다.");
  }
};
</script>
