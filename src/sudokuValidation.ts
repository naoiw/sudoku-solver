import {
  type SudokuGrid,
  BOARD_SIZE,
  hasValueInRow,
  hasValueInCol,
  hasValueInBlock,
} from './sudokuUtils'

/**
 * 指定マスが不正かどうかを判定する。
 * 空きマス（null）は常に不正ではない。
 * 同じ行・列・同一 3x3 ブロック内に同じ数字が他に1つでもあれば true。
 */
export function isCellInvalid(
  grid: SudokuGrid,
  row: number,
  col: number
): boolean {
  const value = grid[row]?.[col]
  if (value == null) return false

  if (hasValueInRow(grid, row, value, col)) return true
  if (hasValueInCol(grid, col, value, row)) return true
  if (hasValueInBlock(grid, row, col, value, row, col)) return true

  return false
}

/**
 * 盤面全体に不正なマスが1つでもあるかどうかを判定する。
 */
export function hasAnyInvalidCell(grid: SudokuGrid): boolean {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isCellInvalid(grid, row, col)) return true
    }
  }
  return false
}
