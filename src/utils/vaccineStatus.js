import { VACCINE_STATUS_STORAGE_KEY } from '../constants.js'

export function getVaccineKey(vaccine) {
  return `${vaccine.age}|${vaccine.name}`
}

export function loadVaccineStatus() {
  try {
    const raw = localStorage.getItem(VACCINE_STATUS_STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function saveVaccineStatus(status) {
  localStorage.setItem(VACCINE_STATUS_STORAGE_KEY, JSON.stringify(status))
}

export function isVaccineCompleted(status, monthId, vaccine) {
  const monthKey = String(monthId)
  const vaccineKey = getVaccineKey(vaccine)
  return Boolean(status[monthKey]?.[vaccineKey])
}

export function setVaccineCompleted(status, monthId, vaccine, completed) {
  const monthKey = String(monthId)
  const vaccineKey = getVaccineKey(vaccine)
  const next = { ...status }

  if (completed) {
    next[monthKey] = {
      ...(next[monthKey] ?? {}),
      [vaccineKey]: true,
    }
    return next
  }

  if (!next[monthKey]) return next

  const monthStatus = { ...next[monthKey] }
  delete monthStatus[vaccineKey]

  if (Object.keys(monthStatus).length === 0) {
    delete next[monthKey]
  } else {
    next[monthKey] = monthStatus
  }

  return next
}
