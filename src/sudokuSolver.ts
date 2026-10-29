import {
  type SudokuGrid,
  BOARD_SIZE,
  hasValueInRow,
  hasValueInCol,
  hasValueInBlock,
} from './sudokuUtils'
import { hasAnyInvalidCell } from './sudokuValidation'

/** 指定した空きマスに数字を置けるかを判定する。 */
export function canPlace(
  grid: SudokuGrid,
  row: number,
  col: number,
  value: number
): boolean {
  return (
    !hasValueInRow(grid, row, value) &&
    !hasValueInCol(grid, col, value) &&
    !hasValueInBlock(grid, row, col, value)
  )
}

type CandidateCell = { row: number; col: number; candidates: number[] }

/**
 * 候補数が最も少ない空きマスを優先する（MRV）。
 * 候補ゼロのマスを見つけた場合もそのまま返し、探索を打ち切る。
 */
function findNextCell(grid: SudokuGrid): CandidateCell | null {
  let best: CandidateCell | null = null

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (grid[row][col] !== null) continue

      const candidates: number[] = []
      for (let value = 1; value <= BOARD_SIZE; value++) {
        if (canPlace(grid, row, col, value)) candidates.push(value)
      }

      if (candidates.length === 0) return { row, col, candidates }
      if (best === null || candidates.length < best.candidates.length) {
        best = { row, col, candidates }
        if (candidates.length === 1) return best
      }
    }
  }

  return best
}

/**
 * 数独の解を1つ求める。入力は変更せず、解がなければ null を返す。
 * 最初に重複を検証するため、完成済みの不正な盤面を解と誤認しない。
 */
export function solve(grid: SudokuGrid): SudokuGrid | null {
  if (hasAnyInvalidCell(grid)) return null

  const working = grid.map((row) => [...row])

  function search(): boolean {
    const next = findNextCell(working)
    if (next === null) return true
    if (next.candidates.length === 0) return false

    for (const candidate of next.candidates) {
      working[next.row][next.col] = candidate
      if (search()) return true
    }
    working[next.row][next.col] = null
    return false
  }

  return search() ? working : null
}
