<template>
  <nav class="header-nav" role="navigation">
    <ul class="menu">
      <li><a href="/home">HOME</a></li>
      <li><a href="/products">UNIVERS</a></li>
    </ul>
  </nav>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "HeaderNav",
  props: {
    msg: String,
  },
});
</script>

<style lang="scss" scoped>
ul {
  margin: 0px;
  padding: 0px;
  background: #444f6d;
  list-style: none;
}
a {
  color: #edf1fc;
  padding: 1em;
  display: block;
  text-align: center;
  text-decoration: none;
  flex-grow: 1;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
