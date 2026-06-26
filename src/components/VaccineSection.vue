<script setup>
import { useVaccineStatus } from '../composables/useVaccineStatus.js'

const { isCompleted, markCompleted, unmarkCompleted } = useVaccineStatus()

const props = defineProps({
  monthId: {
    type: Number,
    required: true,
  },
  vaccines: {
    type: Array,
    default: () => [],
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

function vaccineKey(vaccine) {
  return `${vaccine.age}|${vaccine.name}`
}

function vaccineDisplayText(vaccine) {
  return `${vaccine.name}（${vaccine.age}）`
}

function isHighlightedVaccine(vaccine) {
  return props.highlightedText && vaccineDisplayText(vaccine) === props.highlightedText
}
</script>

<template>
  <v-card
    class="vaccine-section"
    :class="{ 'vaccine-section--highlighted': highlighted }"
    elevation="0"
    border
  >
    <v-card-item>
      <template #prepend>
        <v-avatar color="teal" variant="tonal" size="40">
          <v-icon icon="mdi-needle" />
        </v-avatar>
      </template>
      <v-card-title class="text-subtitle-1 font-weight-bold">疫苗接種</v-card-title>
    </v-card-item>
    <v-card-text>
      <div v-if="vaccines.length" class="vaccine-list">
        <v-card
          v-for="vaccine in vaccines"
          :key="vaccineKey(vaccine)"
          class="vaccine-card"
          :class="{
            'vaccine-card--completed': isCompleted(monthId, vaccine),
            'vaccine-card--highlighted': isHighlightedVaccine(vaccine),
          }"
          variant="tonal"
          :color="isCompleted(monthId, vaccine) ? 'success' : 'teal'"
        >
          <v-card-text>
            <div class="vaccine-card__header">
              <div>
                <p class="vaccine-age">{{ vaccine.age }}</p>
                <p class="vaccine-name">{{ vaccine.name }}</p>
              </div>
              <v-chip
                v-if="isCompleted(monthId, vaccine)"
                color="success"
                size="small"
                prepend-icon="mdi-check-circle"
              >
                已完成
              </v-chip>
            </div>
            <v-chip
              size="small"
              :color="isCompleted(monthId, vaccine) ? 'success' : 'teal'"
              variant="outlined"
            >
              {{ vaccine.type }}
            </v-chip>
            <div class="vaccine-actions">
              <v-btn
                v-if="!isCompleted(monthId, vaccine)"
                color="teal"
                variant="outlined"
                size="small"
                prepend-icon="mdi-check"
                @click="markCompleted(monthId, vaccine)"
              >
                標記已完成
              </v-btn>
              <v-btn
                v-else
                color="success"
                variant="text"
                size="small"
                prepend-icon="mdi-undo"
                @click="unmarkCompleted(monthId, vaccine)"
              >
                取消標記
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <p v-else class="text-medium-emphasis mb-0">本月無常規疫苗接種安排。</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.vaccine-section {
  text-align: left;
  transition: box-shadow 0.3s ease;
}

.vaccine-section--highlighted {
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.45);
}

.vaccine-list {
  display: grid;
  gap: 12px;
}

.vaccine-card {
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.vaccine-card--completed {
  box-shadow: inset 0 0 0 1px rgba(var(--v-theme-success), 0.35);
}

.vaccine-card--highlighted {
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.45);
}

.vaccine-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.vaccine-age {
  margin: 0 0 4px;
  font-size: 0.8125rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.vaccine-name {
  margin: 0;
  font-weight: 600;
  line-height: 1.5;
}

.vaccine-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
