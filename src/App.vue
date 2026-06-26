<script setup>
import AppHeader from './components/AppHeader.vue'
import BirthdayEditDialog from './components/BirthdayEditDialog.vue'
import BirthdayOnboardingCard from './components/BirthdayOnboardingCard.vue'
import BirthdayQueryDialog from './components/BirthdayQueryDialog.vue'
import HomeContent from './components/HomeContent.vue'
import { useBirthday } from './composables/useBirthday.js'

const {
  birthday,
  showQueryDialog,
  showEditDialog,
  showOnboarding,
  inputBirthday,
  editBirthday,
  inputError,
  editError,
  ageSummary,
  birthdayDisplay,
  queryBirthdayDisplay,
  maxBirthday,
  finishQueryDialog,
  submitBirthday,
  openEditDialog,
  submitEditBirthday,
} = useBirthday()
</script>

<template>
  <v-app>
    <v-main class="app-main">
      <v-container class="app-container" max-width="720">
        <AppHeader />

        <BirthdayOnboardingCard
          v-if="showOnboarding"
          v-model="inputBirthday"
          :max-birthday="maxBirthday"
          :error="inputError"
          @submit="submitBirthday"
          @update:model-value="inputError = ''"
        />

        <HomeContent
          v-else-if="birthday"
          :age-summary="ageSummary"
          :birthday-display="birthdayDisplay"
          @edit="openEditDialog"
        />
      </v-container>
    </v-main>

    <BirthdayEditDialog
      v-model="showEditDialog"
      v-model:birthday="editBirthday"
      :max-birthday="maxBirthday"
      :error="editError"
      @save="submitEditBirthday"
      @update:birthday="editError = ''"
    />

    <BirthdayQueryDialog
      v-model="showQueryDialog"
      :birthday-display="queryBirthdayDisplay"
      @cancel="finishQueryDialog(false)"
      @confirm="finishQueryDialog(true)"
    />
  </v-app>
</template>
