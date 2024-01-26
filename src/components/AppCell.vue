<template>
  <div
    class="cell__wrapper"
  >
    <div
      class="cell"
      :class="{
        '--expandable': props.expandable,
      }"
      :style="{
        width: `calc(100% - ${props.level * 1.5}%)`,
      }"
    >
      <span v-if="props.expandable" class="cell__expand-icons">
        <svg
          v-if="props.expanded"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M19 12.998H5v-2h14z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
          />
        </svg>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.cell__wrapper {
  flex: 1 1 0;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;

  &:not(&:first-child) {
    .cell {
      width: 100% !important;

      &.--expandable {
        padding-left: 1rem;
      }
    }

    .cell__expand-icons {
      display: none;
    }
  }

}

.cell {
  border: 1px solid black;
  padding: 1rem;
  height: 100%;
  position: relative;

  &.--expandable {
    padding-left: 2rem;
  }
}

.cell__expand-icons {
  position: absolute;
  top: 1rem;
  left: 0.8rem;
}
</style>
