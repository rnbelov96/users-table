<template>
  <label class="input">
    <p class="input__label">{{ options.label }}</p>
    <div class="input__wrapper">
      <TheMask
        :mask="options.mask"
        type="tel"
        v-model="inputValue"
        :placeholder="options.placeholder"
        class="input__input"
        @focus.native="onFocus"
      />
      <p v-show="error" class="input__error">{{ error }}</p>
    </div>
  </label>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
  components: {
    TheMask,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
  },
  emits: ['input'],
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    onFocus() {
      if (this.value.length < this.options.minValue.length) {
        this.$emit('input', ' ');
      }
    },
  },
};
</script>
