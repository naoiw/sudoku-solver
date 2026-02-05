/**
 * 指定マスが不正かどうかを判定する。
 * 空きマス（null）は常に不正ではない。
 * 同じ行・列・同一 3x3 ブロック内に同じ数字が他に1つでもあれば true。
 */
export function isCellInvalid(
  grid: (number | null)[][],
  row: number,
  col: number
): boolean {
  const value = grid[row]?.[col]
  if (value == null) return false

  // 同じ行で重複
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === value) return true
  }

  // 同じ列で重複
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === value) return true
  }

  // 同一 3x3 ブロックで重複
  const blockRowStart = Math.floor(row / 3) * 3
  const blockColStart = Math.floor(col / 3) * 3
  for (let r = blockRowStart; r < blockRowStart + 3; r++) {
    for (let c = blockColStart; c < blockColStart + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c] === value) return true
    }
  }

  return false
}

/**
 * 盤面全体に不正なマスが1つでもあるかどうかを判定する。
 */
export function hasAnyInvalidCell(grid: (number | null)[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (isCellInvalid(grid, row, col)) return true
    }
  }
  return false
}
