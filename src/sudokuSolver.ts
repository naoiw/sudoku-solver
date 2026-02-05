/**
 * 指定マスに value を置いても、行・列・同一 3x3 ブロックで重複しないか判定する。
 */
export function canPlace(
  grid: (number | null)[][],
  row: number,
  col: number,
  value: number
): boolean {
  // 同じ行で重複
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === value) return false
  }

  // 同じ列で重複
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === value) return false
  }

  // 同一 3x3 ブロックで重複
  const blockRowStart = Math.floor(row / 3) * 3
  const blockColStart = Math.floor(col / 3) * 3
  for (let r = blockRowStart; r < blockRowStart + 3; r++) {
    for (let c = blockColStart; c < blockColStart + 3; c++) {
      if (grid[r][c] === value) return false
    }
  }

  return true
}

/**
 * 深さ優先探索で数独を解く。解が1つ見つかった時点で返す。
 * 解がなければ null を返す。入力 grid は変更しない。
 */
export function solve(
  grid: (number | null)[][]
): (number | null)[][] | null {
  // 空マスを先頭から1つ選ぶ
  let emptyRow = -1
  let emptyCol = -1
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] == null) {
        emptyRow = r
        emptyCol = c
        break
      }
    }
    if (emptyRow >= 0) break
  }

  // 空マスがなければ解として返す
  if (emptyRow < 0) {
    return grid.map((row) => [...row])
  }

  // 1～9 を順に試す
  for (let num = 1; num <= 9; num++) {
    if (!canPlace(grid, emptyRow, emptyCol, num)) continue

    const next = grid.map((r) => [...r])
    next[emptyRow][emptyCol] = num
    const result = solve(next)
    if (result !== null) return result
  }

  return null
}
