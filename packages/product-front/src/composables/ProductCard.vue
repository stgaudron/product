<template>
  <div class="card">
    <img src="{{ productImg }}" alt="product-img" />
    <div class="container">
      <h4>
        <b> {{ name }} </b>
      </h4>
      <h2>{{ price }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    productImg: {
      type: String,
    },
  },
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16 px;
}
</style>
