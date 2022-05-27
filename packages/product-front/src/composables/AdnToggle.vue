<template>
  <div>
    <MoonSvg />
    <label class="toggle" @click="onClick">
      <input type="checkbox" :checked="checked" />
      <span class="toggle__rail">
        <span class="toggle__circle"></span>
      </span>
      <!-- @slot Use this slot to set the toggle label -->
      <slot></slot>
    </label>
    <SunSvg />
  </div>
</template>

<script>
import MoonSvg from "@/composables/MoonSvg.vue";
import SunSvg from "@/composables/SunSvg.vue";
export default {
  name: "AdnToggle",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      /**
       * Emitted when the component is clicked.
       *
       * @event click
       * @type {event}
       */
      return this.$emit("click", this.checked);
    },
  },
  components: {
    MoonSvg,
    SunSvg,
  },
};
</script>

<style scoped lang="scss">
@import "../css/variables";

$color-toggle-on: #fdfefa;
.toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.14s ease;
  margin-left: 0.4rem;
  input {
    display: none;
    & + .toggle__rail {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: 0.8rem;
      width: 3.8rem;
      height: 1.8rem;
      border: solid 0.1rem $color-light-background;
      background-color: $color-light-background;
      border-radius: 1.8rem;
      transition: all 0.3s ease-in-out;
      .toggle__circle {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: -0.1rem;
        transition: all ease 0.2s;
        height: 1.8rem;
        width: 1.8rem;
        border: solid 0.1rem $color-light-background;
        border-radius: 1.8rem;
        background-color: $color-light-background;
        transition: all 0.3s ease-in-out;
        &::after {
          content: "";
          display: block;
          height: 1.4rem;
          width: 1.4rem;
          background-color: $color-dark-card;
          border-radius: 1.4rem;
          transition: all 0.1s ease;
        }
      }
    }
    &:checked + .toggle__rail {
      background-color: $color-toggle-on;
      border-color: $color-toggle-on;
      & .toggle__circle {
        background-color: $color-toggle-on;
        border: $color-toggle-on;
        left: 2rem;
        &::after {
          background-color: $color-light-accentuated;
          height: 1.4rem;
          width: 1.4rem;
        }
      }
    }
  }
}
</style>
