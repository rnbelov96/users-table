<template>
  <label class="input">
    <p class="input__label">{{ options.label }}</p>
    <div class="input__wrapper">
      <input
        class="input__input"
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
      <p v-show="error" class="input__error">{{ error }}</p>
    </div>
  </label>
</template>

<script>
export default {
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
};
</script>

<style scoped>

</style>
