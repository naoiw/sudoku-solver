# 開発手順（DEVELOPMENT）

## 環境

- **Node.js**: 20 LTS を推奨（`.nvmrc` に `20` を記載しておくとよい）
- **パッケージマネージャ**: pnpm

## 技術スタック

- 言語: TypeScript
- パッケージマネージャ: pnpm
- ビルドツール: Vite
- フレームワーク: React
- スタイル: CSS（`src/index.css`）

## セットアップ

```bash
pnpm install
```

Node のバージョン管理に nvm を使う場合は、リポジトリルートに `.nvmrc` で `20` を指定しておくと `nvm use` で切り替えられます。

## 開発サーバ

```bash
pnpm dev
```

Vite の開発サーバが起動するので、表示された URL（例: `http://localhost:5173`）をブラウザで開いて確認します。

## ビルド

```bash
pnpm build
```

Vite で本番用ビルドが実行され、出力は通常 `dist/` に生成されます。GitHub Pages 用にデプロイする場合は、`vite.config.ts` で `base: '/sudoku-solver/'` を設定する必要があります（[DEPLOYMENT.md](DEPLOYMENT.md) 参照）。

## テスト

現時点ではテストは導入していません。将来、solver ロジックや UI のテストを追加する場合は、Vitest などを検討できます。

## ディレクトリ構成

- `index.html` … エントリの HTML
- `src/` … ソースコード
  - `main.tsx` … エントリポイント
  - `App.tsx` … ルートコンポーネント
  - `index.css` … グローバルスタイル
  - `sudokuSolver.ts` … 数独ソルバー（深さ優先探索）
  - `sudokuUtils.ts` … 盤面ユーティリティ（行・列・ブロック判定など）
  - `sudokuValidation.ts` … 入力検証（不正マス判定）
  - `vite-env.d.ts` … Vite 用型定義
