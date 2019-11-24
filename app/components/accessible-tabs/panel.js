import Component from "@ember/component";
import { computed } from "@ember/object";
import { not } from "@ember/object/computed";

export default Component.extend({
  tabindex: "0",
  role: "tabpanel",
  classNames: ["tabs__panel"],
  attributeBindings: [
    "role",
    "tabindex",
    "ariaHidden:aria-hidden",
    "id:aria-labelledBy"
  ],
  ariaHidden: not("isActive"),

  isActive: computed("id", "activeTab", function() {
    return this.id === this.activeTab;
  })
});
