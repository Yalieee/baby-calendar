<script setup>
defineProps({
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
})
</script>

<template>
  <v-card class="content-section" elevation="0" border>
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
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
      <p v-else class="text-medium-emphasis mb-0">{{ emptyText }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.content-section {
  height: 100%;
  text-align: left;
}

.section-list {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 10px;
  line-height: 1.6;
}
</style>
