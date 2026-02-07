import { useState, useCallback } from 'react'
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

  const handleCellInputChange = useCallback(
    (row: number, col: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      if (v === '') {
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
        return
      }
      const last = v.slice(-1)
      const n = parseInt(last, 10)
      if (n >= 1 && n <= 9) {
        setGrid((prev) => {
          const next = prev.map((r) => [...r])
          next[row][col] = n
          return next
        })
        setSolverFilledCells((prev) => {
          const next = prev.map((r) => [...r])
          next[row][col] = false
          return next
        })
      }
    },
    []
  )

  const handleCellInputKeyDown = useCallback(
    (row: number, col: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === '0' || e.key === ' ' || e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
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
      }
    },
    []
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">sudoku-solver</h1>
        <p className="app-description">solveボタンを押すと数独の盤面を解きます</p>
      </header>
      <div className="app-main">
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
              >
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value != null ? String(value) : ''}
                  onChange={(e) => handleCellInputChange(rowIndex, colIndex, e)}
                  onKeyDown={(e) => handleCellInputKeyDown(rowIndex, colIndex, e)}
                  onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                  aria-label={`${rowIndex + 1} 行 ${colIndex + 1} 列`}
                />
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
    </div>
  )
}

export default App
