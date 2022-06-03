<template>
  <div>
    <p v-if="productError">Désolé, il y a eu une erreur</p>
    <ul>
      <li v-for="item in products" v-bind:key="item.reference"></li>
      <a v-bind:href="'/products/' + item.reference"></a>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import useSWRV from "swrv";
import Product from "../../product_interfaces";
import ProductCard from "@/composables/ProductCard";

const fetcher = (url: string): Product => {
  return fetch(url).then((res) => res.json());
};

export default Vue.extend({
  name: "ProductList",
  setup() {
    const { data: products, error: productError } = useSWRV(
      "/products",
      fetcher
    );

    return {
      products,
      productError,
    };
  },
});
</script>
