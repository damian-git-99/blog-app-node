export const isEmpty = (field) => {
  const fieldWithoutWhiteSpaces = field.trim()
  if (fieldWithoutWhiteSpaces === '') return true
  return false
}

export const isThereAnEmptyField = (...fields) => {
  for (let i = 0; i < fields.length; i++) {
    if (isEmpty(fields[i])) return true
  }
  return false
}
