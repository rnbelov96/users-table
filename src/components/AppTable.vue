<template>
  <div class="table">
    <h3 v-if="label" class="table__title">{{ label }}</h3>
    <div class="table__row">
      <div
        :key="column.field"
        v-for="column in columns"
        @click="sortClickHandler(column.field)"
        :class="{'--sortable': column.sortable}"
        class="table__cell table__head"
      >
        <span>{{ column.label }}</span>
        <svg
          v-show="sorting.key === column.field"
          :class="{
            '--rotated': sorting.direction === 'DESC',
          }"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 18V8.8l-3.6 3.6L6 11l6-6l6 6l-1.4 1.4L13 8.8V18z"
          />
        </svg>
      </div>
    </div>
    <slot name="body" v-bind="row" v-for="row in extendedRows"></slot>
  </div>
</template>

<script>
import { flatArray, sortArray } from '../common/helpers';

export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      required: true,
    },
    deepKey: {
      type: String,
      required: false,
    },
  },
  provide() {
    return {
      toggleExpand: this.toggleExpand,
    };
  },
  data() {
    return {
      sorting: {
        key: null,
        direction: 'ASC',
      },
      expandedIds: [],
    };
  },
  computed: {
    sortedArray() {
      return sortArray(this.rows, { ...this.sorting }, this.deepKey);
    },
    flattenArray() {
      return flatArray(this.sortedArray, this.deepKey, this.expandedIds);
    },
    extendedRows() {
      return this.flattenArray.map(row => ({
        ...row,
        expandable: row[this.deepKey] && row[this.deepKey].length > 0,
        expanded: this.expandedIds.includes(row.id),
        hidden: row.level > 0 && !this.expandedIds.includes(row.parentId),
      }));
    },
  },
  methods: {
    sortClickHandler(field) {
      if (this.sorting.key !== field) {
        this.sorting.key = field;
        this.sorting.direction = 'ASC';

        return;
      }

      if (this.sorting.direction === 'DESC') {
        this.sorting.key = null;
        this.sorting.direction = 'ASC';

        return;
      }

      if (this.sorting.direction === 'ASC' && !this.sorting.key) {
        this.sorting.key = field;
        return;
      }

      this.sorting.direction = 'DESC';
    },
    closeChildren(childrenList) {
      childrenList.forEach((el) => {
        this.expandedIds = this.expandedIds.filter(id => id !== el.id);

        if (el[this.deepKey]) {
          this.closeChildren(el[this.deepKey]);
        }
      });
    },
    toggleExpand(idToToggle) {
      const index = this.expandedIds.findIndex(id => id === idToToggle);

      if (index === -1) {
        this.expandedIds.push(idToToggle);
        return;
      }

      this.expandedIds.splice(index, 1);

      const element = this.flattenArray.find(el => el.id === idToToggle);

      if (element[this.deepKey]) {
        this.closeChildren(element[this.deepKey]);
      }
    },
  },
};
</script>

<style scoped>
.table__title {
  font-size: 1.5rem;
}
.table__row {
  display: flex;
}

.table__cell {
  border: 1px solid black;
  padding: 1rem;
  flex: 1 1 0;
}

.table__cell {
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 40px;
  pointer-events: none;
  cursor: pointer
}

.table__cell svg.--rotated {
  transform: rotate(180deg);
}

.table__head {
  pointer-events: none;
  text-align: center;
  justify-content: center;
  font-weight: 700;
}

.table__head.--sortable {
  pointer-events: initial;
}
</style>
