import {
  type SudokuGrid,
  BOARD_SIZE,
  hasValueInRow,
  hasValueInCol,
  hasValueInBlock,
} from './sudokuUtils'

/** 行・列・3×3ブロック内の重複があれば、そのマスを不正と判定する。 */
export function isCellInvalid(
  grid: SudokuGrid,
  row: number,
  col: number
): boolean {
  const value = grid[row]?.[col]
  if (value == null) return false

  return (
    hasValueInRow(grid, row, value, col) ||
    hasValueInCol(grid, col, value, row) ||
    hasValueInBlock(grid, row, col, value, row, col)
  )
}

/** 盤面の表示に使う不正マスの一覧を一度に求める。 */
export function getInvalidCells(grid: SudokuGrid): boolean[][] {
  return Array.from({ length: BOARD_SIZE }, (_, row) =>
    Array.from({ length: BOARD_SIZE }, (_, col) =>
      isCellInvalid(grid, row, col)
    )
  )
}

export function hasAnyInvalidCell(grid: SudokuGrid): boolean {
  return getInvalidCells(grid).some((row) => row.some(Boolean))
}
