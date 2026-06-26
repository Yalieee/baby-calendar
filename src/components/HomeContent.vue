<script setup>
import AgeSummaryCard from './AgeSummaryCard.vue'
import CareTimeline from './CareTimeline.vue'

defineProps({
  birthday: {
    type: String,
    required: true,
  },
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
  <div>
    <AgeSummaryCard
      :age-summary="ageSummary"
      :birthday-display="birthdayDisplay"
      @edit="$emit('edit')"
    />

    <CareTimeline :birthday="birthday" />
  </div>
</template>
