import LayoutMenuLeft from "@c/LayoutMenuLeft";
import AvatarBadge from "@c/AvatarBadge";

const components = {
  LayoutMenuLeft,
  AvatarBadge
};

const install = function(Vue) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const API = {
  install,
  ...components
};

export default API;
