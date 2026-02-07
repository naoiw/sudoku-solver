import {
  type SudokuGrid,
  BOARD_SIZE,
  hasValueInRow,
  hasValueInCol,
  hasValueInBlock,
} from './sudokuUtils'

/**
 * 指定マスに value を置いても、行・列・同一 3x3 ブロックで重複しないか判定する。
 */
export function canPlace(
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number
): boolean {
  if (hasValueInRow(grid, row, value)) return false
  if (hasValueInCol(grid, col, value)) return false
  if (hasValueInBlock(grid, row, col, value)) return false
  return true
}

/**
 * 先頭から見て最初の空きマスの位置を返す。空きマスがなければ null。
 */
function findEmptyCell(grid: SudokuGrid): { row: number; col: number } | null {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (grid[r][c] == null) return { row: r, col: c }
    }
  }
  return null
}

/**
 * 深さ優先探索で数独を解く。解が1つ見つかった時点で返す。
 * 解がなければ null を返す。入力 grid は変更しない。
 */
export function solve(grid: SudokuGrid): SudokuGrid | null {
  const empty = findEmptyCell(grid)
  if (empty === null) {
    return grid.map((row) => [...row])
  }

  const { row: emptyRow, col: emptyCol } = empty

  for (let num = 1; num <= 9; num++) {
    if (!canPlace(grid, emptyRow, emptyCol, num)) continue

    const next = grid.map((r) => [...r])
    next[emptyRow][emptyCol] = num
    const result = solve(next)
    if (result !== null) return result
  }

  return null
}
