import { expect, test } from 'vitest'

test('check if it works', () => {
  expect(2 + 2).toBe(4)
})

test('check if it works again ', () => {
  expect(3 + 3).not.toBe(4)
})

test('another check if it works again ', () => {
  expect(3 + 2).not.toBe(4)
})

test('check if it works', () => {
  expect(3 + 3).toBe(6)
})
