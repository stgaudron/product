<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./css/variables";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
:root {
  --primary: var(--$color-dark-acentuated);
  --primary-light: var($color-light-accentuated);
  --primary-dark: var($color-dark-accentuated);

  --bg--dark: var($color-dark-background);
  --text-dark: var($color-dark-text);
  --card-dark: var($color-dark-card);

  --bg--light: var($color-light-background);
  --text-light: var($color-light-text);
  --card-light: var($color-light-card);
}
</style>
