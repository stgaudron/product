<script lang="ts">
import Vue from "vue";
import { useState } from "@/composables/state";
import AdnToggle from "@/composables/AdnToggle.vue";

export default Vue.extend({
  setup() {
    const [msg, setMsg] = useState("UNIVERS");

    return {
      msg,
      setMsg,
    };
  },
  components: {
    AdnToggle,
  },
});
</script>

<template>
  <div>
    <nav class="header-nav" role="navigation">
      <ul class="menu">
        <li><a href="/home">HOME</a></li>
        <li>
          <a href="/products">{{ msg }}</a>
        </li>
        <li>
          <div class="toggle-container">
            <adn-toggle class="toggle" :checked="false"></adn-toggle>
          </div>
        </li>
      </ul>
    </nav>
    <p1>test</p1>
  </div>
</template>

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
.toggle {
  color: #edf1fc;
}
.toggle-container {
  display: flex;
  padding: 0.7em;
}
</style>
