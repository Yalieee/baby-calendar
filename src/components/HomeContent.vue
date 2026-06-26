<script setup>
import AgeSummaryCard from './AgeSummaryCard.vue'
import InfoCard from './InfoCard.vue'

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
  <div>
    <AgeSummaryCard
      :age-summary="ageSummary"
      :birthday-display="birthdayDisplay"
      @edit="$emit('edit')"
    />

    <v-row dense>
      <v-col cols="12" md="6">
        <InfoCard
          title="成長注意事項"
          description="依照階段整理餵食、睡眠、尿布、體溫與發展里程碑等觀察重點。"
          icon="mdi-book-open-page-variant"
          icon-color="primary"
        />
      </v-col>

      <v-col cols="12" md="6">
        <InfoCard
          title="常見問題整理"
          description="收斂照顧時可能遇到的狀況、警訊與就醫前可先記錄的資訊。"
          icon="mdi-help-circle-outline"
          icon-color="secondary"
        />
      </v-col>
    </v-row>
  </div>
</template>
