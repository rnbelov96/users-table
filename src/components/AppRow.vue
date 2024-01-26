<template>
  <div
    :class="{
      '--expandable': props.expandable,
      '--expanded': props.expanded,
      '--hidden': props.hidden
    }"
    class="row"
    @click="rowClickHandler"
  >
    <div class="row__wrapper">
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
  inject: ['toggleExpand'],
  methods: {
    rowClickHandler() {
      if (this.props.expandable) {
        this.toggleExpand(this.props.id);
      }
    },
  },
};
</script>

<style scoped>
.row {
  display: grid;
  grid-template-rows: 1fr;
  transition: 0.3s;

  &.--hidden {
    grid-template-rows: 0fr;
  }

  &.--expandable {
    cursor: pointer;
  }
}
.row__wrapper {
  display: flex;
  flex: 1 1 0;
  overflow: hidden;
}
</style>
