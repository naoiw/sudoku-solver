# 開発手順

## 起動

Node.js 20 / pnpm 9 を使用。

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

## ディレクトリ

- `src/App.tsx` : ページレイアウト、状態に応じた表示
- `src/hooks/useSudoku.ts` : 操作・画面状態の管理
- `src/components/SudokuBoard.tsx` : 盤面、選択とキーボード入力
- `src/components/NumberPad.tsx` : 画面入力パッド
- `src/sudokuSolver.ts` : 副作用のない解答 API、探索時のみコピー上で変更
- `src/sudokuValidation.ts` : 重複判定と表示用の不正マスク
- `src/sudokuUtils.ts` : 行・列・ブロックの検査
- `src/index.css` : スタイルとレスポンシブ対応

GitHub Pages の配信パスは `vite.config.ts` の `base: '/sudoku-solver/'` に設定。デプロイは main への push でのみ実行されます。

## 実装メモ

React の UI と解答ロジックは分離し、ソルバーへ渡すグリッドは変更しない。解答は1つのみ返し、一意性判定は行わない。入力重複と解なしは別の状態として扱う。
