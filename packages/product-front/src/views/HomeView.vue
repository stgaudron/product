<template>
  <div>
    <header-nav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderNav from "@/presenters/HeaderView.vue"; // @ is an alias to /src"

export default Vue.extend({
  name: "HomeView",
  components: {
    HeaderNav,
  },
});
</script>
