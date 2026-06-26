<script setup>
defineProps({
  ageSummary: {
    type: String,
    required: true,
  },
  birthdayDisplay: {
    type: String,
    required: true,
  },
})

defineEmits(['edit'])
</script>

<template>
  <v-card class="age-card mb-6" color="primary" variant="tonal">
    <v-card-text>
      <div class="age-card-header">
        <p class="text-overline mb-1">目前年齡</p>
        <v-btn
          variant="text"
          size="small"
          color="primary"
          prepend-icon="mdi-pencil-outline"
          @click="$emit('edit')"
        >
          修改生日
        </v-btn>
      </div>
      <p class="text-h6 mb-1">{{ ageSummary }}</p>
      <p class="text-body-2 text-medium-emphasis">生日：{{ birthdayDisplay }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.age-card {
  text-align: left;
}

.age-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
</style>
