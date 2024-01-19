<template>
  <form class="user-form" @submit.prevent="submit">
    <div class="user-form__input-box">
      <label for="user-form-name" class="user-form__input-label">Имя</label>
      <input id="user-form-name" type="text" v-model="name">
    </div>
    <div class="user-form__input-box">
      <label for="user-form-phone" class="user-form__input-label">Телефон</label>
      <AppPhoneInput id="user-form-phone" v-model="phone" />
    </div>
    <div class="user-form__input-box">
      <label class="user-form__input-label">Начальник</label>
      <select class="user-form__select" v-model="bossIndex">
        <option disabled value="">Выберите начальника</option>
        <option :value="index" :key="boss.id" v-for="(boss, index) in bossList">
          {{ boss.name }}
        </option>
      </select>
    </div>
    <button :disabled="disableBtn" type="submit">Сохранить</button>
  </form>
</template>

<script>
import AppPhoneInput from '../common/components/AppPhoneInput';

export default {
  name: 'UserForm',
  props: {
    bossList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      bossIndex: '',
    };
  },
  emits: ['addUser'],
  computed: {
    disableBtn() {
      return this.name === '' || this.phone === '' || this.bossIndex === '';
    },
  },
  methods: {
    submit() {
      this.$emit('addUser', {
        name: this.name,
        phone: `8${this.phone}`,
        bossIndex: this.bossIndex,
      });
      this.$modals.close();
    },
  },
  components: { AppPhoneInput },
};
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-form__input-box {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
}
</style>
