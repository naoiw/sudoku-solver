import { useState, useCallback, useEffect } from 'react'
import { isCellInvalid, hasAnyInvalidCell } from './sudokuValidation'
import { solve } from './sudokuSolver'

const EMPTY_GRID: (number | null)[][] = Array.from({ length: 9 }, () =>
  Array(9).fill(null)
)

const EMPTY_SOLVER_FILLED: boolean[][] = Array.from({ length: 9 }, () =>
  Array(9).fill(false)
)

type SelectedCell = { row: number; col: number } | null

function App() {
  const [grid, setGrid] = useState<(number | null)[][]>(() =>
    EMPTY_GRID.map((row) => [...row])
  )
  const [solverFilledCells, setSolverFilledCells] = useState<boolean[][]>(() =>
    EMPTY_SOLVER_FILLED.map((row) => [...row])
  )
  const [solveError, setSolveError] = useState<string | null>(null)
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col })
  }, [])

  const handleSolve = useCallback(() => {
    const solution = solve(grid)
    if (solution !== null) {
      setGrid(solution)
      setSolverFilledCells(
        grid.map((row, r) =>
          row.map((_, c) => grid[r][c] === null && solution[r][c] != null)
        )
      )
      setSolveError(null)
    } else {
      setSolveError('解が存在しません')
    }
  }, [grid])

  const handleClear = useCallback(() => {
    setGrid((prev) =>
      prev.map((row, r) =>
        row.map((val, c) =>
          solverFilledCells[r][c] ? null : val
        )
      )
    )
    setSolverFilledCells(EMPTY_SOLVER_FILLED.map((row) => [...row]))
    setSolveError(null)
  }, [solverFilledCells])

  const handleReset = useCallback(() => {
    setGrid(EMPTY_GRID.map((row) => [...row]))
    setSolverFilledCells(EMPTY_SOLVER_FILLED.map((row) => [...row]))
    setSolveError(null)
    setSelectedCell(null)
  }, [])

  const clearSelectedCell = useCallback(() => {
    if (selectedCell == null) return
    const { row, col } = selectedCell
    setGrid((prev) => {
      const next = prev.map((r) => [...r])
      next[row][col] = null
      return next
    })
    setSolverFilledCells((prev) => {
      const next = prev.map((r) => [...r])
      next[row][col] = false
      return next
    })
  }, [selectedCell])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCell == null) return
      const key = e.key
      if (key >= '1' && key <= '9') {
        e.preventDefault()
        const num = Number(key)
        const row = selectedCell.row
        const col = selectedCell.col
        setGrid((prev) => {
          const next = prev.map((r) => [...r])
          next[row][col] = num
          return next
        })
        setSolverFilledCells((prev) => {
          const next = prev.map((r) => [...r])
          next[row][col] = false
          return next
        })
      } else if (key === '0' || key === ' ' || key === 'Delete' || key === 'Backspace') {
        e.preventDefault()
        clearSelectedCell()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, clearSelectedCell])

  return (
    <div className="app">
      <div className="board-wrapper">
        <div className="board" role="grid" aria-label="数独の盤面">
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''} ${isCellInvalid(grid, rowIndex, colIndex) ? 'invalid' : ''} ${solverFilledCells[rowIndex][colIndex] ? 'solver-filled' : ''} ${colIndex === 2 || colIndex === 5 ? 'block-right' : ''} ${rowIndex === 2 || rowIndex === 5 ? 'block-bottom' : ''}`}
                role="gridcell"
                aria-selected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                aria-invalid={isCellInvalid(grid, rowIndex, colIndex) ? true : undefined}
                tabIndex={0}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                }}
              >
                {value != null ? value : ''}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="solve"
          disabled={hasAnyInvalidCell(grid)}
          title={hasAnyInvalidCell(grid) ? '不正な入力があります' : '解を求める'}
          onClick={handleSolve}
        >
          Solve
        </button>
        <button
          type="button"
          className="clear"
          title="ソルバーが埋めた数字だけを削除"
          onClick={handleClear}
          disabled={!solverFilledCells.some((row) => row.some(Boolean))}
        >
          Clear
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        {solveError != null && (
          <p className="solve-error" role="alert">
            {solveError}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
