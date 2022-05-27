import { readonly, ref } from "@vue/composition-api";

export const useState = (initialState: string | number) => {
  const state = ref(initialState);
  const setState = (newState: string | number) => {
    state.value = newState;
  };

  return [readonly(state), setState];
};
