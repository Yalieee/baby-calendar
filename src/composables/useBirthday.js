import { computed, onMounted, ref } from 'vue'
import {
  clearBirthdayQueryParam,
  formatBirthdayDisplay,
  getAgeSummary,
  getBirthdayFromQuery,
  getMaxBirthday,
  loadBirthday,
  parseBirthday,
  saveBirthday,
} from '../utils/birthday.js'

const INVALID_BIRTHDAY_MESSAGE = '請輸入有效的新生兒生日，且不能是未來日期。'

export function useBirthday() {
  const birthday = ref(null)
  const showQueryDialog = ref(false)
  const showEditDialog = ref(false)
  const showOnboarding = ref(false)
  const queryBirthday = ref(null)
  const inputBirthday = ref('')
  const editBirthday = ref('')
  const inputError = ref('')
  const editError = ref('')

  const ageSummary = computed(() =>
    birthday.value ? getAgeSummary(birthday.value) : '',
  )
  const birthdayDisplay = computed(() =>
    birthday.value ? formatBirthdayDisplay(birthday.value) : '',
  )
  const queryBirthdayDisplay = computed(() =>
    queryBirthday.value ? formatBirthdayDisplay(queryBirthday.value) : '',
  )
  const maxBirthday = computed(() => getMaxBirthday())

  function applyBirthday(value) {
    birthday.value = value
    saveBirthday(value)
    showOnboarding.value = false
    inputError.value = ''
  }

  function finishQueryDialog(shouldApply) {
    if (shouldApply && queryBirthday.value) {
      applyBirthday(queryBirthday.value)
    } else if (!birthday.value) {
      showOnboarding.value = true
    }

    showQueryDialog.value = false
    queryBirthday.value = null
    clearBirthdayQueryParam()
  }

  function submitBirthday() {
    const parsed = parseBirthday(inputBirthday.value)

    if (!parsed) {
      inputError.value = INVALID_BIRTHDAY_MESSAGE
      return
    }

    applyBirthday(parsed)
  }

  function openEditDialog() {
    editBirthday.value = birthday.value ?? ''
    editError.value = ''
    showEditDialog.value = true
  }

  function submitEditBirthday() {
    const parsed = parseBirthday(editBirthday.value)

    if (!parsed) {
      editError.value = INVALID_BIRTHDAY_MESSAGE
      return
    }

    applyBirthday(parsed)
    showEditDialog.value = false
  }

  function initializeBirthday() {
    const storedBirthday = loadBirthday()
    const queryValue = getBirthdayFromQuery()

    if (queryValue) {
      queryBirthday.value = queryValue
      showQueryDialog.value = true

      if (storedBirthday) {
        birthday.value = storedBirthday
      }

      return
    }

    if (storedBirthday) {
      birthday.value = storedBirthday
      return
    }

    showOnboarding.value = true
  }

  onMounted(initializeBirthday)

  return {
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
  }
}
