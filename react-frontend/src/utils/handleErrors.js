export function getErrorMessage (error) {
  let message = error.response && error.response.data.error
    ? error.response.data.error
    : error.error
  if (!message) {
    message = extractErrors(error.response.data.validationErrors)
  }
  return message
}

function extractErrors (errors) {
  if (!errors) {
    return 'Unknown error'
  }

  if (typeof errors === 'object') {
    const errorsValues = Object.values(errors)
    return errorsValues.join(' ')
  }

  if (Array.isArray(errors)) {
    return errors.join(' ')
  }
}
