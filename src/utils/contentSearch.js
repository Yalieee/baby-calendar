const SEARCHABLE_SECTIONS = {
  possible_symptoms: '可能出現的狀況',
  development: '發展重點',
  how_to_handle: '照顧與處理方式',
  caregiver_notes: '照顧者提醒',
}

export function buildSearchIndex(months, commonContent) {
  const items = []

  for (const month of months) {
    for (const [section, sectionLabel] of Object.entries(SEARCHABLE_SECTIONS)) {
      for (const text of month[section] ?? []) {
        items.push({
          monthId: month.id,
          monthLabel: month.label,
          section,
          sectionLabel,
          text,
        })
      }
    }

    for (const vaccine of month.vaccines ?? []) {
      items.push({
        monthId: month.id,
        monthLabel: month.label,
        section: 'vaccines',
        sectionLabel: '疫苗接種',
        text: `${vaccine.name}（${vaccine.age}）`,
      })
    }
  }

  for (const sign of commonContent.common_warning_signs ?? []) {
    items.push({
      monthId: null,
      monthLabel: '全站參考',
      section: 'common_warning_signs',
      sectionLabel: '就醫警訊',
      text: sign,
    })
  }

  return items
}

export function searchContent(index, query, limit = 20) {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return []

  return index
    .filter((item) => item.text.toLowerCase().includes(keyword))
    .slice(0, limit)
}

export function highlightMatch(text, query) {
  const keyword = query.trim()
  if (!keyword) return [{ text, matched: false }]

  const lowerText = text.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const matchIndex = lowerText.indexOf(lowerKeyword)

  if (matchIndex === -1) return [{ text, matched: false }]

  return [
    { text: text.slice(0, matchIndex), matched: false },
    { text: text.slice(matchIndex, matchIndex + keyword.length), matched: true },
    { text: text.slice(matchIndex + keyword.length), matched: false },
  ].filter((part) => part.text)
}
