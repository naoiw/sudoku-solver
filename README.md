# SUDOKU STUDIO

ブラウザで使える数独ソルバー。9×9の盤面を入力すると、重複をリアルタイムで検出し、解を1つ求めます。

**本番**: https://naoiw.github.io/sudoku-solver/

**開発プレビュー**: https://naoiw.github.io/sudoku-solver/develop/

## 機能

- キーボード（数字・矢印・消去キー）または画面上の数字パッドによる入力
- 行・列・3×3ブロックの重複チェックと該当マスの強調表示
- 探索アルゴリズム（MRVを用いたバックトラッキング）による解答
- 自動入力した数字の色分け、解答部分のみ消去、全消去
- スマートフォン向けレスポンシブUI

## ブランチ運用

- `develop` : 日常の機能追加・修正・リファクタリングを行う開発ブランチ。継続して使用し、マージ後も削除しない。
- `main` : 本番公開用ブランチ。通常の開発では直接コミット・pushしない。
- 開発は `develop` にpushし、`main` への反映は **`develop` → `main` のプルリクエスト** を作成する。
- PRのチェック（テスト・ビルド）を確認してからマージする。マージ後は `main` の変更を `develop` に取り込み、次の開発を続ける。
- 公開版は `main`、開発プレビューは `develop` の内容を配信する。

## 開発

Node.js 20、pnpm 9 を使用します。

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

## 構成

- `src/hooks/useSudoku.ts` — 盤面状態と操作
- `src/components/` — 盤面表示と数字パッド
- `src/sudokuSolver.ts` — 解探索
- `src/sudokuValidation.ts` — 重複判定
- `src/sudokuUtils.ts` — 盤面の基礎関数

詳細は [仕様書](docs/SPEC.md)、[開発手順](docs/DEVELOPMENT.md)、[デプロイ](docs/DEPLOYMENT.md) を参照してください。

MIT License。
