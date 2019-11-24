import Component from "@ember/component";
import { bind } from "@ember/runloop";

export default Component.extend({
  init() {
    this._super(...arguments);
    const tabItems = this.tabItems || ["First", "Second", "Third"];
    this.set("tabItems", tabItems);
    this.set("tabFocus", 0);
    this.set("activeTab", this.tabItems[0]);
  },

  didInsertElement() {
    this.set("tablist", this.element.querySelector('[role="tablist"]'));
    this.set("tabs", this.element.querySelectorAll('[role="tab"]'));
    this.set(
      "boundTabKeyboardNavigation",
      bind(this, this.tabKeyboardNavigation)
    );
    this.tablist.addEventListener("keydown", this.boundTabKeyboardNavigation);
  },

  willDestroyElement() {
    this.tablist.removeEventListener(
      "keydown",
      this.boundTabKeyboardNavigation
    );
  },

  actions: {
    changeActiveTab(tab) {
      this.set("activeTab", tab);
    }
  },

  tabKeyboardNavigation(e) {
    // Move right
    if (e.keyCode === 39 || e.keyCode === 37) {
      this.tabs[this.tabFocus].setAttribute("tabindex", -1);
      if (e.keyCode === 39) {
        this.tabFocus++;
        // If we're at the end, go to the start
        if (this.tabFocus >= this.tabs.length) {
          this.tabFocus = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
        this.tabFocus--;
        // If we're at the start, move to the end
        if (this.tabFocus < 0) {
          this.tabFocus = this.tabs.length - 1;
        }
      }

      this.tabs[this.tabFocus].setAttribute("tabindex", 0);
      this.tabs[this.tabFocus].focus();
    }
  }
});
