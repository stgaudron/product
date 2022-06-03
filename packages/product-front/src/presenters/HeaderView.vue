<script lang="ts">
import Vue from "vue";
import { onMounted } from "@vue/composition-api";
import { useState } from "@/composables/state";
import AdnToggle from "@/composables/AdnToggle.vue";
import { useTheme } from "@/composables/useTheme";

export default Vue.extend({
  setup() {
    const [msg, setMsg] = useState("UNIVERS");
    let theme = "";
    const eventBus = new Vue();

    onMounted(() => {
      const { currentTheme } = useTheme();
      theme = currentTheme.value;
      eventBus.$on("click", (payload: string) => {
        theme = payload;
      });
    });
    return {
      msg,
      setMsg,
      theme,
    };
  },
  components: {
    AdnToggle,
  },
});
</script>

<template>
  <div class="container" v-bind:class="{ theme }">
    <nav class="header-nav" role="navigation">
      <ul class="menu">
        <li><a href="/home">HOME</a></li>
        <li>
          <a href="/products">{{ msg }}</a>
        </li>
        <li>
          <div class="toggle-container">
            <adn-toggle
              class="toggle"
              :checked="false"
              @click="useTheme"
            ></adn-toggle>
          </div>
        </li>
      </ul>
    </nav>
    <p1>test</p1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: block;
  background-color: var(--primary);
}
ul {
  margin: 0px;
  padding: 0px;
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
  background-color: #19252f;
}
.toggle {
  color: var(--text-primary-color);
}
.toggle-container {
  display: flex;
  padding: 0.7em;
}
</style>
