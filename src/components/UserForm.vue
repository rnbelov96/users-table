<template>
  <form class="user-form" @submit.prevent="submit">
    <InputFactory
      :key="formField.name"
      v-for="formField in formFields"
      v-model="formData[formField.name]"
      :options="formField"
      :error="validations[formField.name].error"
    />
    <button type="submit">Сохранить</button>
  </form>
</template>

<script>
import InputFactory from '../common/components/InputFactory';
import { FormBuilder, validateFields } from '../common/helpers';

export default {
  name: 'UserForm',
  components: { InputFactory },
  props: {
    bossList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formFields: [],
      formData: {
        name: '',
        phone: '',
        bossIndex: '',
      },
      validations: this.setEmptyValidations(),
    };
  },
  emits: ['addUser'],
  created() {
    this.formFields = new FormBuilder()
      .addTextField({
        name: 'name',
        label: 'Имя',
      })
      .addPhoneField({
        name: 'phone',
        label: 'Телефон',
      })
      .addSelectField({
        name: 'bossIndex',
        label: 'Выберите начальника',
        options: this.optionList,
      })
      .build();
  },
  computed: {
    optionList() {
      return this.bossList.map((boss, index) => ({
        value: index,
        name: boss.name,
      }));
    },
  },
  methods: {
    setEmptyValidations() {
      return {
        name: {
          error: '',
          rules: ['required'],
        },
        phone: {
          error: '',
          rules: ['required'],
        },
        bossIndex: {
          error: '',
          rules: ['required'],
        },
      };
    },
    submit() {
      if (!validateFields(this.formData, this.validations)) {
        return;
      }
      this.$emit('addUser', {
        name: this.formData.name,
        phone: `8${this.formData.phone}`,
        bossIndex: this.formData.bossIndex,
      });
      this.$modals.close();
    },
  },
};
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
