import {mobile, aadhaar} from './numberFilter'

describe('Mobile filter', () => {
  test.each([
    ['!!invalid', undefined],
    ['!!invalid', null],
    ['!!invalid', ''],
    ['!!invalid', ' '],
    ['!!invalid', 'ABCDEFGHIJ'],
    ['977 577 9056', '9775779056'],
    ['864 088 407', '864088407'],
    ['864 088 40', '86408840'],
    ['864 088 4', '8640884'],
    ['864 088', '864088'],
    ['864 08', '86408'],
    ['864 0', '8640'],
    ['864', '864'],
    ['86', '86'],
    ['8', '8'],
  ])('returns %p if value is %p', (expected, value) => {
    expect(mobile(value)).toBe(expected)
  })
})

describe('Aadhaar Filter', () =>{
  test.each([
    ['!!invalid', undefined],
    ['!!invalid', null],
    ['!!invalid', ''],
    ['!!invalid', ' '],
    ['!!invalid', 'ABCDEFGHIJ'],
    ['5697 7577 9056', '569775779056'],
    ['1986 4088 4079', '198640884079'],
    ['1', '1'],
    ['19', '19'],
    ['198', '198'],
    ['1985', '1985'],
    ['1985 4', '19854'],
    ['1985 46', '198546'],
    ['1985 462', '1985462'],
    ['1985 4625', '19854625'],
    ['1985 4625 1', '198546251'],
    ['1985 4625 12', '1985462512'],
    ['1985 4625 123', '19854625123'],
    ['1985 4625 1234', '1985462512346'],
  ])('returns %p if value is %p', (expected, value) => {
    expect(aadhaar(value)).toBe(expected)
  })
})