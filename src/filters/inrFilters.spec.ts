import {
  inr,
  inrWord
} from './inrFilters'

describe('Playground', () => {
  it('regex', () => {
    expect(typeof 0).toBe('number')
  })
})

describe('inr filter', () => {
  it.each([
    [undefined],
    [null],
    ['25 .3'],
    ['ab.cd']
  ])('returns "invalid!!" if vlaue %p', (value) => {
    expect(inr(value)).toBe('invalid!!')
  })

  it.each([
    ['₹0.20', '.2'],
    ['₹0.00', '000.00'],
    ['₹0.00', '0.00'],
    ['₹0.60', '0.6'],
    ['₹0.05', '0.05'],
    ['₹0.23', '0.23'],
    ['₹0.00', '0'],
    ['₹6.00', '6'],
    ['₹56.00', '56'],
    ['₹456.00', '456'],
    ['₹3,456.00', '3456'],
    ['₹23,456.00', '23456'],
    ['₹1,23,456.00', '123456'],
    ['₹51,23,456.00', '5123456'],
    ['₹5,61,23,456.00', '56123456'],
    ['₹1,23,456.40', '123456.4'],
    ['₹1,23,456.32', '123456.32'],
    ['₹1,23,456.32', '123456.3245'],
    ['₹1,23,456.34', '123456.335'],
    ['₹1,23,456.34', '123456.338'],
    ['₹27,21,23,456.00', '272123456'],
    ['₹527,21,23,456.00', '5272123456'],
    ['₹8,527,21,23,456.00', '85272123456'],
    ['₹98,527,21,23,456.00', '985272123456'],
    ['₹3,98,527,21,23,456.00', '3985272123456'],
    ['₹3,98,527,21,23,456.00', '03985272123456'],
    ['₹0.20', .2],
    ['₹0.00', 0.00],
    ['₹0.00', 0],
  ])('inr returns %p while value %p', (expected, value) => {
    expect(inr(value)).toBe(expected)
  })
})


describe('inrWord filter', () => {
  it('returns "invalid!!" if the value is not decimal', () => {
    expect(inrWord('2345v')).toBe('invalid!!')
  })

  it.each([
    [undefined],
    [null]
  ])('returns "invalid!!" if vlaue %p', (value) => {
    expect(inrWord(value)).toBe('invalid!!')
  })

  it.each([
    ['Rupees Zero and Zero Paisa Only', '0'],
    ['Rupees One and Zero Paisa Only', '1'],
    ['Rupees Five and Zero Paisa Only', '5'],
    ['Rupees Ten and Zero Paisa Only', '10'],
    ['Rupees Sixteen and Zero Paisa Only', '16'],
    ['Rupees Nineteen and Zero Paisa Only', '19'],
    ['Rupees Twenty and Zero Paisa Only', '20'],
    ['Rupees Thirty One and Zero Paisa Only', '31'],
    ['Rupees Forty Six and Zero Paisa Only', '46'],
    ['Rupees Ninety Nine and Zero Paisa Only', '99'],
    ['Rupees One Hundred and Zero Paisa Only', '100'],
    ['Rupees Two Hundred Three and Zero Paisa Only', '203'],
    ['Rupees Five Hundred Thirteen and Zero Paisa Only', '513'],
    ['Rupees Eight Hundred Sixty Seven and Zero Paisa Only', '867'],
    ['Rupees One Thousand and Zero Paisa Only', '1000'],
    ['Rupees One Thousand One and Zero Paisa Only', '1001'],
    ['Rupees One Thousand Eleven and Zero Paisa Only', '1011'],
    ['Rupees One Thousand Forty Five and Zero Paisa Only', '1045'],
    ['Rupees One Thousand One Hundred Eleven and Zero Paisa Only', '1111'],
    ['Rupees Fifty Four Thousand Three Hundred Twenty One and Zero Paisa Only', '54321'],
    ['Rupees Thirty One and Five Paisa Only', '31.05'],
    ['Rupees Thirty One and Twenty Five Paisa Only', '31.25'],
    ['Rupees Thirty One and Fifty Paisa Only', '31.50'],
  ])('inrWord returns %p while value %p', (expected, value) => {
    expect(inrWord(value)).toBe(expected)
  })
})