# 開発手順（DEVELOPMENT）

## 環境

- **Node.js**: 20 LTS を推奨（`.nvmrc` に `20` を記載しておくとよい）
- **パッケージマネージャ**: pnpm

## 技術スタック

- 言語: TypeScript
- パッケージマネージャ: pnpm
- ビルドツール: Vite
- フレームワーク: React
- スタイル: Tailwind CSS

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

Vite で本番用ビルドが実行され、出力は通常 `dist/` に生成されます。GitHub Pages 用にデプロイする場合は、`vite.config` で `base: '/sudoku-solver/'` を設定する必要があります（[DEPLOYMENT.md](DEPLOYMENT.md) 参照）。

## テスト

現時点ではテストは導入していません。将来、solver ロジックや UI のテストを追加する場合は、Vitest などを検討できます。

## ディレクトリ構成（想定）

Vite + React の一般的な最小構成の例です。

- `index.html` … エントリの HTML
- `src/` … ソースコード
  - `main.tsx` … エントリポイント
  - `App.tsx` … ルートコンポーネント
  - その他コンポーネント・スタイル・型定義など
- `public/` … 静的ファイル（そのまま配信されるもの）

実際の構成はプロジェクト初期化時に Vite が生成するテンプレートに従います。
