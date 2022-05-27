import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

const MessageComponent = {
  template: `<a href="/products">{{ msg }}</a>`,
  props: ["msg"],
};

describe("#HeaderView", () => {
  test("affiche le bon titre", () => {
    const wrapper = mount(MessageComponent, {
      propsData: {
        msg: "UNIVERS",
      },
    });
    expect(wrapper.text()).toContain("UNIVERS");
  });
});
