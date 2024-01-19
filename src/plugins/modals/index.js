import { reactive } from 'vue';
import { lockScroll, unlockScroll } from '../../common/helpers';

const current = reactive({
  name: '',
  options: {},
});

const api = {
  active() {
    return current.name;
  },

  options() {
    return current.options;
  },

  show(name, options) {
    current.name = name;

    current.options = options || {};

    if (!current.options.unlockScroll) {
      lockScroll();
    }
  },

  close() {
    current.name = '';
    unlockScroll();
  },
};

export default api;
