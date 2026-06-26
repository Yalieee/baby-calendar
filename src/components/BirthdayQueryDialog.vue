<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  birthdayDisplay: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue', 'confirm', 'cancel'])
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6">設定分享的生日？</v-card-title>
      <v-card-text class="text-medium-emphasis">
        這個連結建議將新生兒生日設為
        <strong>{{ birthdayDisplay }}</strong
        >。是否要套用到這台裝置？
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-btn variant="text" @click="$emit('cancel')">取消</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="$emit('confirm')">設定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
