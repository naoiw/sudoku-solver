import { useCallback, useMemo, useState } from 'react'
import { solve } from '../sudokuSolver'
import { getInvalidCells } from '../sudokuValidation'
import { BOARD_SIZE, type SudokuGrid } from '../sudokuUtils'

export type CellPosition = { row: number; col: number }
type PuzzleStatus = 'editing' | 'solved' | 'unsolvable'
type PuzzleState = {
  grid: SudokuGrid
  solverCells: boolean[][]
  status: PuzzleStatus
}

function emptyGrid(): SudokuGrid {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
}

function emptySolverCells(): boolean[][] {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false))
}

function newPuzzle(grid: SudokuGrid = emptyGrid()): PuzzleState {
  return { grid, solverCells: emptySolverCells(), status: 'editing' }
}

export function useSudoku() {
  const [puzzle, setPuzzle] = useState<PuzzleState>(() => newPuzzle())
  const [selected, setSelected] = useState<CellPosition>({ row: 0, col: 0 })

  const invalidCells = useMemo(() => getInvalidCells(puzzle.grid), [puzzle.grid])
  const invalidCount = invalidCells.flat().filter(Boolean).length
  const givenCount = puzzle.grid.flat().filter((value) => value !== null).length -
    puzzle.solverCells.flat().filter(Boolean).length
  const solvedCount = puzzle.solverCells.flat().filter(Boolean).length
  const canSolve = invalidCount === 0 && givenCount > 0 && puzzle.status !== 'solved'

  /** 解答済みの盤面を編集する場合、先に自動入力した数字をすべて戻す。 */
  const setCell = useCallback((row: number, col: number, value: number | null) => {
    setPuzzle((current) => {
      const grid = current.grid.map((values, r) =>
        values.map((cell, c) => current.solverCells[r][c] ? null : cell)
      )
      if (grid[row][col] === value && current.status === 'editing') return current
      grid[row][col] = value
      return newPuzzle(grid)
    })
  }, [])

  const solvePuzzle = useCallback(() => {
    if (!canSolve) return
    const result = solve(puzzle.grid)
    if (!result) {
      setPuzzle((current) => ({ ...current, status: 'unsolvable' }))
      return
    }

    setPuzzle((current) => ({
      grid: result,
      solverCells: current.grid.map((row, r) =>
        row.map((value, c) => value === null && result[r][c] !== null)
      ),
      status: 'solved',
    }))
  }, [canSolve, puzzle.grid])

  const clearSolution = useCallback(() => {
    setPuzzle((current) => newPuzzle(current.grid.map((row, r) =>
      row.map((value, c) => current.solverCells[r][c] ? null : value)
    )))
  }, [])

  const reset = useCallback(() => {
    setPuzzle(newPuzzle())
    setSelected({ row: 0, col: 0 })
  }, [])

  return {
    ...puzzle,
    selected,
    setSelected,
    setCell,
    solvePuzzle,
    clearSolution,
    reset,
    invalidCells,
    invalidCount,
    givenCount,
    solvedCount,
    canSolve,
  }
}
