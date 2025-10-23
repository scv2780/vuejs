<template>
  <h2>🛒 장바구니</h2>

  <div style="margin-bottom: 1rem">
    <label>상품코드: <input type="text" v-model="code" /></label><br />
    <label>상품명: <input type="text" v-model="name" /></label><br />
    <label>가격: <input type="number" v-model="price" /></label><br />
    <label>수량: <input type="number" v-model="qty" /></label><br />
    <button @click="addItem">상품 추가</button>
  </div>

  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr style="background-color: #eee">
        <th>상품코드</th>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[code, Details] in product" :key="code">
        <td>{{ code }}</td>
        <td>{{ Details.name }}</td>
        <td>{{ Details.price }}원</td>
        <td>
          <input type="number" min="1" style="width: 60px" v-model="Details.qty" />
        </td>
        <td>{{ Details.price * Details.qty }}원</td>
        <td><button v-on:click="delProduct(code)">❌</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align: right">총합계:</th>
        <th colspan="2">{{ total }}원</th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const code = ref("");
const name = ref("");
const price = ref(0);
const qty = ref(0);
// const sum = ref(0);

const product = reactive(new Map());
product.set("P001", { name: "무선마우스", price: 15000, qty: 1 });

const addItem = () => {
  if (!code.value || !name.value || !price.value) return;
  product.set(code.value, { name: name.value, price: price.value, qty: qty.value });
};

const delProduct = (code) => {
  product.delete(code);
};

const total = computed(() => {
  return Array.from(product).reduce((acc, [, item]) => {
    return acc + item.price * item.qty;
  }, 0);
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
input[type="text"],
input[type="number"] {
  margin: 3px 0;
}
button {
  margin-top: 5px;
}
thead {
  color: black;
}
</style>
