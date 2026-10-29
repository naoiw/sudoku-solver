# SUDOKU STUDIO

ブラウザで使える数独ソルバー。9×9の盤面を入力すると、重複をリアルタイムで検出し、解を1つ求めます。

**本番**: https://naoiw.github.io/sudoku-solver/

**開発プレビュー**: https://naoiw.github.io/sudoku-solver/develop/

## 機能

- キーボード（数字・矢印・消去キー）または画面上の数字パッドによる入力
- 行・列・3×3ブロックの重複チェックと該当マスの強調表示
- 探索アルゴリズム（MRVを用いたバックトラッキング）による解答
- 自動入力した数字の色分け、解答部分のみ消去、全消去
- スマートフォンでは盤面直下に数字パッドを配置（小画面は5列×2段）、PCでは右側の操作パネルを維持

## ブランチ運用

開発は `develop` で行い、テスト・ビルドの成功を確認してから `develop` → `main` のプルリクエストでマージします。`develop` は削除せず継続使用します。詳細は [開発手順](docs/DEVELOPMENT.md) を参照してください。

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
- `tests/` — ソルバーの自動テスト

詳細は [仕様書](docs/SPEC.md)、[開発手順](docs/DEVELOPMENT.md)、[デプロイ](docs/DEPLOYMENT.md) を参照してください。

MIT License。
