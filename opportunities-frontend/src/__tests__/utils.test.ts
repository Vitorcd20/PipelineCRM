import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate } from '../lib/utils'

describe('formatCurrency', () => {
  it('formats positive integer', () => {
    expect(formatCurrency(85000)).toBe('$85,000')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('formats large values with commas', () => {
    expect(formatCurrency(1200000)).toBe('$1,200,000')
  })
})

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2025-01-10T00:00:00.000Z')
    expect(result).toMatch(/Jan/)
    expect(result).toMatch(/2025/)
  })

  it('returns a non-empty string', () => {
    expect(formatDate('2024-12-01T00:00:00.000Z').length).toBeGreaterThan(0)
  })
})
