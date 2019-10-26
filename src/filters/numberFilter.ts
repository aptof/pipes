export const mobile = (value:any) => {
  if (!(value = isString(value))) return '!!invalid'
  if (!numbersOnly(value)) return '!!invalid'
  if (value.length > 10) {
    value = value.substr(0, 10)
  }

  return formatMobile(value)
}

function isString(value:any) {
  if (!value) return false
  else return value.toString().trim()
}

function numbersOnly(value:string) {
  const reg = /^\d+$/
  return reg.test(value)
}

function formatMobile(value:string) {
  let digits = [...value]
  let formatedDigits = []
  for (let i = 0; i < digits.length; i++) {
    if (i == 3 || i == 6) {
      formatedDigits.push(' ')
    }
    formatedDigits.push(digits[i])
  }
  return formatedDigits.join('')
}

export const aadhaar = (value:any) => {
  if (!(value = isString(value))) return '!!invalid'
  if (!numbersOnly(value)) return '!!invalid'
  if (value.length > 12) {
    value = value.substr(0, 12)
  }
  return formatAadhaar(value)
}

function formatAadhaar(value:string) {
  let values = [...value]
  let formattedValue = []
  for (let i = 0; i < values.length; i++) {
    if (i == 4 || i == 8) {
      formattedValue.push(' ')
    }
    formattedValue.push(values[i])
  }
  return formattedValue.join('')
}