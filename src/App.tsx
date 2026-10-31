import { SudokuBoard } from './components/SudokuBoard'
import { NumberPad } from './components/NumberPad'
import { useSudoku } from './hooks/useSudoku'

function App() {
  const {
    grid, solverCells, status, selected, setSelected, setCell,
    solvePuzzle, clearSolution, reset,
    invalidCells, invalidCount, givenCount, solvedCount, canSolve,
  } = useSudoku()

  const isSolved = status === 'solved'
  const isUnsolvable = status === 'unsolvable'
  const boardCount = givenCount + solvedCount

  const statusText = invalidCount > 0
    ? '行・列・3×3ブロックに同じ数字があります。赤いマスを修正してください。'
    : isUnsolvable
      ? 'この盤面には解がありません。入力した数字を確認してください。'
      : isSolved
        ? '解答が完成しました。青い数字が自動で埋めたマスです。'
        : givenCount === 0
          ? '盤面に数字を入力してください。'
          : '入力中です。数字を入れ終わったら「解答する」を押してください。'

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-lockup">
          <div className="brand-icon" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="brand-name">SUDOKU <span>SOLVER</span></div>
        </div>
      </header>

      <main>
        <div className="page-heading">
          <h1>数独ソルバー</h1>
        </div>

        <div className="workspace">
          <section className="board-card" aria-labelledby="board-title">
            <div className="board-card-heading">
              <div>
                <div className="panel-kicker">YOUR PUZZLE</div>
                <h2 id="board-title">数独の盤面</h2>
              </div>
              <div className="progress-chip" aria-label={'入力済み ' + String(boardCount) + ' / 81 マス'}>
                <span className="progress-dot" />
                {boardCount} <span>/ 81</span>
              </div>
            </div>

            <SudokuBoard
              grid={grid}
              solverCells={solverCells}
              invalidCells={invalidCells}
              selected={selected}
              onSelect={setSelected}
              onDigit={setCell}
            />

            <div className="mobile-number-pad">
              <div className="mobile-input-heading">
                <span>数字を入力</span>
                <span className="selected-coordinate">{selected.row + 1}行 {selected.col + 1}列</span>
              </div>
              <NumberPad onDigit={(value) => setCell(selected.row, selected.col, value)} />
            </div>

            <div className="board-meta">
              <div className="legend">
                <span><i className="legend-dot manual-dot" />入力した数字</span>
                <span><i className="legend-dot answer-dot" />解答した数字</span>
                <span><i className="legend-dot error-dot" />重複</span>
              </div>
              <span className="board-helper">マスを選択して数字を入力</span>
            </div>
          </section>

          <aside className="side-panel" aria-label="操作パネル">
            <section className="panel-section intro-section">
              <div className="panel-kicker">01 / SOLVE</div>
              <h2>解答を求める</h2>
              <p className="section-description">入力した盤面から、数独の解を自動で探します。</p>
              <button
                type="button"
                className="primary-button"
                onClick={solvePuzzle}
                disabled={!canSolve}
              >
                <span aria-hidden="true">✦</span>
                {isSolved ? '解答済み' : '解答する'}
                <span className="primary-arrow" aria-hidden="true">→</span>
              </button>
              <div
                className={'feedback ' + (invalidCount > 0 || isUnsolvable ? 'feedback-error' : isSolved ? 'feedback-success' : '')}
                role={invalidCount > 0 || isUnsolvable ? 'alert' : 'status'}
                aria-live="polite"
              >
                <span className="feedback-symbol" aria-hidden="true">{invalidCount > 0 || isUnsolvable ? '!' : isSolved ? '✓' : 'i'}</span>
                <p>{statusText}</p>
              </div>
            </section>

            <section className="panel-section keypad-section">
              <div className="panel-title-row">
                <div>
                  <div className="panel-kicker">02 / INPUT</div>
                  <h2>数字を入力</h2>
                </div>
                <span className="selected-coordinate">{selected.row + 1}行 {selected.col + 1}列</span>
              </div>
              <NumberPad onDigit={(value) => setCell(selected.row, selected.col, value)} />
            </section>

            <section className="panel-section actions-section">
              <div className="panel-kicker">03 / TOOLS</div>
              <h2>盤面の操作</h2>
              <div className="tool-buttons">
                <button type="button" className="tool-button" onClick={clearSolution} disabled={solvedCount === 0}>
                  <span aria-hidden="true">↶</span> 解答だけ消去
                </button>
                <button type="button" className="tool-button" onClick={reset} disabled={boardCount === 0}>
                  <span aria-hidden="true">⟲</span> すべて消去
                </button>
              </div>
            </section>
          </aside>
        </div>

        <div className="bottom-note">
          <span className="note-symbol" aria-hidden="true">⌨</span>
          <p><strong>キーボード操作：</strong> 矢印キーでマスを移動、1〜9で入力、0・Backspace・Deleteで消去できます。</p>
        </div>
      </main>

      <footer className="site-footer">
        <span>SUDOKU SOLVER</span>
        <a href="https://github.com/naoiw/sudoku-solver" target="_blank" rel="noopener noreferrer" aria-label="GitHubでソースコードを開く">GitHub ↗</a>
      </footer>
    </div>
  )
}

export default App
