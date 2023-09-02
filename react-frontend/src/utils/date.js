import { DateTime } from 'luxon'

/**
 * Formats a date or calculates days ago for a given UTC date, converts it to the user's local time zone, and allows custom date formatting.
 * @param {string} utcDate - The UTC date string to be formatted.
 * @param {string} [format='yyyy MMMM dd'] - The custom date format to be used (default is 'yyyy MMMM dd').
 * @returns {string} - A formatted date string or "today" or "X days ago" based on the input date.
 */
export function formatDateOrDaysAgo (utcDate, format = 'yyyy MMMM dd') {
  // Convert the provided UTC date string to a DateTime object in UTC.
  const utcDateTime = DateTime.fromISO(utcDate, { zone: 'utc' })

  // Specify the desired time zone (in this example, 'Asia/Tokyo'). Intl.DateTimeFormat().resolvedOptions().timeZone
  const desiredTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Convert the UTC date to the desired time zone.
  const dateTimeInDesiredTimeZone = utcDateTime.setZone(desiredTimeZone)

  // Calculate the difference in days between the converted date and the current date.
  const today = DateTime.now()
  let daysDifference = Math.abs(dateTimeInDesiredTimeZone.diff(today, 'days').days)
  daysDifference = Math.floor(daysDifference)
  let message

  if (daysDifference > 30) {
    message = dateTimeInDesiredTimeZone.toFormat(format)
  } else if (daysDifference === 0) {
    message = 'today'
  } else if (daysDifference < 30) {
    message = `${Math.abs(daysDifference)} days ago`
  }

  return message
}
