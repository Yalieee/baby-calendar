import { BIRTHDAY_QUERY_PARAM, BIRTHDAY_STORAGE_KEY } from '../constants.js'

export function parseBirthday(value) {
  if (!value || typeof value !== 'string') return null

  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null

  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (date > today) return null

  return `${yearText}-${monthText}-${dayText}`
}

export function loadBirthday() {
  try {
    return parseBirthday(localStorage.getItem(BIRTHDAY_STORAGE_KEY))
  } catch {
    return null
  }
}

export function saveBirthday(birthday) {
  localStorage.setItem(BIRTHDAY_STORAGE_KEY, birthday)
}

export function getBirthdayFromQuery() {
  const params = new URLSearchParams(window.location.search)
  return parseBirthday(params.get(BIRTHDAY_QUERY_PARAM))
}

export function clearBirthdayQueryParam() {
  const url = new URL(window.location.href)
  url.searchParams.delete(BIRTHDAY_QUERY_PARAM)
  window.history.replaceState({}, '', url.pathname + url.search + url.hash)
}

export function getMaxBirthday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatBirthdayDisplay(birthday) {
  const [year, month, day] = birthday.split('-').map(Number)
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function getAgeSummary(birthday) {
  const [year, month, day] = birthday.split('-').map(Number)
  const birth = new Date(year, month - 1, day)
  const today = new Date()

  birth.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24))

  if (totalDays <= 0) return '出生今天'

  if (totalDays < 7) return `出生第 ${totalDays} 天`

  const weeks = Math.floor(totalDays / 7)
  const remainingDays = totalDays % 7

  if (totalDays < 30) {
    return remainingDays > 0
      ? `出生第 ${weeks} 週 ${remainingDays} 天`
      : `出生第 ${weeks} 週`
  }

  let ageYears = today.getFullYear() - birth.getFullYear()
  let ageMonths = today.getMonth() - birth.getMonth()
  let ageDays = today.getDate() - birth.getDate()

  if (ageDays < 0) {
    ageMonths -= 1
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    ageDays += previousMonth.getDate()
  }

  if (ageMonths < 0) {
    ageYears -= 1
    ageMonths += 12
  }

  if (ageYears === 0) {
    const dayPart = ageDays > 0 ? ` ${ageDays} 天` : ''
    return `出生 ${ageMonths} 個月${dayPart}（共 ${totalDays} 天）`
  }

  const monthPart = ageMonths > 0 ? ` ${ageMonths} 個月` : ''
  return `出生 ${ageYears} 歲${monthPart}`
}
