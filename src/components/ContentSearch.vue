<script setup>
import { computed, ref } from 'vue'
import { getAllMonths, getCommonContent } from '../content/index.js'
import { buildSearchIndex, highlightMatch, searchContent } from '../utils/contentSearch.js'

const emit = defineEmits(['select'])

const query = ref('')
const searchIndex = buildSearchIndex(getAllMonths(), getCommonContent())

const results = computed(() => searchContent(searchIndex, query.value))

function selectResult(result) {
  emit('select', result)
  query.value = ''
}

function resultParts(text) {
  return highlightMatch(text, query.value)
}
</script>

<template>
  <div class="content-search">
    <v-text-field
      v-model="query"
      label="搜尋症狀、照顧方式或疫苗"
      placeholder="例如：吐奶、脹氣、發燒"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="comfortable"
      clearable
      hide-details="auto"
    />

    <v-expand-transition>
      <div v-if="query.trim()">
        <v-card v-if="results.length" class="search-results" elevation="1">
          <v-list density="comfortable">
            <v-list-item
              v-for="(result, index) in results"
              :key="`${result.monthId}-${result.section}-${index}`"
              class="search-result"
              rounded="lg"
              @click="selectResult(result)"
            >
              <template #prepend>
                <v-avatar color="primary" variant="tonal" size="36">
                  <v-icon
                    :icon="
                      result.section === 'common_warning_signs'
                        ? 'mdi-alert-outline'
                        : 'mdi-calendar-month-outline'
                    "
                    size="20"
                  />
                </v-avatar>
              </template>

              <v-list-item-title class="search-result__title">
                <span
                  v-for="(part, partIndex) in resultParts(result.text)"
                  :key="partIndex"
                  :class="{ 'search-result__match': part.matched }"
                >
                  {{ part.text }}
                </span>
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ result.monthLabel }} · {{ result.sectionLabel }}
              </v-list-item-subtitle>

              <template #append>
                <v-icon icon="mdi-chevron-right" size="20" />
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-alert
          v-else
          type="info"
          variant="tonal"
          density="comfortable"
          class="search-empty"
        >
          找不到「{{ query.trim() }}」相關內容，試試其他關鍵字。
        </v-alert>
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped>
.content-search {
  margin-bottom: 20px;
}

.search-results {
  margin-top: 12px;
  max-height: 320px;
  overflow-y: auto;
}

.search-result {
  cursor: pointer;
}

.search-result__title {
  white-space: normal;
  line-height: 1.5;
}

.search-result__match {
  padding: 0 2px;
  border-radius: 4px;
  background: rgba(var(--v-theme-primary), 0.18);
  font-weight: 700;
}

.search-empty {
  margin-top: 12px;
}
</style>
