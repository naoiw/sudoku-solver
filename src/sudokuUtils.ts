/** 盤面のサイズ（9x9） */
export const BOARD_SIZE = 9

/** ブロックのサイズ（3x3） */
export const BLOCK_SIZE = 3

/** 数独の盤面型（空きマスは null） */
export type SudokuGrid = (number | null)[][]

/**
 * 行・列インデックスから、そのマスが属する 3x3 ブロックの先頭行/列を返す。
 */
export function getBlockStart(index: number): number {
  return Math.floor(index / BLOCK_SIZE) * BLOCK_SIZE
}

/**
 * 指定行に value が存在するか。skipCol を指定するとその列は無視（自マス除外用）。
 */
export function hasValueInRow(
  grid: SudokuGrid,
  row: number,
  value: number,
  skipCol?: number
): boolean {
  for (let c = 0; c < BOARD_SIZE; c++) {
    if (c === skipCol) continue
    if (grid[row][c] === value) return true
  }
  return false
}

/**
 * 指定列に value が存在するか。skipRow を指定するとその行は無視（自マス除外用）。
 */
export function hasValueInCol(
  grid: SudokuGrid,
  col: number,
  value: number,
  skipRow?: number
): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    if (r === skipRow) continue
    if (grid[r][col] === value) return true
  }
  return false
}

/**
 * (row, col) が属する 3x3 ブロック内に value が存在するか。
 * skipRow, skipCol を指定するとそのマスは無視（自マス除外用）。
 */
export function hasValueInBlock(
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number,
  skipRow?: number,
  skipCol?: number
): boolean {
  const blockRowStart = getBlockStart(row)
  const blockColStart = getBlockStart(col)
  for (let r = blockRowStart; r < blockRowStart + BLOCK_SIZE; r++) {
    for (let c = blockColStart; c < blockColStart + BLOCK_SIZE; c++) {
      if (r === skipRow && c === skipCol) continue
      if (grid[r][c] === value) return true
    }
  }
  return false
}
