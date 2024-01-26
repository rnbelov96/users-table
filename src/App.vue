<template>
  <div>
    <AppTable
      :columns="columns"
      row-key="name"
      deep-key="users"
      :rows="users"
      label="Список пользователей"
    >
      <template #body="props">
        <AppRow :props="props">
          <AppCell :props="props">
            {{ props.name }}
          </AppCell>
          <AppCell :props="props">
            {{ props.phone }}
          </AppCell>
        </AppRow>
      </template>
    </AppTable>
    <button class="create-btn" @click="$modals.show('new-user-modal')">
      Создать пользователя
    </button>
    <BaseModal name="new-user-modal">
      <UserForm :boss-list="userList" @addUser="addNewUser" />
    </BaseModal>
  </div>
</template>

<script>
import { getUserList, createUUIDv4 } from './common/helpers';
import AppCell from './components/AppCell';
import AppRow from './components/AppRow';
import AppTable from './components/AppTable';
import UserForm from './components/UserForm';
import BaseModal from './plugins/modals/BaseModal';

export default {
  name: 'App',
  components: {
    AppTable,
    UserForm,
    BaseModal,
    AppRow,
    AppCell,
  },
  data() {
    return {
      columns: [
        {
          name: 'name',
          label: 'Имя',
          field: 'name',
          sortable: true,
        },
        {
          name: 'phone',
          field: 'phone',
          label: 'Телефон',
          sortable: true,
        },
      ],
      users: [
        {
          id: 1,
          name: 'Игорь',
          phone: '89624334563',
          users: [
            {
              id: 2,
              name: 'Алиса',
              phone: '89934356634',
              users: [],
            },
            {
              id: 3,
              name: 'Михаил',
              phone: '89134532111',
              users: [
                {
                  name: 'Катя',
                  phone: '89467886433',
                  users: [
                    {
                      id: 10,
                      name: 'Ирина',
                      phone: '89164222567',
                      users: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'Маруся',
          phone: '89764212567',
          users: [],
        },
      ],
    };
  },
  created() {
    this.getUsersFromStorage();
  },
  computed: {
    userList() {
      return getUserList(this.users);
    },
  },
  methods: {
    getUsersFromStorage() {
      const users = localStorage.getItem('users');

      if (users) {
        this.users = JSON.parse(users);
      }
    },
    addNewUser({ name, phone, bossIndex }) {
      const boss = this.userList[bossIndex];
      const newUser = {
        id: createUUIDv4(),
        name,
        phone,
        users: [],
      };

      boss.users.push(newUser);
    },
  },
  watch: {
    users: {
      handler() {
        localStorage.setItem('users', JSON.stringify(this.users));
      },
      deep: true,
    },
  },
};
</script>

<style>
*,
::after,
::before {
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.create-btn {
  margin-top: 1rem;
  display: block;
  cursor: pointer;
}
</style>
