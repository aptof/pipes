function trimLeft (value:string, charlist:string): string {
  if (charlist === undefined)
    charlist = ' ';

  return value.replace(new RegExp("^[" + charlist + "]+"), "");
};

export const inr = (value:any) => {
  if (!theFormatIsOk(value)) return 'invalid!!'
  return inrWithSymbol(value.toString().trim())
}

function theFormatIsOk(value:any) {
  if (value === 0) return true
  if (!value) return false

  value = value.toString()
  if (value.trim().length <= 0) return false

  const reg = /^(\d*\.)?\d+$/
  if (!reg.test(value)) return false
  return true
}

function inrWithSymbol(value:string) {
  const symbol = '₹'
  return symbol + formatAsInr(value)
}

function formatAsInr(value:string) {
  let values = value.split('.')
  return formatDigitsBeforePoint(trimLeadingZero(values[0])) + '.' + formatDigitsAfterPoint(values[1])
}

function trimLeadingZero(value:string) {
  return trimLeft(value, '0')
}

function formatDigitsBeforePoint(value:string) {
  if (value.length <= 0) return '0'
  let digits = [...value].reverse()
  let commaDigits = []
  for (let i = 0; i < digits.length; i++) {
    if (needsComma(i)) {
      commaDigits.push(',')
    }
    commaDigits.push(digits[i])
  }
  return commaDigits.reverse().join('')
}

function needsComma(index:number) {
  let adjustedIndex = (index + 1) % 7
  if (index > 6 && adjustedIndex == 1) return true
  else if (adjustedIndex == 4 || adjustedIndex == 6) return true
  else return false
}

function formatDigitsAfterPoint(value:string) {
  if (!value) return '00'
  let digits = [...value]
  digits.push('0')
  digits.push('0')
  return roundUptoTwoDecimalPlace(digits)
}

function roundUptoTwoDecimalPlace(digits:string[]) {
  if (Number(digits[2]) < 5) {
    return digits[0] + digits[1]
  } else {
    let secondDigit = Number(digits[1])
    return digits[0] + (++secondDigit)
  }
}

export const inrWord = (value:any) => {
  if (!theFormatIsOk(value)) return 'invalid!!'
  return inrWordWithSymbol(value.toString().trim())
}

function inrWordWithSymbol(value:string) {
  const rupees = 'Rupees '
  const paisa = ' Paisa Only'
  return rupees + formatAsInrWord(value) + paisa
}

function formatAsInrWord(value:string) {
  let inr = formatAsInr(value)
  let values = inr.split('.')
  return wordDigitsBeforePoint(values[0]) + ' and ' + wordDigitsAfterPoint(values[1])
}

function wordDigitsBeforePoint(value:string) {
  if (value.length <= 3) {
    return makeWord(value)
  } else {
    return makeWordFromInr(value)
  }
}

function makeWordFromInr(inr:string) {
  let blocks = inr.split(',').reverse()
  let words = []
  for (let i = 0; i < blocks.length; i++) {
    let num = Number(blocks[i])
    if (num > 0) {
      words.push(getMeasurementWord(i))
      words.push(makeWord(blocks[i]))
    }
  }
  return words.reverse().join(' ').trim()
}

function getMeasurementWord(index:number) {
  let map = ['', 'Thousand', 'Lakh', 'Crore']
  return map[index]
}

function wordDigitsAfterPoint(value:string) {
  return makeWord(value)
}

//Prepare word for only upto three digits
function makeWord(value:string) {
  if (!value) return 'Zero'
  if (trimLeft(value, '0').length <= 0) return 'Zero'
  if (value.length == 1) {
    return makeWordOfSingleDigit(value)
  } else if (value.length == 2) {
    return makeWordOfDoubleDigit(value)
  } else {
    return makeWordOfTrippleDigit(value)
  }
}

function makeWordOfSingleDigit(value:string) {
  let map = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  return map[Number(value)]
}

function makeWordOfDoubleDigit(value:string) {
  let map = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  let tenthMap = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  let num = Number(value)
  if (num == 0) {
    return ''
  } else if (num < 10) {
    return makeWordOfSingleDigit(num.toString())
  } else if (num < 20) {
    return map[num - 10]
  } else {
    let unitDigit = num % 10
    let tenthDigit = (num - unitDigit) / 10
    if (unitDigit == 0) {
      return tenthMap[tenthDigit]
    } else {
      return tenthMap[tenthDigit] + ' ' + makeWordOfSingleDigit(unitDigit.toString())
    }
  }
}

function makeWordOfTrippleDigit(value:string) {
  let num = Number(value)
  if (num <= 0) {
    return ''
  }
  if (value[0] == '0') {
    return makeWordOfDoubleDigit(value.substring(1, 3))
  }
  if (num % 100 <= 0) {
    return makeWordOfSingleDigit(value[0]) + ' Hundred'
  } else {
    return makeWordOfSingleDigit(value[0]) + ' Hundred ' + makeWordOfDoubleDigit(value.substring(1, 3))
  }
}