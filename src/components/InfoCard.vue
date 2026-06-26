<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <v-card class="content-card h-100" elevation="0" border>
    <v-card-item>
      <template #prepend>
        <v-icon :color="iconColor" :icon="icon" />
      </template>
      <v-card-title>{{ title }}</v-card-title>
    </v-card-item>
    <v-card-text class="text-medium-emphasis">
      {{ description }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.content-card {
  text-align: left;
}
</style>
