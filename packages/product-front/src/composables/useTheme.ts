import { Ref, ref } from "@vue/composition-api";
import Vue from "vue";

export const useTheme = (): {
  toggleTheme: () => void;
  currentTheme: Ref<string>;
} => {
  const currentTheme = ref("light");
  const eventBus = new Vue();

  if (localStorage) {
    const themePreference = localStorage.getItem("theme");
    if (themePreference) {
      currentTheme.value = themePreference;
      currentTheme.value === "light" ? setLightTheme() : setDarkTheme();
    }
  }
  function setLightTheme() {
    currentTheme.value = "light";

    document.documentElement.style.setProperty(
      "--primary",
      "var(--$color-light-acentuated)"
    );
    document.documentElement.style.setProperty(
      "--background",
      "var(--bg--light)"
    );
    document.documentElement.style.setProperty("--text", "var(--text--light");

    localStorage && localStorage.setItem("theme", "light");
  }

  function setDarkTheme() {
    currentTheme.value = "dark";

    document.documentElement.style.setProperty("--primary", "var(--teal)");
    document.documentElement.style.setProperty(
      "--background",
      "var(--bg--dark)"
    );
    document.documentElement.style.setProperty("--text", "var(--text--dark");

    localStorage && localStorage.setItem("theme", "dark");
  }

  function toggleTheme() {
    if (currentTheme.value === "dark") {
      setLightTheme();
    } else {
      setDarkTheme();
    }

    eventBus.$emit("click", currentTheme.value);
  }

  return {
    toggleTheme,
    currentTheme,
  };
};
