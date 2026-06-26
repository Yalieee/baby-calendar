<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import ContentSection from './ContentSection.vue'
import VaccineSection from './VaccineSection.vue'

const props = defineProps({
  month: {
    type: Object,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  highlightSection: {
    type: String,
    default: '',
  },
  highlightText: {
    type: String,
    default: '',
  },
})

const sectionRefs = ref({})

const sections = computed(() => [
  {
    key: 'development',
    title: '發展重點',
    items: props.month.development,
    icon: 'mdi-baby-face-outline',
    color: 'primary',
  },
  {
    key: 'possible_symptoms',
    title: '可能出現的狀況',
    items: props.month.possible_symptoms,
    icon: 'mdi-alert-circle-outline',
    color: 'orange',
  },
  {
    key: 'how_to_handle',
    title: '照顧與處理方式',
    items: props.month.how_to_handle,
    icon: 'mdi-hand-heart-outline',
    color: 'secondary',
  },
  {
    key: 'caregiver_notes',
    title: '照顧者提醒',
    items: props.month.caregiver_notes,
    icon: 'mdi-account-heart-outline',
    color: 'deep-purple',
  },
])

function setSectionRef(key, element) {
  if (element) {
    sectionRefs.value[key] = element
  }
}

async function scrollToHighlight() {
  if (!props.highlightSection) return

  await nextTick()

  const target = sectionRefs.value[props.highlightSection]
  const element = target?.$el ?? target
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

watch(
  () => [props.month.id, props.highlightSection, props.highlightText],
  () => {
    scrollToHighlight()
  },
  { flush: 'post' },
)
</script>

<template>
  <v-card class="month-detail" elevation="2">
    <div class="month-detail-hero" :class="{ 'month-detail-hero--current': isCurrent }">
      <div class="month-detail-hero__content">
        <div class="month-detail-hero__badges">
          <v-chip v-if="isCurrent" color="white" size="small" variant="flat">
            目前月份
          </v-chip>
          <v-chip color="white" size="small" variant="outlined">
            第 {{ month.id }} 月
          </v-chip>
        </div>
        <h2 class="month-detail-title">{{ month.label }}</h2>
        <p class="month-detail-subtitle">
          依照這個階段整理發展、常見狀況、照顧方式與疫苗資訊。
        </p>
      </div>
    </div>

    <v-card-text class="month-detail-body">
      <v-row dense>
        <v-col
          v-for="section in sections"
          :key="section.key"
          cols="12"
          md="6"
        >
          <ContentSection
            :ref="(element) => setSectionRef(section.key, element)"
            :title="section.title"
            :items="section.items"
            :icon="section.icon"
            :color="section.color"
            :highlighted="highlightSection === section.key"
            :highlighted-text="highlightSection === section.key ? highlightText : ''"
          />
        </v-col>
        <v-col cols="12">
          <VaccineSection
            :ref="(element) => setSectionRef('vaccines', element)"
            :month-id="month.id"
            :vaccines="month.vaccines"
            :highlighted="highlightSection === 'vaccines'"
            :highlighted-text="highlightSection === 'vaccines' ? highlightText : ''"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.month-detail {
  overflow: hidden;
  text-align: left;
}

.month-detail-hero {
  background: linear-gradient(135deg, #f7d9d2 0%, #efe3f8 100%);
  padding: 24px 20px;
}

.month-detail-hero--current {
  background: linear-gradient(135deg, #e8a598 0%, #b8a9c9 100%);
  color: white;
}

.month-detail-hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.month-detail-title {
  margin: 0 0 8px;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
}

.month-detail-subtitle {
  margin: 0;
  max-width: 36rem;
  line-height: 1.6;
  opacity: 0.9;
}

.month-detail-body {
  padding-top: 20px;
}
</style>
