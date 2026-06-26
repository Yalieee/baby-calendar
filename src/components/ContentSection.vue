<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
  emptyText: {
    type: String,
    default: '本月暫無相關內容。',
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
  highlightedText: {
    type: String,
    default: '',
  },
})

function isHighlightedItem(item) {
  return props.highlightedText && item === props.highlightedText
}
</script>

<template>
  <v-card
    class="content-section"
    :class="{ 'content-section--highlighted': highlighted }"
    elevation="0"
    border
  >
    <v-card-item>
      <template #prepend>
        <v-avatar :color="color" variant="tonal" size="40">
          <v-icon :icon="icon" />
        </v-avatar>
      </template>
      <v-card-title class="text-subtitle-1 font-weight-bold">{{ title }}</v-card-title>
    </v-card-item>
    <v-card-text>
      <ul v-if="items.length" class="section-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'section-list__item--highlighted': isHighlightedItem(item) }"
        >
          {{ item }}
        </li>
      </ul>
      <p v-else class="text-medium-emphasis mb-0">{{ emptyText }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.content-section {
  height: 100%;
  text-align: left;
  transition: box-shadow 0.3s ease;
}

.content-section--highlighted {
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.45);
}

.section-list {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 10px;
  line-height: 1.6;
}

.section-list__item--highlighted {
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 6px;
  background: rgba(var(--v-theme-primary), 0.12);
  font-weight: 600;
}
</style>
