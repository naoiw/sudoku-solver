import { useRef, type KeyboardEvent } from 'react'
import type { CellPosition } from '../hooks/useSudoku'
import { BOARD_SIZE, type SudokuGrid } from '../sudokuUtils'

type Props = {
  grid: SudokuGrid
  invalidCells: boolean[][]
  solverCells: boolean[][]
  selected: CellPosition
  onSelect: (position: CellPosition) => void
  onDigit: (row: number, col: number, value: number | null) => void
}

export function SudokuBoard({
  grid, invalidCells, solverCells, selected, onSelect, onDigit,
}: Props) {
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, row: number, col: number) {
    const key = event.key
    if (/^[1-9]$/.test(key)) {
      event.preventDefault()
      onDigit(row, col, Number(key))
      return
    }
    if (key === '0' || key === 'Backspace' || key === 'Delete' || key === ' ') {
      event.preventDefault()
      onDigit(row, col, null)
      return
    }

    const delta: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    }
    if (key in delta) {
      event.preventDefault()
      const [dr, dc] = delta[key]
      const nextRow = Math.max(0, Math.min(BOARD_SIZE - 1, row + dr))
      const nextCol = Math.max(0, Math.min(BOARD_SIZE - 1, col + dc))
      cellRefs.current[nextRow * BOARD_SIZE + nextCol]?.focus()
    }
  }

  const selectedValue = grid[selected.row][selected.col]

  return (
    <div className="sudoku-board" role="grid" aria-label="数独の盤面" aria-rowcount={9} aria-colcount={9}>
      {grid.map((values, row) => (
        <div className="board-row" role="row" key={row}>
          {values.map((value, col) => {
            const isSelected = selected.row === row && selected.col === col
            const isRelated = selected.row === row ||
              selected.col === col ||
              (Math.floor(selected.row / 3) === Math.floor(row / 3) &&
                Math.floor(selected.col / 3) === Math.floor(col / 3))
            const isMatching = value !== null && selectedValue === value
            const invalid = invalidCells[row][col]
            const generated = solverCells[row][col]
            const className = [
              'board-cell',
              col === 2 || col === 5 ? 'block-right' : '',
              row === 2 || row === 5 ? 'block-bottom' : '',
              isRelated ? 'related' : '',
              isMatching ? 'matching' : '',
              generated ? 'generated' : '',
              invalid ? 'invalid' : '',
              isSelected ? 'active' : '',
            ].filter(Boolean).join(' ')

            return (
              <button
                key={col}
                ref={(element) => { cellRefs.current[row * BOARD_SIZE + col] = element }}
                type="button"
                role="gridcell"
                className={className}
                tabIndex={isSelected ? 0 : -1}
                aria-rowindex={row + 1}
                aria-colindex={col + 1}
                aria-selected={isSelected}
                aria-invalid={invalid || undefined}
                aria-label={
                  String(row + 1) + '行 ' + String(col + 1) + '列、' +
                  (value === null ? '空欄' : String(value)) +
                  (invalid ? '、重複があります' : '') +
                  (generated ? '、自動入力' : '')
                }
                onClick={() => onSelect({ row, col })}
                onFocus={() => onSelect({ row, col })}
                onKeyDown={(event) => handleKeyDown(event, row, col)}
              >
                {value ?? ''}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
