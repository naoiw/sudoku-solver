import { useState, useCallback, useEffect } from 'react'
import { isCellInvalid, hasAnyInvalidCell } from './sudokuValidation'

const EMPTY_GRID: (number | null)[][] = Array.from({ length: 9 }, () =>
  Array(9).fill(null)
)

type SelectedCell = { row: number; col: number } | null

function App() {
  const [grid, setGrid] = useState<(number | null)[][]>(() =>
    EMPTY_GRID.map((row) => [...row])
  )
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col })
  }, [])

  const handleReset = useCallback(() => {
    setGrid(EMPTY_GRID.map((row) => [...row]))
    setSelectedCell(null)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCell == null) return
      const key = e.key
      if (key >= '1' && key <= '9') {
        e.preventDefault()
        const num = Number(key)
        setGrid((prev) => {
          const next = prev.map((r) => [...r])
          next[selectedCell.row][selectedCell.col] = num
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell])

  return (
    <div className="app">
      <div className="board-wrapper">
        <div className="board" role="grid" aria-label="数独の盤面">
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''} ${isCellInvalid(grid, rowIndex, colIndex) ? 'invalid' : ''} ${colIndex === 2 || colIndex === 5 ? 'block-right' : ''} ${rowIndex === 2 || rowIndex === 5 ? 'block-bottom' : ''}`}
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
          title={hasAnyInvalidCell(grid) ? '不正な入力があります' : '未実装'}
        >
          Solve
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
