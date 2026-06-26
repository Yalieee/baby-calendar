<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  maxBirthday: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'submit'])
</script>

<template>
  <v-card class="entry-card mb-6" elevation="0" border>
    <v-card-title class="text-h6">設定新生兒生日</v-card-title>
    <v-card-text>
      <p class="mb-4 text-medium-emphasis">
        請輸入寶寶的生日，網站會依年齡整理相關照護資訊。資料只會保存在這台裝置的瀏覽器中。
      </p>
      <v-text-field
        :model-value="modelValue"
        label="新生兒生日"
        type="date"
        :max="maxBirthday"
        :error-messages="error"
        hide-details="auto"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </v-card-text>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary" block size="large" @click="$emit('submit')">
        開始使用
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.entry-card {
  text-align: left;
}
</style>
