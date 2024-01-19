<template>
  <Transition name="modal-apperance" mode="out-in">
    <div v-if="isActive" class="modal">
      <div class="modal__content" @click.self="closeModal">
        <div class="modal__wrapper">
          <button class="modal__close-btn" @click="closeModal" aria-label="Закрыть модальное окно">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
              />
            </svg>
          </button>
          <div class="modal__body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    name: {
      type: String,
      required: true,
    },
    afterClose: {
      type: Function,
      required: false,
      default() {
        return () => {};
      },
    },
  },
  computed: {
    isActive() {
      return this.$modals.active() === this.name;
    },
  },
  methods: {
    closeModal() {
      this.$modals.close();

      this.afterClose();
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  max-height: 10000px;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  opacity: 1;
  pointer-events: initial;
  transition: opacity 0.5s, transform 0.5s, max-height 0.1s linear 0.5s;
  overflow: initial;
  background-color: rgba(0, 0, 0, 0.211);
}

.modal.modal-apperance-enter-active {
  transition: opacity 0.3s ease;
}

.modal.modal-apperance-enter-to {
  opacity: 1;
}

.modal.modal-apperance-enter-to.modal__wrapper {
  transform: translateX(100%);
}

.modal.modal-apperance-leave-active {
  transition: opacity 0.3s ease;
}

.modal.modal-apperance-leave-to {
  opacity: 0;
}

.modal.modal-apperance-leave-to.modal__wrapper {
  transform: translateX(100%);
}

.modal__content {
  height: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  align-items: center;
}

.modal__wrapper {
  width: 100%;
  max-width: 32.5rem;
  position: relative;
  transform: translateY(0%);
  transition: transform 0.5s;
  overflow: auto;
  background: #fff;
  box-shadow: -8px 0px 16px 0px rgba(0, 0, 0, 0.08),
    0px 0px 4px 0px rgba(0, 0, 0, 0.04);
}

.modal__body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow: auto;
}

.modal__close-btn {
  position: absolute;
  border: none;
  background-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  right: 0;
  top: 0;
  padding: 0;
}

.modal__close-btn svg {
  width: 100%;
  height: 100%;
}
</style>
