<template>
  <div class="table">
    <p v-if="label" class="table__title">{{ label }}</p>
    <div class="table__body">
      <div
        class="table__column"
        v-for="(column, index) in columns"
        :key="`${column.label}-${index}-${column.field}`"
      >
        <div
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
        <div
          class="table__cell"
          :class="{
            '--expandable': index === 0 && row.users.length > 0
          }"
          :style="{
            marginLeft: index === 0 ? `${row.level * 1}rem` : 0,
          }"
          :key="`${row[column.field]}-${i}`"
          v-for="(row, i) in extendedColumns[index]"
          @click="toggleExpand(row.id)"
        >
          <span v-if="index === 0 && row[deepKey] && row[deepKey].length > 0">
            <svg
              v-if="expandedIds.includes(row.id)"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M19 12.998H5v-2h14z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
              />
            </svg>
          </span>
          <span>{{ row[column.field] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { flatArray, sortArray } from '../common/helpers/';

export default {
  name: 'AppTable',
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
    extendedColumns() {
      return this.columns.map(() =>
        [...new Array(this.flattenArray.length).keys()].map(
          (_, index) => this.flattenArray[index],
        ),
      );
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
    toggleExpand(idToToggle) {
      const index = this.expandedIds.findIndex(id => id === idToToggle);

      if (~index) {
        this.expandedIds.splice(index, 1);
      } else {
        this.expandedIds.push(idToToggle);
      }
    },
  },
};
</script>

<style scoped>
.table__body {
  display: flex;
}

.table__row {
  display: flex;
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

.table__head {
  pointer-events: none;
  text-align: center;
  justify-content: center;
  font-weight: 700;
}

.table__head.--sortable {
  pointer-events: initial;
}

.table__cell svg {
  width: 1rem;
  height: 1rem;
}

.table__cell.--expandable {
  cursor: pointer;
  pointer-events: initial;
}

.table__cell svg.--rotated {
  transform: rotate(180deg);
}
</style>
