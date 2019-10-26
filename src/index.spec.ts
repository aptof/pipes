import {inr, inrWord, mobile, aadhaar} from './index'

describe('Index.js', () => {
  it('inr exported', () => {
    expect(inr(1234)).toBe('₹1,234.00')
  })

  it('inrWord exported', () => {
    expect(inrWord(5678)).toBe('Rupees Five Thousand Six Hundred Seventy Eight and Zero Paisa Only')
  })

  it('mobile exported', () => {
    expect(mobile(8640884079)).toBe('864 088 4079')
  })

  it('aadhaar exported', () => {
    expect(aadhaar(123456789123)).toBe('1234 5678 9123')
  })
})