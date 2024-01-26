<template>
  <label class="input">
    <p class="input__label">{{ options.label }}</p>
    <div class="input__wrapper">
      <select class="input__select" v-model="selectValue">
        <option disabled value="">{{ options.placeholder }}</option>
        <option :value="el.value" :key="el.value" v-for="el in options.options">
          {{ el.name }}
        </option>
      </select>
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
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
    },
  },
  emits: ['input'],
  computed: {
    selectValue: {
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

<style scoped>

</style>
