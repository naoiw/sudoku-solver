const test = require('node:test')
const assert = require('node:assert/strict')
const { solve, canPlace } = require('./dist/sudokuSolver.js')
const { getInvalidCells, hasAnyInvalidCell } = require('./dist/sudokuValidation.js')

const puzzle = [
  '530070000',
  '600195000',
  '098000060',
  '800060003',
  '400803001',
  '700020006',
  '060000280',
  '000419005',
  '000080079',
].map((row) => [...row].map((digit) => digit === '0' ? null : Number(digit)))

const expected = [
  '534678912',
  '672195348',
  '198342567',
  '859761423',
  '426853791',
  '713924856',
  '961537284',
  '287419635',
  '345286179',
].map((row) => [...row].map(Number))

test('standard puzzle is solved without mutating the input', () => {
  const original = puzzle.map((row) => [...row])
  assert.deepEqual(solve(puzzle), expected)
  assert.deepEqual(puzzle, original)
})

test('a completed valid puzzle is returned as a copy', () => {
  const result = solve(expected)
  assert.deepEqual(result, expected)
  assert.notStrictEqual(result, expected)
})

test('duplicate values in a row, column, or block are marked on both cells', () => {
  const invalid = puzzle.map((row) => [...row])
  invalid[0][2] = 5
  const mask = getInvalidCells(invalid)
  assert.equal(mask[0][0], true)
  assert.equal(mask[0][2], true)
  assert.equal(hasAnyInvalidCell(invalid), true)
  assert.equal(solve(invalid), null)
})

test('conflict-free but impossible puzzles have no solution', () => {
  const impossible = puzzle.map((row) => [...row])
  impossible[0][2] = 1
  assert.equal(hasAnyInvalidCell(impossible), false)
  assert.equal(solve(impossible), null)
})

test('candidate placement checks rows, columns and blocks', () => {
  assert.equal(canPlace(puzzle, 0, 2, 4), true)
  assert.equal(canPlace(puzzle, 0, 2, 5), false)
  assert.equal(canPlace(puzzle, 0, 2, 8), false)
})

test('empty input is not mutated by solving', () => {
  const empty = Array.from({ length: 9 }, () => Array(9).fill(null))
  const result = solve(empty)
  assert.ok(result)
  assert.equal(result.flat().filter((value) => value !== null).length, 81)
  assert.ok(empty.flat().every((value) => value === null))
})
