<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  birthday: {
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

const emit = defineEmits(['update:modelValue', 'update:birthday', 'save'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="420" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="text-h6">修改新生兒生日</v-card-title>
      <v-card-text>
        <p class="mb-4 text-medium-emphasis">
          如果先前輸入錯誤，可以在這裡更新生日，網站會重新計算年齡。
        </p>
        <v-text-field
          :model-value="birthday"
          label="新生兒生日"
          type="date"
          :max="maxBirthday"
          :error-messages="error"
          hide-details="auto"
          @update:model-value="$emit('update:birthday', $event)"
        />
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-btn variant="text" @click="close">取消</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="$emit('save')">儲存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
