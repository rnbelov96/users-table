<template>
  <div
    class="input__wrapper"
    :class="{
      '-errored': errors.length > 0
    }"
  >
    <TheMask
      :mask="mask"
      type="tel"
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      class="input"
      @focus.native="onFocus"
    />
    <div class="input__error-msg">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
  components: { TheMask },
  props: {
    id: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    mask: {
      type: String,
      required: false,
      default: () => '+7 ### ###-##-##',
    },
    value: {
      type: String,
      required: true,
    },
    errors: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      bossIndex: '',
    };
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
    errorMessage() {
      return this.errors.map(error => error.$message).join(', ');
    },
  },
  methods: {
    onFocus() {
      if (this.value.length < 2) {
        this.$emit('input', ' ');
      }
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
}
</style>
