import common from './common.json'

const monthModules = import.meta.glob('./months/*.json', { eager: true })

export function getAllMonths() {
  return Object.values(monthModules)
    .map((module) => module.default ?? module)
    .sort((a, b) => a.id - b.id)
}

export function getMonthById(id) {
  return getAllMonths().find((month) => month.id === id) ?? null
}

export function getCommonContent() {
  return common
}
