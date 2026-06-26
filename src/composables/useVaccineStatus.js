import { ref } from 'vue'
import {
  isVaccineCompleted,
  loadVaccineStatus,
  saveVaccineStatus,
  setVaccineCompleted,
} from '../utils/vaccineStatus.js'

const status = ref(loadVaccineStatus())

export function useVaccineStatus() {
  function isCompleted(monthId, vaccine) {
    return isVaccineCompleted(status.value, monthId, vaccine)
  }

  function markCompleted(monthId, vaccine) {
    status.value = setVaccineCompleted(status.value, monthId, vaccine, true)
    saveVaccineStatus(status.value)
  }

  function unmarkCompleted(monthId, vaccine) {
    status.value = setVaccineCompleted(status.value, monthId, vaccine, false)
    saveVaccineStatus(status.value)
  }

  return {
    isCompleted,
    markCompleted,
    unmarkCompleted,
  }
}
