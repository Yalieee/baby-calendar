<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { getAllMonths, getCommonContent } from '../content/index.js'
import { formatMonthLabel, getBabyMonthIndex } from '../utils/birthday.js'
import ContentSearch from './ContentSearch.vue'
import MonthDetailCard from './MonthDetailCard.vue'

const props = defineProps({
  birthday: {
    type: String,
    required: true,
  },
})

const months = getAllMonths()
const commonContent = getCommonContent()
const selectedMonthId = ref(getBabyMonthIndex(props.birthday))
const highlightSection = ref('')
const highlightText = ref('')
const monthDetailRef = ref(null)
const warningAlertRef = ref(null)
let isSearchNavigation = false

const currentMonthId = computed(() => getBabyMonthIndex(props.birthday))
const selectedMonth = computed(
  () => months.find((month) => month.id === selectedMonthId.value) ?? months[0],
)

watch(
  () => props.birthday,
  (birthday) => {
    selectedMonthId.value = getBabyMonthIndex(birthday)
    highlightSection.value = ''
    highlightText.value = ''
  },
)

watch(selectedMonthId, () => {
  if (!isSearchNavigation) {
    highlightSection.value = ''
    highlightText.value = ''
  }
})

function selectMonth(monthId) {
  selectedMonthId.value = monthId
}

async function handleSearchSelect(result) {
  isSearchNavigation = true
  highlightSection.value = result.section
  highlightText.value = result.text

  if (result.monthId === null) {
    await nextTick()
    warningAlertRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    isSearchNavigation = false
    return
  }

  selectedMonthId.value = result.monthId

  await nextTick()
  monthDetailRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  isSearchNavigation = false
}
</script>

<template>
  <section class="care-timeline">
    <div class="timeline-header">
      <div>
        <p class="timeline-eyebrow">成長時間軸</p>
        <h2 class="timeline-title">0 到 2 歲每月照護重點</h2>
        <p class="timeline-subtitle">
          預設顯示寶寶目前月份，也可左右切換查看其他階段內容。
        </p>
      </div>
      <v-btn
        color="primary"
        variant="tonal"
        prepend-icon="mdi-crosshairs-gps"
        @click="selectMonth(currentMonthId)"
      >
        回到目前月份
      </v-btn>
    </div>

    <ContentSearch @select="handleSearchSelect" />

    <div class="timeline-track">
      <v-slide-group
        v-model="selectedMonthId"
        show-arrows
        center-active
        mandatory
      >
        <v-slide-group-item
          v-for="month in months"
          :key="month.id"
          :value="month.id"
          v-slot="{ isSelected, toggle }"
        >
          <button
            class="timeline-chip"
            :class="{
              'timeline-chip--selected': isSelected,
              'timeline-chip--current': month.id === currentMonthId,
            }"
            type="button"
            @click="toggle"
          >
            <span class="timeline-chip__label">{{ formatMonthLabel(month.id) }}</span>
            <span v-if="month.id === currentMonthId" class="timeline-chip__badge">目前</span>
          </button>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <MonthDetailCard
      ref="monthDetailRef"
      :month="selectedMonth"
      :is-current="selectedMonth.id === currentMonthId"
      :highlight-section="highlightSection"
      :highlight-text="highlightText"
      class="mb-6"
    />

    <v-alert
      ref="warningAlertRef"
      type="warning"
      variant="tonal"
      border="start"
      title="就醫警訊參考"
      class="warning-alert"
    >
      <ul class="warning-list">
        <li v-for="(sign, index) in commonContent.common_warning_signs" :key="index">
          {{ sign }}
        </li>
      </ul>
      <p class="warning-note">
        {{ commonContent.meta.notes.join(' ') }}
      </p>
    </v-alert>
  </section>
</template>

<style scoped>
.care-timeline {
  text-align: left;
}

.timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.timeline-eyebrow {
  margin: 0 0 6px;
  color: rgb(var(--v-theme-primary));
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.timeline-title {
  margin: 0 0 8px;
  font-size: clamp(1.375rem, 4vw, 1.75rem);
  font-weight: 700;
  line-height: 1.25;
}

.timeline-subtitle {
  margin: 0;
  max-width: 38rem;
  color: rgba(var(--v-theme-on-background), 0.7);
  line-height: 1.6;
}

.timeline-track {
  margin-bottom: 20px;
}

.timeline-chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 92px;
  margin-right: 10px;
  padding: 12px 14px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 16px;
  background: rgb(var(--v-theme-surface));
  color: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.timeline-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.timeline-chip--selected {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.08);
  box-shadow: 0 10px 24px rgba(232, 165, 152, 0.18);
}

.timeline-chip--current:not(.timeline-chip--selected) {
  border-color: rgba(var(--v-theme-secondary), 0.5);
}

.timeline-chip__label {
  font-size: 0.9375rem;
  font-weight: 600;
  white-space: nowrap;
}

.timeline-chip__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.warning-list {
  margin: 0 0 12px;
  padding-left: 1.1rem;
  display: grid;
  gap: 6px;
}

.warning-note {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.85;
}

@media (max-width: 600px) {
  .timeline-header {
    flex-direction: column;
  }

  .timeline-chip {
    min-width: 84px;
    padding: 10px 12px;
  }
}
</style>
