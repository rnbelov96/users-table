<template>
  <AppTextInput
    v-if="options.type === 'text'"
    v-model="modelValue"
    :options="options"
    :error="error"
  />
  <AppPhoneInput
    v-else-if="options.type === 'tel'"
    v-model="modelValue"
    :options="options"
    :error="error"
  />
  <AppSelect
    v-else
    v-model="modelValue"
    :options="options"
    :error="error"
  />
</template>

<script>
import AppTextInput from './AppTextInput';
import AppPhoneInput from './AppPhoneInput';
import AppSelect from './AppSelect';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
    },
  },
  components: {
    AppTextInput,
    AppPhoneInput,
    AppSelect,
  },
  computed: {
    modelValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style>
.input {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
}

.input__label {
  margin-top: 0;
  margin-bottom: 0;
}

.input__input,
.input__select {
  width: 100%;
}

.input__wrapper {
  position: relative;
}

.input__error {
  margin-top: 0;
  margin-bottom: 0;
  position: absolute;
  color: red;
  bottom: -0.3rem;
  transform: translateY(100%);
}
</style>
